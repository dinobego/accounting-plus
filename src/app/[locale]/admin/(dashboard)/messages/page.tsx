import MessagesPanel from '@/components/admin/MessagesPanel';
import { getMessages } from '@/lib/cms/store';

export default function AdminMessagesPage() {
  return <MessagesPanel initial={getMessages()} />;
}
