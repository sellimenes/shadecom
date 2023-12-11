'use client';

import AdminStats from '@/components/AdminStats/AdminStats';
import classes from './AdminPage.module.css';
import { Title, Box, Flex, Skeleton, Group, Grid } from '@mantine/core';
import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';
import AdminTodo from '@/components/AdminTodo/AdminTodo';

// TODO: Drag and drop layout need to handle.
type Props = {};

const AdminPage = (props: Props) => {
  return (
    <div>
      <AdminPageTitle title="Dashboard" />
      <AdminStats />
      <Grid mt={16}>
        <Grid.Col span={{ base: 12, sm: 8 }}>
          <Skeleton h={200} animate={false} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          {/* <Skeleton h={200} animate={false} /> */}
          <AdminTodo />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AdminPage;
