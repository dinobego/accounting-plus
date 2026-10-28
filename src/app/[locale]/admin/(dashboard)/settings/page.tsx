import SettingsForm from '@/components/admin/SettingsForm';
import { getSettings } from '@/lib/cms/store';

export default function AdminSettingsPage() {
  return <SettingsForm initial={getSettings()} />;
}
