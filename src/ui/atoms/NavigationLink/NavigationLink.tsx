'use client';

// Built-in
import { ComponentProps } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
// Libraries
import clsx from 'clsx';
// Config
import { Link } from '@/i18n/navigation';

/**
 * Navigation Link
 * A navigation link component that highlights the active link based on the current layout segment
 *
 * @param href - The destination URL of the link
 * @param rest - Other props passed to the Link component
 */
const NavigationLink = ({ href, ...rest }: ComponentProps<typeof Link>) => {
	// Hooks
	const selectedLayoutSegment = useSelectedLayoutSegment();
	// Constants
	const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
	const isActive = pathname === href;
	// Classes
	const classes = clsx('transition-colors', {
		'text-black': isActive,
		'text-gray-400 hover:text-gray-200': !isActive,
	});

	return (
		<Link
			aria-current={isActive ? 'page' : undefined}
			className={classes}
			href={href}
			{...rest}
		/>
	);
};

export default NavigationLink;
