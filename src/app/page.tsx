// Built-in
import { redirect } from 'next/navigation';
// Config
import { routing } from '@/i18n/routing';

/**
 * Root Page
 * Redirects to the default locale homepage
 */
export default function RootPage() {
	redirect(`/${routing.defaultLocale}`);
}
