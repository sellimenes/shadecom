import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';
import React from 'react';
import AdminSiteSettingsForms from '@/components/AdminSiteSettingsForms/AdminSiteSettingsForms';
import { getSettings } from '@/lib/actionsSettings';

type Props = {};

const GeneralSettingsPage = async (props: Props) => {
  const settings = await getSettings();
  return (
    <div>
      <AdminPageTitle title="General settings" />
      <AdminSiteSettingsForms settingsData={settings} />
    </div>
  );
};

export default GeneralSettingsPage;
