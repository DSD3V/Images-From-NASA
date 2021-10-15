import React from 'react';
import { ViewHeading } from '../styles/styles';

export const ListViewHeading = () => (
  <ViewHeading>
    <h4>
      Search{' '}
      <a
        href='https://images.nasa.gov/'
        target='_blank'
        rel='noopener noreferrer'
      >
        images.nasa.gov{' '}
        <img
          src='https://img.icons8.com/material-outlined/24/ffffff/external-link.png'
          alt='open-link'
        />
      </a>
    </h4>
  </ViewHeading>
);
