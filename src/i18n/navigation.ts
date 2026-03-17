// Libraries
import { createNavigation } from 'next-intl/navigation';
// Config
import { routing } from './routing';

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing);
