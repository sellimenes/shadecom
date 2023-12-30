import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';
import AdminSiteSettingsForms from '@/components/AdminSiteSettingsForms/AdminSiteSettingsForms';
import { getSettings } from '@/lib/actionsSettings';

const GeneralSettingsPage = async () => {
  const settings = await getSettings();
  return (
    <div>
      <AdminPageTitle title="General settings" />
      <AdminSiteSettingsForms settingsData={settings} />
    </div>
  );
};

export default GeneralSettingsPage;
