import type { ComponentChildren } from 'preact';

interface Props {
	href: string
	children: ComponentChildren
}

export default function ExternalLink({ href, children }: Props) {
	return (
		<a
			className={href?.startsWith('mailto:') ? '' : 'external'}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	);
};
