import { Container, Flex, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import classes from './BestSellers.module.css';

type Props = {};

const BestSellers = (props: Props) => {
  return (
    <Container size={'1600px'} mt={'1rem'}>
      <Flex justify={'space-between'} align={'center'}>
        <Title order={2} className={classes.pageTitle}>
          Best Sellers
        </Title>
        <Link href={'/#'} className={classes.viewAll}>
          <Text fw={500}>View All</Text>
        </Link>
      </Flex>
    </Container>
  );
};

export default BestSellers;
