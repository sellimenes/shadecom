'use client';

import { useRef } from 'react';

import { Container, Title, Text, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

import classes from './HeroCarousel.module.css';

export function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: 6000 }));
  return (
    <Carousel
      loop
      withIndicators
      withControls={false}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <Carousel.Slide>
        <div className={classes.root}>
          <Container size="1600px" w="90%">
            <div className={classes.inner}>
              <div className={classes.content}>
                <Title className={classes.title}>
                  A{' '}
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'yellow' }}
                  >
                    fully featured
                  </Text>{' '}
                  React components library
                </Title>

                <Text className={classes.description} mt={30}>
                  Build fully functional accessible web applications with ease – Mantine includes
                  more than 100 customizable components and hooks to cover you in any situation
                </Text>

                <Button
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'yellow' }}
                  size="xl"
                  className={classes.control}
                  mt={40}
                >
                  Get started
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className={classes.root}>
          <Container size="1600px" w="90%">
            <div className={classes.inner}>
              <div className={classes.content}>
                <Title className={classes.title}>
                  A{' '}
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'yellow' }}
                  >
                    fully featured
                  </Text>{' '}
                  React components library
                </Title>

                <Text className={classes.description} mt={30}>
                  Build fully functional accessible web applications with ease – Mantine includes
                  more than 100 customizable components and hooks to cover you in any situation
                </Text>

                <Button
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'yellow' }}
                  size="xl"
                  className={classes.control}
                  mt={40}
                >
                  Get started
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className={classes.root}>
          <Container size="1600px" w="90%">
            <div className={classes.inner}>
              <div className={classes.content}>
                <Title className={classes.title}>
                  A{' '}
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'yellow' }}
                  >
                    fully featured
                  </Text>{' '}
                  React components library
                </Title>

                <Text className={classes.description} mt={30}>
                  Build fully functional accessible web applications with ease – Mantine includes
                  more than 100 customizable components and hooks to cover you in any situation
                </Text>

                <Button
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'yellow' }}
                  size="xl"
                  className={classes.control}
                  mt={40}
                >
                  Get started
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </Carousel.Slide>
    </Carousel>
  );
}
