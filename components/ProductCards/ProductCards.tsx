'use client';

import Image from 'next/image';
import {
  Box,
  Text,
  Rating,
  Stack,
  Flex,
  Button,
  ActionIcon,
  rem,
  NumberFormatter,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

import classes from './ProductCards.module.css';
import Link from 'next/link';
import { useEffect } from 'react';

type Props = {
  product: any;
};



export const ProductCardDefault = ({ product }: Props) => {
  useEffect(() => {
    console.log(product);
  }, []);
  return (
    <Box className={classes.defaultCardWrapper}>
      <Link href={`.${product.Category.Slug}/${product.Slug}`}>
        <Box className={classes.defaultCardImageWrapper}>
          <Image src={product.CoverImage} alt={product.name} fill />
        </Box>
      </Link>
      <Box px={8} pb={8}>
        <Stack mt={10} mb={5} gap={1} align="center">
          <Link href={`/${product.Category.Slug}/${product.Slug}`}>
            <Text className={classes.defaultCardTitle} lineClamp={1}>
              {product.Name}
            </Text>
          </Link>
          <Rating value={4.5} fractions={2} readOnly />
          <NumberFormatter
            prefix="$ "
            value={product.Price}
            thousandSeparator
            className={classes.defaultCardPrice}
          />
        </Stack>
        <Flex align="center" gap={3}>
          <Button variant="outline" color="primary" radius="sm" fullWidth>
            Add to cart
          </Button>
          <ActionIcon size={36} variant="default" aria-label="ActionIcon with size as a number">
            <IconHeart style={{ width: rem(24), height: rem(24) }} />
          </ActionIcon>
        </Flex>
      </Box>
    </Box>
  );
};
