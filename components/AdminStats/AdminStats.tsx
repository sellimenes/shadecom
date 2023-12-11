import React from 'react';
import { Group, Paper, Text, ThemeIcon, SimpleGrid, Grid } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import classes from './AdminStats.module.css';

type Props = {};

const data = [
  { title: 'Sales', value: '$13,456', diff: 34 },
  { title: 'Orders', value: '485', diff: -13 },
  { title: 'New Customers', value: '84', diff: 18 },
  { title: 'Traffic', value: '8.745', diff: 18 },
];

export function AdminStats() {
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Grid.Col
        key={stat.title}
        className={classes.cardWrapper}
        span={{
          base: 12,
          sm: 6,
          lg: 3,
        }}
      >
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <div>
              <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
                {stat.title}
              </Text>
              <Text fw={700} fz="xl">
                {stat.value}
              </Text>
            </div>
            <ThemeIcon
              color="gray"
              variant="light"
              style={{
                color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
              }}
              size={38}
              radius="md"
            >
              <DiffIcon size="1.8rem" stroke={1.5} />
            </ThemeIcon>
          </Group>
          <Text c="dimmed" fz="sm" mt="md">
            <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
              {stat.diff}%
            </Text>{' '}
            {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
          </Text>
        </Paper>
      </Grid.Col>
    );
  });

  return (
    <div className={classes.root}>
      <Grid gutter={'xs'}>{stats}</Grid>
    </div>
  );
}

export default AdminStats;
