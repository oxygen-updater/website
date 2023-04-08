import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { copyrightItemList } from 'src/data/copyright-items.list';
import { iconItemList } from 'src/data/icon-items.list';
import type { HrefAndText } from 'src/models/copyright-item.interface';
import ExternalLink from './external-link';

const links: HrefAndText[] = [{
	href: '/privacy',
	text: 'Privacy Policy',
}];

export default function Footer() {
	return (
		<footer className="border-t border-border pt-8 pb-4 px-4 text-fg-variant">
			<div className="container">
				<ul className="list-none text-2xl">
					{iconItemList.map(item =>
						<li
							key={item.url}
							className="inline-block me-6 last:me-0"
						>
							{/* eslint-disable-next-line react/jsx-no-target-blank */}
							<a
								className="!border-none"
								href={item.url}
								rel={item.rel}
								title={item.tooltip}
								target="_blank"
							>
								<FontAwesomeIcon icon={item.icon} />
							</a>
						</li>
					)}
				</ul>

				{links.map(routerPath =>
					<Link
						key={routerPath.href}
						href={routerPath.href}
					>
						<a className="text-xs me-4">{routerPath.text}</a>
					</Link>
				)}

				<ul className="list-none mt-4 text-xs">
					{copyrightItemList.map(item =>
						<li
							key={item.href}
							className="leading-relaxed first:mb-4"
						>
							{item.prefix}
							{' '}
							<ExternalLink href={item.href}>{item.text}</ExternalLink>
							{' '}
							{item.suffix}
						</li>
					)}
				</ul>
			</div>
		</footer>
	);
}
