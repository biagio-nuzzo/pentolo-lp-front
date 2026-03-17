import { SVGProps } from 'react';

interface ChevronDownIconProps extends SVGProps<SVGSVGElement> {
	className?: string;
	ariaLabel?: string;
}

export default function ChevronDownIcon({
	className = 'w-4 h-4',
	ariaLabel,
	...props
}: ChevronDownIconProps) {
	return (
		<svg
			className={className}
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
			aria-hidden={!ariaLabel}
			aria-label={ariaLabel}
			{...props}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M19 9l-7 7-7-7'
			/>
		</svg>
	);
}
