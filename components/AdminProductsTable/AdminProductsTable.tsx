'use client';

import cx from 'clsx';
import { useState } from 'react';
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
  ActionIcon,
  Badge,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import classes from './AdminProductsTable.module.css';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';

const data = [
  {
    id: '1',
    imageUrl:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Shade Lamp',
    category: 'Home Decor',
    price: 59.99,
    stock: 25,
  },
  {
    id: '2',
    imageUrl:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Shade T-Shirt',
    category: 'Designer',
    price: 99.99,
    stock: 15,
  },
  {
    id: '3',
    imageUrl:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Shade Hoodie',
    category: 'Designer',
    price: 129.99,
    stock: 5,
  },
  {
    id: '4',
    imageUrl:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Shade Book',
    category: 'Book',
    price: 3.99,
    stock: 10,
  },
  {
    id: '5',
    imageUrl:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Shade Keyboard',
    category: 'Electronics',
    price: 199.99,
    stock: 52,
  },
];

export default function AdminProductsTable() {
  const [selection, setSelection] = useState(['0']);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Are you sure you want to delete this product?',
      children: (
        <Text size="sm">
          We just don&apos;t want you to delete this product by accident. You can&apos;t undo this.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Delete'),
    });

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox
            color="primary"
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.imageUrl} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Badge color="primary" variant="light">
            {item.category}
          </Badge>
        </Table.Td>
        <Table.Td>{item.stock}</Table.Td>
        <Table.Td>${item.price}</Table.Td>
        <Table.Td>
          <Group gap={0} justify="flex-end">
            <ActionIcon variant="subtle" color="gray">
              <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red" onClick={openModal}>
              <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm" withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                color="primary"
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
              />
            </Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Stock</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th align="right" />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
