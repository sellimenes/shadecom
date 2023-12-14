import React, { useState } from 'react';
import {
  Group,
  Box,
  Text,
  Stack,
  Flex,
  Checkbox,
  ScrollArea,
  Button,
  Modal,
  Input,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './AdminTodo.module.css';
import { IconPlus } from '@tabler/icons-react';

type Props = {};

const AdminTodo = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState('all');
  const todos = [1, 2, 3, 4, 5, 6];
  return (
    <Box h={'300'} p={8} className={classes.todosWrapper}>
      <ActionIcon className={classes.addTodo} onClick={open} radius={'xl'} bg={'primary'}>
        <IconPlus />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title="Add Todo">
        <Input placeholder="Todo" mb={8} />
        <Button variant="light" color="primary">
          Add
        </Button>
      </Modal>
      <ScrollArea h={'300'}>
        <Group justify="space-between" align="center">
          <Text c={'primary'} fw={600} fs={'lg'}>
            Todo
          </Text>
          <Group gap={2}>
            <Button
              variant={activeTab === 'all' ? 'gradient' : 'outline'}
              onClick={() => setActiveTab('all')}
              gradient={{ from: 'red', to: 'primary' }}
              color="primary"
              size="compact-xs"
            >
              All
            </Button>
            <Button
              variant={activeTab === 'favorite' ? 'gradient' : 'outline'}
              onClick={() => setActiveTab('favorite')}
              gradient={{ from: 'red', to: 'primary' }}
              color="primary"
              size="compact-xs"
            >
              Favorite
            </Button>
            <Button
              variant={activeTab === 'completed' ? 'gradient' : 'outline'}
              onClick={() => setActiveTab('completed')}
              gradient={{ from: 'red', to: 'primary' }}
              color="primary"
              size="compact-xs"
            >
              Completed
            </Button>
          </Group>
        </Group>
        <Stack mt={16}>
          {todos.map((todo) => (
            <SingleTodo key={todo} />
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
};

const SingleTodo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Flex align={'center'} justify={'between'}>
      <Checkbox
        size="xs"
        color={'primary'}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <Text ml={6} size="sm" c={'muted'} className={`${checked ? classes.todoChecked : ''}`}>
        Single Todo
      </Text>
    </Flex>
  );
};

export default AdminTodo;
