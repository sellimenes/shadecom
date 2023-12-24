import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';
import React, { Suspense } from 'react';
import AdminSiteSettingsForms from '@/components/AdminSiteSettingsForms/AdminSiteSettingsForms';

type Props = {};

const fethSettings = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'settings');
  const data = await res.json();
  return data;
};

const GeneralSettingsPage = async (props: Props) => {
  const settings = await fethSettings();
  return (
    <div>
      <AdminPageTitle title="General settings" />
      <Suspense fallback={<div>Loading...</div>}>
        <AdminSiteSettingsForms settingsData={settings} />
      </Suspense>
    </div>
  );
};

export default GeneralSettingsPage;
