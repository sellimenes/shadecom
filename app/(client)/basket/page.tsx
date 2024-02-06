import {
  Box,
    Container,
    Text,
    Flex,
    Button,
    Group,
    NumberFormatter,
    NumberInput,
    ActionIcon,
    Stack,
  } from '@mantine/core';
  import classes from './BasketPage.module.css';
import { IconBasketSearch, IconTrash } from '@tabler/icons-react';
import { getBasket } from '@/lib/actionsBasket';
import Image from 'next/image';
import Link from 'next/link';

type Props = {}

const BasketPage = async(props: Props) => {
  const basketData = await getBasket();
  return (
    <Container size="1600px" w="90%" mt='lg'>
      <Group align='start'>
          <Stack className={classes.basketCardsWrapper}>
            {basketData.length === 0 ? (
              <Box mt='2rem' p='1rem' className={classes.NoItemBox}>
              <Flex gap='1rem' align='center'>
                <Box p='md' bg='primary' className={classes.NoItemIcon}>
                  <IconBasketSearch size={36} color='white' />
                </Box>
                <Text size='xl'>No items in your basket.</Text>
              </Flex>
              <Button component='a' href='/' variant='filled' color='primary' size='lg' radius='md'>Continue Shopping</Button>
            </Box>
              ) : (
                basketData.map(( data: any ) => {
                  return (
                    <BasketSingleCard key={data.ID} data={data.Product} />
                  )
              })
            )}
          </Stack>
          <Box>
            <Box className={classes.subTotalWrapper}>
              <Text size='xl' fw={500}>Subtotal</Text>
              <Text>Total Items: {basketData.length}</Text>
              <Text>Total Price: <NumberFormatter value={basketData.reduce((acc: any, item: any) => acc + item.Product.Price, 0)} prefix='$' thousandSeparator /></Text>
            </Box>
            <Button component='a' href='/checkout' variant='filled' color='primary' w='100%' size='md' radius='md' mt='sm'>Proceed to Checkout</Button>
          </Box>
      </Group>
    </Container>
  )
}

const BasketSingleCard = ({ data }: any ) => {
  console.log(data)
  return (
    <Box className={classes.singleCardWrapper} >
      <Group>
        <Box className={classes.singleCardImageWrapper} w='100px' h='100px'>
          <Image src={data.CoverImage} alt={data.Name} fill />
        </Box>
        <Link href={`./${data.Category.Slug}/${data.Slug}`}>
            <Text size='lg' fw='bolder'>{data.Name}</Text>
        </Link>
      </Group>
      <Group>
            <NumberInput
              defaultValue={1}
              min={1}
              // max={data.Stock}
              step={1}
              radius='md'
              style={{ width: 100 }}
            />
           <Group miw='170px' justify='flex-end'>
              <Text size='lg' c='primary' fw='bold'><NumberFormatter value={data.Price} prefix='$' thousandSeparator /></Text>
              <ActionIcon color='red' radius='md' variant='filled' size='lg' className={classes.singleCardDeleteIcon}>
                <IconTrash size={20} />
              </ActionIcon>
           </Group>
      </Group>
    </Box>
  )
}
export default BasketPage