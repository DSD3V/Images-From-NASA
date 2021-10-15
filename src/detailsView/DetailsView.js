import React, { useState, useCallback } from 'react';
import { Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import { LeftArrow, RightArrow } from '../media/svgs';
import {
  DetailsViewContainer,
  CarouselContainer,
  ReturnButton,
  SlideDiv,
  SlideButton,
} from '../styles/styles';

export const DetailsView = ({
  onReturn,
  returnButtonText,
  slides,
  startingSlide,
}) => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [slide, setSlide] = useState(startingSlide);

  const handleSlide = useCallback(
    newSlide => {
      if (newSlide === -1) {
        newSlide = slides.length - 1;
      } else if (slide === slides.length) {
        newSlide = 0;
      }
      setSlide(newSlide);
      history.push(`${path}/${newSlide}`);
    },
    [history, path, slide, slides.length]
  );

  return (
    <DetailsViewContainer>
      <h4>Details View</h4>
      <ReturnButton onClick={onReturn}>{returnButtonText}</ReturnButton>
      <CarouselContainer>
        <Carousel
          wrapAround={true}
          width={'60vw'}
          slideIndex={slide}
          swiping={false}
          dragging={false}
          transitionMode='fade'
          speed={100}
          defaultControlsConfig={{
            pagingDotsStyle: {
              visibility: 'hidden',
            },
          }}
          renderCenterLeftControls={() => (
            <SlideButton onClick={() => handleSlide(slide - 1)}>
              <LeftArrow />
            </SlideButton>
          )}
          renderCenterRightControls={() => (
            <SlideButton onClick={() => handleSlide(slide + 1)}>
              <RightArrow />
            </SlideButton>
          )}
        >
          {slides.map((slide, idx) => (
            <Route key={slide.id} exact path={`${path}/${idx}`}>
              <SlideDiv>
                <div>
                  <p className='title'>{slide.title}</p>
                  <img src={slide.image} alt='' />
                </div>
                <p className='description'>{slide.description}</p>
              </SlideDiv>
            </Route>
          ))}
          <Redirect to={`${path}/${startingSlide}`} />
        </Carousel>
      </CarouselContainer>
    </DetailsViewContainer>
  );
};

DetailsView.propTypes = {
  onReturn: PropTypes.func.isRequired,
  returnButtonText: PropTypes.string.isRequired,
  slides: PropTypes.array.isRequired,
  startingSlide: PropTypes.number.isRequired,
};
