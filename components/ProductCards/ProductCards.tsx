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
import { useState } from 'react';
import { handleAddBasket } from '@/lib/store/BasketCountStore';

type Props = {
  product: any;
};



export const ProductCardDefault = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleAdBasket = async(id: string) => {
    setLoading(true);
    handleAddBasket(id);
    setLoading(false);
  }

  return (
    <Box className={classes.defaultCardWrapper}>
      <Link href={`/${product.Category.Slug}/${product.Slug}`}>
        <Box className={classes.defaultCardImageWrapper}>
          <Image src={product.CoverImage} alt={product.name} fill sizes="(max-width: 472px) 100vw, (max-width: 600px) 50vw, 33vw" />
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
          <Button disabled={loading} variant="outline" color="primary" radius="sm" fullWidth onClick={() => handleAdBasket(product.ID)}>
            Add to cart
          </Button>
          <ActionIcon disabled={loading} size={36} variant="default" aria-label="ActionIcon with size as a number">
            <IconHeart style={{ width: rem(24), height: rem(24) }} />
          </ActionIcon>
        </Flex>
      </Box>
    </Box>
  );
};
