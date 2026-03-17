import { SVGProps } from 'react';

interface CheckIconProps extends SVGProps<SVGSVGElement> {
	className?: string;
	ariaLabel?: string;
}

export default function CheckIcon({
	className = 'w-4 h-4',
	ariaLabel,
	...props
}: CheckIconProps) {
	return (
		<svg
			className={className}
			fill='currentColor'
			viewBox='0 0 20 20'
			aria-hidden={!ariaLabel}
			aria-label={ariaLabel}
			{...props}
		>
			<path
				fillRule='evenodd'
				d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
				clipRule='evenodd'
			/>
		</svg>
	);
}
