import { getSingleProduct } from '@/lib/actionsProduct';
import { Container, Group, Stack, Text, Title, NumberFormatter, Breadcrumbs, Anchor, Flex, Rating, Divider, NumberInput } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import classes from './ProductDetailPage.module.css';

type Props = {
  params: {
    category: string;
    product: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const product = await getSingleProduct(params.product);
  // console.log(product);

  const items = [
    { title: 'Homepage', href: '/' },
    { title: product.Category.Name, href: `/${product.Category.Slug}` },
    { title: product.Name, href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Container size="1600px" w="90%" mt={16}>
       <div className={classes.breadcrumbs}>
       <Breadcrumbs separator="→" separatorMargin="md" >
        {items}
      </Breadcrumbs>
       </div>
      <Group gap={80} align="flex-start" w={'100%'} >
        <Image src={product.CoverImage} width={500} height={500} alt={product.Name} />
        <Stack style={{flex: 1}} gap={0}>
          <Group justify={'space-between'} align={'center'}>
            <Title order={1}>{product.Name}</Title>
            <Group>
              <Rating value={4.5} fractions={2} readOnly />
              <Text>4 review(s)</Text>
            </Group>
          </Group>
          {product.ShortDescription && <Text>{product.ShortDescription}</Text>}
          <NumberFormatter prefix="$ " value={product.Price} thousandSeparator className={classes.priceNumber} />
          <Divider my={'2rem'} />
          <NumberInput max={product.Stock} min={1} />
        </Stack>
      </Group>
    </Container>
  );
};

export default ProductPage;
