import Link from 'next/link';
import { useRouter } from 'next/router';
import type { VNode } from 'preact';
import { cloneElement } from 'preact';

interface Props extends Pick<HTMLAnchorElement, 'href'> {
	children: VNode<{ className: string }>
}

export default function NavLink({ children, href, ...props }: Props) {
	const { asPath } = useRouter();
	const childClassName = children?.props.className ?? '';

	// This assumes `href` starts & ends with `/`
	const base = href.substring(0, href.indexOf('/', 1));

	return (
		<Link
			href={href}
			{...props}
		>
			{asPath.startsWith(base) ? cloneElement(children, {
				className: `${childClassName} active`,
				href,
				...props,
			}) : children}
		</Link>
	);
}
