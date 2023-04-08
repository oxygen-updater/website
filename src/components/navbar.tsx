import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faAngleUp, faMoon as fasMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'preact/hooks';
import Logo from 'src/components/logo';
import NavLink from 'src/components/navlink';
import { useTheme } from 'src/hooks/theme';
import type { HrefAndText } from 'src/models/copyright-item.interface';
import { KEY_THEME_DARK, KEY_THEME_LIGHT } from 'src/models/theme.type';
import { BREAKPOINT_XS } from 'src/utilities/breakpoints';

const links: HrefAndText[] = [{
	href: '/news/all/',
	text: 'News',
}, {
	href: '/faq/',
	text: 'FAQ',
}];

export default function Navbar() {

	const { events: routerEvents } = useRouter();

	const { theme, setTheme } = useTheme();

	const [dark, setDark] = useState<boolean>();
	const [showMoreLinks, setShowMoreLinks] = useState(false);

	useEffect(() => setDark(theme === KEY_THEME_DARK), [theme]);

	useEffect(() => {
		const xsBreakpointListener = () => setShowMoreLinks(false);
		const xsBreakpointMql = window.matchMedia(BREAKPOINT_XS);

		// Safari <14 doesn't support the non-deprecated counterparts:
		// https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#browser_compatibility
		xsBreakpointMql.addListener(xsBreakpointListener);
		routerEvents.on('routeChangeComplete', xsBreakpointListener);

		// Cleanup
		return () => {
			xsBreakpointMql.removeListener(xsBreakpointListener);
			routerEvents.off('routeChangeComplete', xsBreakpointListener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Perf: run only once (on mount & unmount)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const toggleShowMore = useCallback(() => setShowMoreLinks(!showMoreLinks), []);

	/**
	 * Switches user's preferred theme between light/dark
	 */
	const toggleTheme = useCallback(() => setTheme(
		dark ? KEY_THEME_LIGHT : KEY_THEME_DARK
		// eslint-disable-next-line react-hooks/exhaustive-deps
	), [dark]);

	return (
		<nav
			id="nav"
			className="typography"
		>
			<div className="container flex items-center px-4 h-16">
				<Link href="/">
					<a className="btn font-display font-bold text-xl -ms-5 hover:!bg-transparent">
						<Logo size={32} />
						<span className="ms-2 hidden sm:block">Oxygen Updater</span>
					</a>
				</Link>

				<span className="flex-auto" />

				<button
					className="mx-1 icon flex 2xs:hidden"
					title="Show more links"
					onClick={toggleShowMore}
				>
					<FontAwesomeIcon icon={showMoreLinks ? faAngleUp : faAngleDown} />
				</button>

				<div className={`links gap-y-4 hidden 2xs:flex ${showMoreLinks ? 'active absolute top-16 left-0 w-full p-4 flex-wrap !flex' : ''}`}>
					{links.map(routerPath =>
						<NavLink
							key={routerPath.href}
							href={routerPath.href}
						>
							<a className="btn font-medium">
								{routerPath.text}
							</a>
						</NavLink>
					)}
				</div>

				{/* eslint-disable-next-line react/jsx-no-target-blank */}
				<a
					className="btn play-store font-medium border-primary ms-4"
					href="https://play.google.com/store/apps/details?id=com.arjanvlek.oxygenupdater&utm_source=website-nav"
					target="_blank"
					rel="noopener"
				>
					<FontAwesomeIcon icon={faGooglePlay} />
					<span className="hidden">Download</span>
				</a>

				<button
					className="ms-2 -me-1 icon"
					title="Switch themes"
					onClick={toggleTheme}
				>
					<FontAwesomeIcon icon={dark ? fasMoon : farMoon} />
				</button>
			</div>
		</nav>
	);
}
