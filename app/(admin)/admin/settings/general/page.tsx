import AdminPageTitle from '@/components/(Admin)/AdminPageTitle/AdminPageTitle';
import AdminSiteSettingsForms from '@/components/(Admin)/AdminSiteSettingsForms/AdminSiteSettingsForms';
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
