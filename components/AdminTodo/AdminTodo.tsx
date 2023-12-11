import React from 'react';
import { Group, Box, Text, UnstyledButton } from '@mantine/core';

import classes from './AdminTodo.module.css';

type Props = {};

const AdminTodo = (props: Props) => {
  return (
    <Box h={'100%'} p={8} bg={'primary.2'} className={classes.todosWrapper}>
      <Group justify="space-between" align="center">
        <Text className={classes.todoTitle} c={'primary'}>
          Todo
        </Text>
        <Group gap={3}>
          <UnstyledButton className={classes.todoFilter}>All</UnstyledButton>
          <UnstyledButton className={classes.todoFilter}>Favorite</UnstyledButton>
          <UnstyledButton className={classes.todoFilter}>Completed</UnstyledButton>
        </Group>
      </Group>
    </Box>
  );
};

export default AdminTodo;
