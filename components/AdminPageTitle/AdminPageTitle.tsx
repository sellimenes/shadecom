import { Button, Group, Title } from '@mantine/core';
import React from 'react';
import classes from './AdminPageTitle.module.css';

type Props = {
  title: string;
  btnTitle?: string;
  href?: string;
};

const AdminPageTitle = ({ title, btnTitle, href }: Props) => {
  return (
    <Group justify="space-between" align="center">
      <Title order={1} className={classes.pageTitle}>
        {title}
      </Title>
      {btnTitle && (
        <Button
          variant="gradient"
          gradient={{ from: 'red', to: 'primary' }}
          component="a"
          href={href}
        >
          {btnTitle}
        </Button>
      )}
    </Group>
  );
};

export default AdminPageTitle;
