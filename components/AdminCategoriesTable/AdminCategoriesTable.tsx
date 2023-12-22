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
  Modal,
  Input,
  Button,
  Skeleton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import classes from './AdminCategoriesTable.module.css';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

type category = {
  ID: string;
  Name: string;
};

type Props = {
  isCreateOpen: boolean;
  closeCreate: () => void;
};

export default function AdminCategoriesTable({ isCreateOpen, closeCreate }: Props) {
  const [isEditOpen, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState({} as category);
  const [selection, setSelection] = useState(['0']);

  // Category CRUD
  const getCategories = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}category`);
    const data = await res.json();
    setCategories(data.categories);
    console.log(data.categories);
    setLoading(false);
  };

  const deleteCategory = async (ID: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}category/${ID}`, {
      method: 'DELETE',
    });
    await getCategories();

    return await res.json();
  };

  const updateCategory = async (ID: string, Name: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}category/${ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name }),
    });
    closeEdit();
    await getCategories();

    return await res.json();
  };

  const createCategory = async (Name: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name }),
      });

      closeCreate();
      await getCategories();

      if (res.status === 400) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: 'Same category already exists.',
        });
        return;
      }

      return await res.json();
    } catch (error) {
      console.log('There has been a problem with your fetch operation:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  // End Category CRUD

  const toggleRow = (ID: string) =>
    setSelection((current) =>
      current.includes(ID) ? current.filter((item) => item !== ID) : [...current, ID]
    );

  const toggleAll = () =>
    setSelection((current) =>
      current.length === categories.length
        ? []
        : categories.map((category: category) => category.ID)
    );

  const openDeleteModal = (id: string) =>
    modals.openConfirmModal({
      title: 'Are you sure you want to delete this category?',
      children: (
        <Text size="sm">
          We just don&apos;t want you to delete this category by accident. You can&apos;t undo this.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteCategory(id),
    });

  const openEditModal = (category: category) => {
    // Düzenlenen kategorinin ID'sini saklayın
    setEditingCategory(category);
    // Modal'ı açın
    openEdit();
  };

  if (loading) {
    return (
      <>
        <Skeleton height={30} mt={6} radius="xl" />
        <Skeleton height={30} mt={6} radius="xl" />
        <Skeleton height={30} mt={6} radius="xl" />
        <Skeleton height={30} mt={6} radius="xl" />
      </>
    );
  }

  const rows = categories?.map((category: category) => {
    const selected = selection.includes(category.ID);
    return (
      <Table.Tr key={category.ID} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox
            color="primary"
            checked={selection.includes(category.ID)}
            onChange={() => toggleRow(category.ID)}
          />
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={500}>
            {category.Name}
          </Text>
        </Table.Td>

        <Table.Td>
          <Group gap={0} justify="flex-end">
            <ActionIcon variant="subtle" color="gray" onClick={() => openEditModal(category)}>
              <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red" onClick={() => openDeleteModal(category.ID)}>
              <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Modal opened={isEditOpen} onClose={closeEdit} title="Edit Category" centered>
        <Input
          placeholder="Name"
          value={editingCategory.Name}
          onChange={(e) => setEditingCategory({ ...editingCategory, Name: e.currentTarget.value })}
        />
        <Button
          variant="light"
          color="primary"
          mt={8}
          onClick={() => updateCategory(editingCategory.ID, editingCategory.Name)}
        >
          Update
        </Button>
      </Modal>
      <Modal opened={isCreateOpen} onClose={closeCreate} title="Create Category" centered>
        <Input
          placeholder="Name"
          onChange={(e) => setEditingCategory({ ...editingCategory, Name: e.currentTarget.value })}
        />
        <Button
          variant="light"
          color="primary"
          mt={8}
          onClick={() => createCategory(editingCategory.Name)}
        >
          Create
        </Button>
      </Modal>
      <Table miw={800} verticalSpacing="sm" withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                color="primary"
                onChange={toggleAll}
                checked={selection.length === categories.length}
                indeterminate={selection.length > 0 && selection.length !== categories.length}
              />
            </Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th align="right" />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
