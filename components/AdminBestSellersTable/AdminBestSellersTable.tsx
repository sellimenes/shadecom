import { useState } from 'react';
import cx from 'clsx';
import { Table, ScrollArea, Text, Button, Group } from '@mantine/core';

import classes from './AdminBestSellersTable.module.css';

const data = [
  {
    sold: 32,
    name: 'Mantine T-shirt',
    price: '$12.99',
  },
  {
    sold: 28,
    name: 'Mantine Hoodie',
    price: '$19.99',
  },
  {
    sold: 25,
    name: 'Mantine Mug',
    price: '$9.99',
  },
  {
    sold: 18,
    name: 'Mantine Stickers Pack',
    price: '$4.99',
  },
  {
    sold: 12,
    name: 'Mantine Socks',
    price: '$8.99',
  },
  {
    sold: 8,
    name: 'Mantine Cap',
    price: '$14.99',
  },
  {
    sold: 4,
    name: 'Mantine Backpack',
    price: '$29.99',
  },
  {
    sold: 2,
    name: 'Mantine Jacket',
    price: '$49.99',
  },
];

export function AdminBestSellersTable() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('month');

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      className={classes.tableWrapper}
    >
      <Group p={6} justify="space-between" align="center">
        <Text c="primary" fw={600} fs="lg">
          Best Selling Items
        </Text>
        <Group gap={2}>
          <Button
            variant={activeTab === 'day' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('day')}
            gradient={{ from: 'red', to: 'primary' }}
            color="primary"
            size="compact-xs"
          >
            Today
          </Button>
          <Button
            variant={activeTab === 'week' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('week')}
            gradient={{ from: 'red', to: 'primary' }}
            color="primary"
            size="compact-xs"
          >
            7 Days
          </Button>
          <Button
            variant={activeTab === 'month' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('month')}
            gradient={{ from: 'red', to: 'primary' }}
            color="primary"
            size="compact-xs"
          >
            30 Days
          </Button>
        </Group>
      </Group>
      <Table>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th maw="10px">Sold</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Price</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row) => (
            <Table.Tr key={row.name}>
              <Table.Td maw="10px">{row.sold}</Table.Td>
              <Table.Td>{row.name}</Table.Td>
              <Table.Td>{row.price}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
