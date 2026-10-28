import MessagesPanel from '@/components/admin/MessagesPanel';
import { getMessages } from '@/lib/cms/store';

export default async function AdminMessagesPage() {
  return <MessagesPanel initial={await getMessages()} />;
}
