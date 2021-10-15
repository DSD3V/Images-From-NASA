import React, { useState, useCallback, useEffect } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { debounce } from 'lodash';
import {
  getListViewSearchResults,
  getDefaultListViewSearchResults,
  getMoreListViewSearchResults,
} from '../api/apis';
import { NUM_TABLE_ROWS } from '../constants';
import { ListViewHeading } from './ListViewHeading';
import { ListViewTable } from './ListViewTable';
import { DetailsView } from '../detailsView/DetailsView';
import { ViewContainer, SearchBar } from '../styles/styles';

export const ListView = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nextReq, setNextReq] = useState('');
  const [visitedPages, setVisitedPages] = useState(new Set([0]));
  const [currentPage, setCurrentPage] = useState(0);
  const [detailsViewInfo, setDetailsViewInfo] = useState({
    slides: [],
    startingSlide: 0,
  });

  const updateSearchResults = useCallback(
    ({ results, isFirstBatch, offset } = {}) =>
      setSearchResults(prevSearchResults => {
        if (results) {
          const newSearchResults = isFirstBatch
            ? new Array(results.metadata.total_hits)
            : prevSearchResults.slice();

          for (let i = offset; i < offset + results.items.length; i++) {
            const result = results.items[i - offset];
            newSearchResults[i] = {
              id: i,
              image: result.links ? result.links[0].href : null,
              title: result.data[0].title,
              description: result.data[0].description,
              createdAt: result.data[0].date_created.slice(0, 10),
            };
          }

          if (isFirstBatch) {
            setDetailsViewInfo({
              slides: newSearchResults.slice(0, NUM_TABLE_ROWS),
              startingSlide: 0,
            });
          }
          return newSearchResults;
        }
        return prevSearchResults;
      }),
    []
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const results = await getDefaultListViewSearchResults();
      updateSearchResults({
        results,
        isFirstBatch: true,
        offset: 0,
      });
      setOffset(results.items.length);
      setNextReq(results.links ? results.links[0].href : '');
      setIsLoading(false);
    })();
  }, [updateSearchResults]);

  const handleSearch = useCallback(
    debounce(async ({ target: { value } }) => {
      setIsLoading(true);
      const results = value
        ? await getListViewSearchResults(encodeURIComponent(value))
        : await getDefaultListViewSearchResults();
      updateSearchResults({
        results,
        isFirstBatch: true,
        offset: 0,
      });
      setCurrentPage(0);
      setVisitedPages(new Set([0]));
      setNextReq(results.links ? results.links[0].href : '');
      setIsLoading(false);
    }, 300),
    []
  );

  const handlePageChange = useCallback(
    async newPage => {
      if (!visitedPages.has(newPage)) {
        setIsLoading(true);
        const results = await getMoreListViewSearchResults(nextReq);
        updateSearchResults({
          results,
          isFirstBatch: false,
          offset,
        });
        setVisitedPages(prevVisitedPages => prevVisitedPages.add(newPage));
        setOffset(prevOffset => prevOffset + results.items.length);
        setNextReq(
          results.links ? (results.links[1] ? results.links[1].href : '') : ''
        );
        setIsLoading(false);
      }
      setCurrentPage(newPage);
    },
    [updateSearchResults, visitedPages, nextReq, offset]
  );

  const handleRowClick = useCallback(
    ({ id }) => {
      history.push(`${path}/detailsView`);

      setDetailsViewInfo({
        slides: searchResults.slice(
          currentPage * NUM_TABLE_ROWS,
          (currentPage + 1) * NUM_TABLE_ROWS
        ),
        startingSlide: id % NUM_TABLE_ROWS,
      });
    },
    [currentPage, history, path, searchResults]
  );

  const handleReturnToListView = useCallback(
    () => history.push(path),
    [history, path]
  );

  return (
    <ViewContainer>
      <Switch>
        <Route exact path={path}>
          <ListViewHeading />
          <SearchBar
            placeholder='Search for anything space-related; Earth, Moon, Sun, etc.'
            onChange={handleSearch}
          />
          <ListViewTable
            isLoading={isLoading}
            tableRows={searchResults}
            onPageChange={handlePageChange}
            page={currentPage}
            onRowClick={handleRowClick}
          />
        </Route>
        <Route path={`${path}/detailsView`}>
          <DetailsView
            onReturn={handleReturnToListView}
            returnButtonText={'Return to List View'}
            slides={detailsViewInfo.slides}
            startingSlide={detailsViewInfo.startingSlide}
          />
        </Route>
      </Switch>
    </ViewContainer>
  );
};
