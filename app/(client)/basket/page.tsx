import {
  Box,
    Container,
    Text,
    Flex,
    Button,
  } from '@mantine/core';
  import classes from './BasketPage.module.css';
import { IconBasketSearch } from '@tabler/icons-react';

type Props = {}

const BasketPage = (props: Props) => {
  return (
    <Container size="1600px" w="90%">
        <Box mt='2rem' p='1rem' className={classes.NoItemBox}>
          <Flex gap='1rem' align='center'>
            <Box p='md' bg='primary' className={classes.NoItemIcon}>
              <IconBasketSearch size={36} color='white' />
            </Box>
            <Text size='xl'>No items in your basket.</Text>
          </Flex>
          <Button component='a' href='/' variant='filled' color='primary' size='lg' radius='md'>Continue Shopping</Button>
        </Box>
    </Container>
  )
}

export default BasketPage