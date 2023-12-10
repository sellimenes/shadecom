'use client';

import AdminStats from '@/components/AdminStats/AdminStats';
import classes from './AdminPage.module.css';

// TODO: Drag and drop layout need to handle.
type Props = {};

const AdminPage = (props: Props) => {
  return (
    <div>
      <AdminStats />
    </div>
  );
};

export default AdminPage;
