import { Container, Flex, Text, Box } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { getBestSellerProducts } from '@/lib/actionsProduct';
import { ProductCardDefault } from '@/components/ProductCards/ProductCards';
import classes from './BestSellers.module.css';

const BestSellers = async () => {
  const bestSellersProducts = await getBestSellerProducts();
  // console.log(bestSellersProducts);
  return (
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
      <Flex w="100%" mt="sm" gap="md" wrap="wrap" align="stretch">
        {bestSellersProducts.map((product: any) => (
          <Box key={product.ID} className={classes.defaultCardsWrapper}>
            <ProductCardDefault product={product} />
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

export default BestSellers;
