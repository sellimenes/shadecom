import { Title } from '@mantine/core';
import React from 'react';
import classes from './AdminPageTitle.module.css';

type Props = {
  title: string;
};

const AdminPageTitle = ({ title }: Props) => {
  return (
    <Title order={1} className={classes.pageTitle}>
      {title}
    </Title>
  );
};

export default AdminPageTitle;
