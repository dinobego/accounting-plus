import { revalidatePath } from 'next/cache';

export function revalidatePublicContent() {
  revalidatePath('/', 'layout');
  revalidatePath('/sitemap.xml');
}
