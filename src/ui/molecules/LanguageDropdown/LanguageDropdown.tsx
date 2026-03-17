'use client';

// Built-in
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
// Libraries
import { useLocale, useTranslations } from 'next-intl';
import { Locale } from 'next-intl';
// Config
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
// Assets
import { ChevronDownIcon, CheckIcon } from '@/assets/icons';

export default function LanguageDropdown() {
	// Hooks
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const t = useTranslations('LanguageDropdown');
	// Refs
	const dropdownRef = useRef<HTMLDivElement>(null);
	// States
	const [isOpen, setIsOpen] = useState(false);

	// Functions
	function handleLocaleChange(nextLocale: Locale) {
		setIsOpen(false);
		router.replace(
			// @ts-expect-error -- TypeScript will validate that only known `params`
			// are used in combination with a given `pathname`. Since the two will
			// always match for the current route, we can skip runtime checks.
			{ pathname, params },
			{ locale: nextLocale },
		);
	}

	// Effects
	useEffect(() => {
		// Close dropdown when clicking outside
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div ref={dropdownRef} className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='inline-flex border items-center gap-2 rounded-lg hover:bg-gray-300 px-4 py-2 text-sm font-medium hover:cursor-pointer'
				aria-label={t('label')}
				aria-expanded={isOpen}
			>
				<span>{t('locale', { locale })}</span>
				<ChevronDownIcon
					className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>

			{isOpen && (
				<div className='absolute right-0 mt-3 w-48 rounded-lg bg-gray-300 shadow-lg z-50 border overflow-hidden'>
					<div role='menu' aria-orientation='vertical'>
						{routing.locales.map((loc) => (
							<button
								key={loc}
								onClick={() => {
									if (loc !== locale) {
										handleLocaleChange(loc as Locale);
									}
								}}
								className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
									loc === locale
										? 'bg-gray-300 font-medium'
										: 'text-gray-700 hover:bg-gray-400/50 hover:cursor-pointer'
								}`}
								role='menuitem'
							>
								<span>{t('locale', { locale: loc })}</span>
								{loc === locale && (
									<CheckIcon
										className='w-4 h-4 ml-auto'
										ariaLabel='Selected'
									/>
								)}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
