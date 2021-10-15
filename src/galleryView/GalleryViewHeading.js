import React from 'react';
import { ViewHeading } from '../styles/styles';

export const GalleryViewHeading = () => (
  <ViewHeading>
    <h4>
      Astronomy Pictures of the Day from{' '}
      <a
        href='https://apod.nasa.gov/apod/astropix.html'
        target='_blank'
        rel='noopener noreferrer'
      >
        apod.nasa.gov{' '}
        <img
          src='https://img.icons8.com/material-outlined/24/ffffff/external-link.png'
          alt='open-link'
        />
      </a>
    </h4>
  </ViewHeading>
);
