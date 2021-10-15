import React from 'react';
import { ListView } from './listView/ListView';
import { GalleryView } from './galleryView/GalleryView';
import { CellImg } from './styles/styles';

export const YEARS = [
  2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
  2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996,
];

export const DEFAULT_YEAR_INDEX = 0;
export const CURRENT_YEAR = 2021;

export const TABS = [
  {
    label: 'List View',
    route: '/listView',
    redirectRoute: '',
    component: ListView,
  },
  {
    label: 'Gallery View',
    route: '/galleryView',
    redirectRoute: `/galleryView/${CURRENT_YEAR}`,
    component: GalleryView,
  },
];

export const DEFAULT_TAB_INDEX = 0;

export const TABLE_COLUMNS = [
  {
    field: 'image',
    headerName: 'Image',
    sortable: false,
    disableColumnMenu: true,
    width: 180,
    renderCell: imgSrc => <CellImg src={imgSrc.value} alt='' />,
  },
  {
    field: 'title',
    headerName: 'Title',
    disableColumnMenu: true,
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    disableColumnMenu: true,
    width: 180,
  },
];

export const NUM_TABLE_ROWS = 100;
export const DEFAULT_SEARCH_TERM = 'Earth';
