import React from 'react';
import PropTypes from 'prop-types';
import {
  GridContainer,
  GridCell,
  GridCellTitle,
  GridCellImg,
} from '../styles/styles';

export const GalleryViewGrid = ({ gridObjects, onCellClick }) => (
  <GridContainer>
    {gridObjects.map((gridObject, idx) => (
      <GridCell key={gridObject.date} onClick={() => onCellClick(idx)}>
        <GridCellTitle>{gridObject.title}</GridCellTitle>
        <GridCellImg src={gridObject.url} />
      </GridCell>
    ))}
  </GridContainer>
);

GalleryViewGrid.propTypes = {
  gridObjects: PropTypes.array.isRequired,
  onCellClick: PropTypes.func.isRequired,
};
