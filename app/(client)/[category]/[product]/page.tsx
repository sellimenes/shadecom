import { getSingleProduct } from '@/lib/actionsProduct';
import { Container, Group, Stack, Text, Title, NumberFormatter } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

type Props = {
  params: {
    category: string;
    product: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const product = await getSingleProduct(params.product);
  return (
    <Container size="1600px" w="90%" mt={16}>
      <Group gap={80} align="flex-start">
        <Image src={product.CoverImage} width={500} height={500} alt={product.Name} />
        <Stack align="flex-start" justify="flex-start">
          <Title order={1}>{product.Name}</Title>
          <Text>{product.Description}</Text>
          <NumberFormatter prefix="$ " value={product.Price} thousandSeparator />
        </Stack>
      </Group>
    </Container>
  );
};

export default ProductPage;
