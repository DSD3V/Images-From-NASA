import React, { useState, useEffect, useCallback } from 'react';
import {
  Route,
  Redirect,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { TabPanels, TabPanel } from '@reach/tabs';
import Loader from 'react-loader-spinner';
import { getGalleryViewSearchResults } from '../api/apis';
import { YEARS, DEFAULT_YEAR_INDEX } from '../constants';
import { ViewContainer } from '../styles/styles';
import { GalleryViewHeading } from './GalleryViewHeading';
import { GalleryViewGrid } from './GalleryViewGrid';
import { DetailsView } from '../detailsView/DetailsView';
import {
  StyledYearTab,
  StyledTabsContainer,
  StyledTabList,
  LoaderDiv,
} from '../styles/styles';

export const GalleryView = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const [selectedYearTab, setSelectedYearTab] = useState(DEFAULT_YEAR_INDEX);
  const [yearToImgs, setYearToImgs] = useState({});
  const [yearToLoading, setYearToLoading] = useState({});
  const [detailsViewInfo, setDetailsViewInfo] = useState({
    slides: [],
    startingSlide: 0,
  });

  useEffect(() => {
    (async () => {
      const initYearToImgs = {};
      const initYearToLoading = {};

      YEARS.forEach(year => {
        initYearToImgs[year] = [];
        initYearToLoading[year] = true;
      });

      setYearToImgs(initYearToImgs);
      setYearToLoading(initYearToLoading);

      const defaultYearResults = await getGalleryViewSearchResults(
        YEARS[DEFAULT_YEAR_INDEX]
      );

      setYearToImgs(prevYearToImgs => ({
        ...prevYearToImgs,
        [YEARS[DEFAULT_YEAR_INDEX]]: defaultYearResults,
      }));
      setYearToLoading(prevYearToLoading => ({
        ...prevYearToLoading,
        [YEARS[DEFAULT_YEAR_INDEX]]: false,
      }));
    })();
  }, [history]);

  const handleYearTabChange = useCallback(
    async newYearIdx => {
      setSelectedYearTab(newYearIdx);
      history.push(`${path}/${YEARS[newYearIdx]}`);

      if (!yearToImgs[YEARS[newYearIdx]].length) {
        const yearResults = await getGalleryViewSearchResults(
          YEARS[newYearIdx]
        );
        setYearToImgs(prevYearToImgs => ({
          ...prevYearToImgs,
          [YEARS[newYearIdx]]: yearResults,
        }));
        setYearToLoading(prevYearToLoading => ({
          ...prevYearToLoading,
          [YEARS[newYearIdx]]: false,
        }));
      }
    },
    [history, path, yearToImgs]
  );

  const handleCellClick = useCallback(
    id => {
      history.push(`${path}/${YEARS[selectedYearTab]}/detailsView`);

      const slides = yearToImgs[YEARS[selectedYearTab]].reduce(
        (acc, gridObject, idx) => [
          ...acc,
          {
            title: gridObject.title,
            id: idx,
            image: gridObject.url,
            description: gridObject.explanation,
          },
        ],
        []
      );

      setDetailsViewInfo({
        slides,
        startingSlide: id,
      });
    },
    [history, path, selectedYearTab, yearToImgs]
  );

  const handleReturnToGalleryView = useCallback(
    () => history.push(`${path}/${YEARS[selectedYearTab]}`),
    [history, path, selectedYearTab]
  );

  return (
    <ViewContainer>
      <Switch>
        <Route exact path={`${path}/${YEARS[selectedYearTab]}`}>
          <GalleryViewHeading />
          <StyledTabsContainer onChange={handleYearTabChange}>
            <StyledTabList>
              {YEARS.map((year, yearIdx) => (
                <StyledYearTab
                  key={year}
                  styleprops={{
                    isActive: selectedYearTab === yearIdx,
                  }}
                >
                  {year}
                </StyledYearTab>
              ))}
            </StyledTabList>
            <TabPanels>
              {yearToLoading[YEARS[selectedYearTab]] ? (
                <LoaderDiv>
                  <Loader type='TailSpin' color='#00BFFF' />
                  <p>
                    Fetching data from NASA, this takes a few seconds. (Only
                    fetching images for 3/12 months to speed it up.)
                  </p>
                </LoaderDiv>
              ) : (
                YEARS.map(year => (
                  <TabPanel key={year}>
                    <GalleryViewGrid
                      gridObjects={yearToImgs[year] ? yearToImgs[year] : []}
                      onCellClick={handleCellClick}
                    />
                  </TabPanel>
                ))
              )}
            </TabPanels>
          </StyledTabsContainer>
        </Route>
        <Route path={`${path}/${YEARS[selectedYearTab]}/detailsView`}>
          <DetailsView
            onReturn={handleReturnToGalleryView}
            returnButtonText={'Return to Gallery View'}
            slides={detailsViewInfo.slides}
            startingSlide={detailsViewInfo.startingSlide}
          />
        </Route>
        <Redirect to={`${path}/${YEARS[DEFAULT_YEAR_INDEX]}`} />
      </Switch>
    </ViewContainer>
  );
};
