import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';
import React, { Suspense } from 'react';
import AdminSiteSettingsForms from '@/components/AdminSiteSettingsForms/AdminSiteSettingsForms';
import { getSettings } from '@/lib/actionsSettings';

type Props = {};

const GeneralSettingsPage = async (props: Props) => {
  const settings = await getSettings();
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
