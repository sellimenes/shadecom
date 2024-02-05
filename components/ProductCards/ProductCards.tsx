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
import { useEffect, useState } from 'react';
import { addBasket } from '@/lib/actionsBasket';
import { useBasketCount } from '@/lib/store/BasketCountStore';
import { notifications } from '@mantine/notifications';
import { set } from 'zod';

type Props = {
  product: any;
};



export const ProductCardDefault = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);
  const { count, setCount } = useBasketCount();
  // useEffect(() => {
  //   console.log(product);
  // }, [product]);

  const handleAdBasket = async(id: string) => {
    setLoading(true);
    const res = await addBasket(id);
    setLoading(false);
    if(res && !res.error) {
      setCount(count + 1);
      notifications.show({
        title: 'Product added to basket',
        message: 'You can view your basket in the top right corner.',
        color: 'teal',
        icon: null,
      })
    }

    if(res.error && res.error === "Product already in basket") {
      notifications.show({
        title: 'Product already in basket',
        message: 'You can change the quantity in the basket.',
        color: 'red',
        icon: null,
      })
    }
  }
  return (
    <Box className={classes.defaultCardWrapper}>
      <Link href={`/${product.Category.Slug}/${product.Slug}`}>
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
