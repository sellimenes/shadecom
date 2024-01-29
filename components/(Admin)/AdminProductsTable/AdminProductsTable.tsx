'use client';

import cx from 'clsx';
import { useEffect, useState } from 'react';
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
import { IconPencil, IconTrash } from '@tabler/icons-react';

import classes from './AdminProductsTable.module.css';
import { getAllProducts } from '@/lib/actionsProduct';

export default function AdminProductsTable() {
  const [selection, setSelection] = useState(['0']);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  // useEffect(() => {
  //   console.log(products)
  // }, [products]);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === products.length ? [] : products.map((item: any) => item.id)));

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

  const rows = products.map((item: any) => {
    const selected = selection.includes(item.ID);
    return (
      <Table.Tr key={item.ID} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox
            color="primary"
            checked={selection.includes(item.ID)}
            onChange={() => toggleRow(item.ID)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.CoverImage} radius={26} />
            <Text size="sm" fw={500}>
              {item.Name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Badge color="primary" variant="light">
            {item.Category.Name}
          </Badge>
        </Table.Td>
        <Table.Td>{item.Stock}</Table.Td>
        <Table.Td>${item.Price}</Table.Td>
        <Table.Td>Active</Table.Td>
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
            <Table.Th>Status</Table.Th>
            <Table.Th align="right" />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
