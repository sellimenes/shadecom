import { Button, Group, Title } from '@mantine/core';
import React from 'react';
import classes from './AdminPageTitle.module.css';

type Props = {
  title: string;
  btnTitle?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const AdminPageTitle = ({ title, btnTitle, href, onClick }: Props) => {
  return (
    <Group justify="space-between" align="center">
      <Title order={1} className={classes.pageTitle}>
        {title}
      </Title>
      {btnTitle && href && (
        <Button
          variant="gradient"
          gradient={{ from: 'red', to: 'primary' }}
          component={'a'}
          href={href}
        >
          {btnTitle}
        </Button>
      )}
      {btnTitle && onClick && (
        <Button variant="gradient" gradient={{ from: 'red', to: 'primary' }} onClick={onClick}>
          {btnTitle}
        </Button>
      )}
    </Group>
  );
};

export default AdminPageTitle;
