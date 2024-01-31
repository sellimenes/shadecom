'use client'

import { Tabs, rem } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import classes from './ProductDetailTabs.module.css';

type Props = {}

const ProductDetailTabs = (props: Props) => {
    const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <Tabs color="primary" defaultValue="description" mt='2rem' mih={'15rem'} classNames={classes}>
    <Tabs.List mb='1rem'>
      <Tabs.Tab value="description" leftSection={<IconPhoto style={iconStyle} />}>
        Description
      </Tabs.Tab>
      <Tabs.Tab value="comments" leftSection={<IconMessageCircle style={iconStyle} />}>
        Comments
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="description">
      Gallery tab content
    </Tabs.Panel>

    <Tabs.Panel value="comments">
      Messages tab content
    </Tabs.Panel>
  </Tabs>
  )
}

export default ProductDetailTabs