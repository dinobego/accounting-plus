import SettingsForm from '@/components/admin/SettingsForm';
import { getSettings } from '@/lib/cms/store';

export default async function AdminSettingsPage() {
  return <SettingsForm initial={await getSettings()} />;
}
