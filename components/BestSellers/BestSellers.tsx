import { Container, Flex, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import classes from './BestSellers.module.css';

const BestSellers = () => (
  <Container size="1600px" w="90%" mt="1rem">
    <Flex justify="space-between" align="center">
      <Text
        className={classes.pageTitle}
        variant="gradient"
        gradient={{ from: 'pink', to: 'primary' }}
      >
        Best Sellers
      </Text>
      <Link href="/#" className={classes.viewAll}>
        <Text fw={500}>View All</Text>
      </Link>
    </Flex>
  </Container>
);

export default BestSellers;
