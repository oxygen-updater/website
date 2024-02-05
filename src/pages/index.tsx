/* eslint-disable react/no-multi-comp */
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faAnglesDown, faStar as fasStar, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { GetStaticProps } from 'next';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import Accordion from 'src/components/accordion';
import DefaultHead from 'src/components/default-head';
import ExternalLink from 'src/components/external-link';
import Logo from 'src/components/logo';
import { featuredReviews, updateDate } from 'src/data/featured-reviews.list';
import { introItemList } from 'src/data/intro-items.list';
import { useTheme } from 'src/hooks/theme';
import type { EnabledDevice } from 'src/models/enabled-device.type';
import type { PlayStoreReview } from 'src/models/play-store-review';
import type { AppInfo } from 'src/models/response/app-info.interface';
import type { Device } from 'src/models/response/device.interface';
import type { Theme } from 'src/models/theme.type';
import { KEY_THEME_DARK } from 'src/models/theme.type';
import { TITLE } from 'src/pages/_document';
import styles from 'src/styles/Index.module.scss';
import { BREAKPOINT_SM } from 'src/utilities/breakpoints';
import { sanitize } from 'src/utilities/sanitize';

const REVIEW_LINK_PREFIX = 'https://play.google.com/store/apps/details?id=com.arjanvlek.oxygenupdater&reviewId=gp%3AAOqpTO';
const REVIEW_IMAGE_PREFIX = 'https://play-lh.googleusercontent.com/a';
const REVIEW_IMAGE_SIZE_SUFFIX = '=w48-h48';
const PREFERS_REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

gsap.registerPlugin(ScrollTrigger);

type GsapContent = (HTMLElement & {
	enter?: () => gsap.core.Tween;
	leave?: () => gsap.core.Tween;
});

interface Props {
	appInfo: AppInfo
	totalEnabledDevices: number
	enabledDevices: EnabledDevice[]
	featuredReviews: PlayStoreReview[]
}

export default function Home({
	appInfo,
	totalEnabledDevices,
	enabledDevices,
}: Props) {

	const { theme } = useTheme();

	const [themeSuffix, setThemeSuffix] = useState<Theme>();
	const [padForDevices, setPadForDevices] = useState<number[]>([]);

	const asideRef = useRef<HTMLElement>(null);

	const scrollTriggerRef = useRef<ScrollTrigger>();

	/**
	 * Initially check if reduced motion is preferred. Value is never updated.
	 *
	 * Used for disabling:
	 * - smooth scroll in {@link scrollToAside}
	 * - ScrollTrigger snapping in {@link setupScrollTrigger}
	 */
	let prefersReducedMotionRef = useRef(false);

	let contentMarkersRef = useRef<(HTMLElement & { content: GsapContent | null })[]>();
	let previousContentRef = useRef<GsapContent>();
	let previousProgressRef = useRef(0);

	let deviceColumnsPerRowRef = useRef<number>();

	useEffect(() => setThemeSuffix(theme), [theme]);

	useEffect(() => {
		const disableStIfMobile = (small: boolean) => small
			? scrollTriggerRef.current?.enable()
			: scrollTriggerRef.current?.disable();
		const smBreakpointListener = (event: MediaQueryListEvent) => {
			updatePadForDevices();
			disableStIfMobile(event.matches);
		};
		const prmListener = (event: MediaQueryListEvent) => {
			prefersReducedMotionRef.current = event.matches;
		};

		const smBreakpointMql = window.matchMedia(BREAKPOINT_SM);
		const prmMql = window.matchMedia(PREFERS_REDUCED_MOTION);

		// Safari <14 doesn't support the non-deprecated counterparts:
		// https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#browser_compatibility
		smBreakpointMql.addListener(smBreakpointListener);
		prmMql.addListener(prmListener);

		disableStIfMobile(smBreakpointMql.matches);
		prefersReducedMotionRef.current = prmMql.matches;

		// Cleanup
		return () => {
			smBreakpointMql.removeListener(smBreakpointListener);
			prmMql.removeListener(prmListener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Perf: run only once (on mount & unmount)

	useLayoutEffect(() => {
		updatePadForDevices();
		setupGsap();
		setupContentMarkers();
		setupScrollTrigger();

		ScrollTrigger.addEventListener('refreshInit', stRefreshRefreshInitListener);

		// Cleanup
		return () => {
			ScrollTrigger.removeEventListener('refreshInit', stRefreshRefreshInitListener);
			// Disable all ST functionality and remove internal listeners:
			// should be done because it's being used only on this page, and
			// NextJS/Preact routes to other pages.
			// Note #1: `ScrollTrigger.enable()` needs to be called before setup
			// Note #2: we don't need to call `scrollTriggerRef.current?.kill()`
			//          because it's done internally (for each trigger)
			// Note #3: trigger's `kill()` calls `disable()` internally
			ScrollTrigger.disable(true, true);
			scrollTriggerRef.current = undefined;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const stRefreshRefreshInitListener = useCallback(() => updatePadForDevices(), []);

	const scrollToAside = useCallback(() => asideRef.current?.scrollIntoView({
		behavior: prefersReducedMotionRef.current ? 'auto' : 'smooth',
	}), []);

	const setupContentMarkers = useCallback(() => {
		contentMarkersRef.current = gsap.utils.toArray('div[data-scroll-marker]');
		contentMarkersRef.current.forEach(marker => {
			marker.content = document.getElementById(marker.dataset.scrollMarker!);

			if (!marker.content) {
				// No marker content found; skip to next iteration
				return;
			}

			marker.content.enter = () => gsap.effects.fadeIn(marker.content);
			marker.content.leave = () => gsap.effects.fadeOut(marker.content);
		});
	}, []);

	const setupScrollTrigger = useCallback(() => {
		if (!scrollTriggerRef.current) {
			ScrollTrigger.enable(); // must be called first
			scrollTriggerRef.current = ScrollTrigger.create({
				trigger: `#${styles.scroller}`,
				toggleClass: 'active',
				start: 0,
				end: 'bottom center',
				pin: `#${styles.scrollerLeft}`,
				onUpdate: ({ progress }) => onScrollUpdate(progress),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * Handle the updated position
	 */
	const onScrollUpdate = useCallback((progress: number) => {
		// Perf: skip unless progress is at least 1.5%
		if (progress < 0.15) {
			return;
		}

		// Perf: skip unless progress difference is at least 9% (obtained experimentally)
		// Previous progress is updated only if new & previous content are different)
		if (Math.abs(progress - previousProgressRef.current) < 0.09) {
			return;
		}

		let newContent: GsapContent | null = null;
		const currentScrollY = scrollY;

		// Find new content: element that's roughly at the center of the screen
		// Perf: iterate from the end to find the last element that fits the criteria
		const contentMarkers = contentMarkersRef.current ?? [];
		for (let index = contentMarkers.length - 1; index >= 0; index--) {
			const marker = contentMarkers[index];
			if (currentScrollY > marker.offsetTop - (marker.offsetHeight >>> 1)) {
				newContent = marker.content;
				break;
			}
		}

		if (newContent && newContent !== previousContentRef.current) {
			// New & previous content are different, so...
			// 1. Animate previousContent out
			previousContentRef.current?.leave!();
			// 2. Animate newContent in
			newContent.enter!();

			// 3. Finally, update previous references
			previousProgressRef.current = progress;
			previousContentRef.current = newContent;
		}
	}, []);

	const updatePadForDevices = useCallback(() => {
		const length = enabledDevices.length;
		if (length === 0) {
			// Perf: padding isn't needed if list is empty
			setPadForDevices([]);
			return;
		}

		const parentContainerWidth = document.getElementById(styles.scrollerRight)?.offsetWidth || document.body.offsetWidth;
		const deviceContainerWidth = document.getElementById('device-0')?.offsetWidth || 200;
		const columnsPerRow = Math.floor(parentContainerWidth / deviceContainerWidth);
		if (columnsPerRow === 1) {
			// Perf: padding isn't needed if there's only one column
			setPadForDevices([]);
			return;
		}
		if (deviceColumnsPerRowRef.current === columnsPerRow) {
			// Perf: don't unnecessarily recalculate
			return;
		}

		const danglingColumnFraction = (length / columnsPerRow) % 1;
		if (danglingColumnFraction !== 0) {
			const remaining = columnsPerRow - Math.floor(danglingColumnFraction * columnsPerRow);
			// Instead of assigning to `Array(remaining)`, intentionally push
			// one by one: https://v8.dev/blog/elements-kinds#avoid-creating-holes
			const padForDevices = [];
			for (let i = 0; i < remaining; i++) {
				padForDevices.push(i);
			}

			setPadForDevices(padForDevices);
		} else {
			setPadForDevices([]);
		}

		deviceColumnsPerRowRef.current = columnsPerRow;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<DefaultHead title={TITLE} />

			<div id={styles.scroller}>
				<svg
					id={styles.scrollerLeft}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 511 1060"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="0"
					stroke="#000"
				>
					<defs>
						<clipPath id="a">
							<rect
								x="13"
								y="8"
								rx="40"
								width="calc(100% - 27px)"
								height="calc(100% - 16px)"
							/>
						</clipPath>
					</defs>
					<path
						d="M504 420v-60h3c1.662 0 3 1.784 3 4v52c0 2.216-1.338 4-3 4zM6 360V260H3c-1.662 0-3 2.973-3 6.667v86.667C0 357.027 1.338 360 3 360zm498-25v-50h3c1.662 0 3 1.487 3 3.333v43.333c0 1.847-1.338 3.333-3 3.333z"
						strokeWidth="1"
					/>
					<rect
						x="5"
						width="500"
						height="1060"
						rx="45"
					/>
					<rect
						x="14"
						y="9"
						width="482"
						height="1043"
						rx="40"
						fill="var(--bg)"
					/>
					{introItemList.map(item =>
						<image
							key={item.image}
							id={'image-' + item.image}
							className={styles.screenshot}
							href={`/img/screenshot/${item.image}_${themeSuffix || KEY_THEME_DARK}.webp?v=2`}
							width="100%"
							height="calc(100% - 16px)"
							x="-0.5"
							y="8"
							clipPath="url(#a)"
						/>
					)}
				</svg>

				<div id={styles.scrollerRight}>
					<header>
						<Logo size={128} />

						<h1>Oxygen Updater</h1>
						<p>
							v
							{appInfo.version || '0.0.0'}
							{appInfo.size ? `\u00a0•\u00a0${appInfo.size} MB` : ''}
						</p>

						<p>
							Skip staged rollout queues and update your
							{' '}
							<a
								href="https://www.oneplus.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								OnePlus
							</a>
							{' '}
							device
							{' '}
							<span title="As soon as possible">ASAP</span>
							!
						</p>

						<div>
							{/* eslint-disable-next-line react/jsx-no-target-blank */}
							<a
								href="https://play.google.com/store/apps/details?id=com.arjanvlek.oxygenupdater&utm_source=website-play-badge&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
								target="_blank"
								rel="noopener"
							>
								<img
									src="/img/google-play-store-badge-en.svg?v=1"
									width="200"
									alt="Get it on Google Play"
								/>
							</a>
							<button onClick={scrollToAside}>
								<FontAwesomeIcon icon={faAnglesDown} />
								<span>Skip intro</span>
							</button>
						</div>

						<p>
							An
							{' '}
							<ExternalLink href="https://github.com/oxygen-updater/oxygen-updater">
								open-source
							</ExternalLink>
							{' '}
							app supported by ads &
							{' '}
							<ExternalLink href="https://patreon.com/oxygenupdater">
								donations
							</ExternalLink>
							.
							{' '}
							Ads can be removed by purchasing the ad-free unlock in the app&apos;s settings. This is a third-party app, not an official OnePlus application.
						</p>
					</header>

					<h2>Be the first to update your OnePlus device</h2>

					<p>
						OnePlus, like all other OEMs, rolls out OTA updates in a staged manner. This means you might have to wait a long time before you receive the update. That&apos;s where this app comes in — it downloads only official updates directly from OnePlus/Google servers, and even verifies the integrity of the downloaded ZIP (using MD5 checksums) before allowing you to install. By doing so, Oxygen Updater lets you skip the rollout queue and install official updates at your convenience.
					</p>

					<p className="text-xs">
						Note: the app supports all OnePlus devices that aren&apos;t carrier-branded (e.g. T-Mobile & Verizon). Those devices can&apos;t be supported until you convert to unlocked firmware (this process is also called rebranding), because they lack the &ldquo;Local upgrade&rdquo; option, which is necessary to be able to update manually.
					</p>

					<Accordion summary={`Supported devices (${totalEnabledDevices} in total)`}>
						{enabledDevices.map(device =>
							<div
								key={device.image}
								id={`device-${device.ids.join(',')}`}
								className={styles.groupedDevice}
							>
								<img
									loading="lazy"
									decoding="async"
									src={device.image}
									alt={device.name}
								/>
								<span>{device.name}</span>
								{device.qualifiers?.length > 0 ? <small>{device.qualifiers.join('\u00a0•\u00a0')}</small> : ''}
							</div>
						)}

						{padForDevices.map(pad =>
							<div
								key={pad}
								className={`flex-auto border-r border-b ${styles.groupedDevice}`}
							/>
						)}
					</Accordion>

					{introItemList.map(item =>
						<div
							key={item.image}
							data-scroll-marker={'image-' + item.image}
						>
							{/* Wrap img in div with a fixed height, to prevent content jumps */}
							<div>
								<img
									loading="lazy"
									decoding="async"
									src={`/img/screenshot/${item.image}_${themeSuffix || KEY_THEME_DARK}.webp?v=2`}
									alt={item.image}
									style={{ objectPosition: item.crop }}
								/>
							</div>

							<h2>{item.h2}</h2>

							{item.p.map(text =>
								<p
									key={text.substring(0, 50)}
									// eslint-disable-next-line react/no-danger
									dangerouslySetInnerHTML={{
										__html: sanitize(text),
									}}
								/>
							)}

							{item.li && item.li.length > 0 ?
								<ul>
									{item.li.map(text =>
										<li key={text.substring(0, 50)}>{text}</li>
									)}
								</ul> : ''}

							{item.note ?
								<p className="text-xs">
									Note:
									{' '}
									{item.note}
								</p> : ''}
						</div>
					)}
				</div>
			</div>

			<aside
				ref={asideRef}
				className={styles.content}
			>
				<h1>Featured Play Store reviews</h1>

				<p>
					You&apos;ve read what we had to say about our app, but public reviews are far more important when it comes to verifying the accuracy of our claims & promises. We&apos;ve manually curated a few reviews, by going through the publicly-available list of
					{' '}
					<ExternalLink href="https://play.google.com/store/apps/details?id=com.arjanvlek.oxygenupdater&showAllReviews=true">
						all reviews
					</ExternalLink>
					{' '}
					(which we recommend skimming through to get an unbiased opinion). This list was last updated on
					{' '}
					<strong>
						<samp>
							<time
								title={updateDate}
								dateTime={updateDate}
							>
								{new Date(updateDate).toLocaleString()}
							</time>
						</samp>
					</strong>
					, so email us at
					{' '}
					<ExternalLink href="mailto:support@oxygenupdater.com">support@oxygenupdater.com</ExternalLink>
					{' '}
					if you find a discrepancy between content shown here and what&apos;s shown on Google Play. You can also email us in case you want us to remove your featured review.
				</p>

				<p className="text-xs">
					Note: none of these reviews were written/promoted in exchange of favour. If you contact us with a request of featuring your review, we will immediately get in touch with Google and tell them to delete it, since it doesn&apos;t just go against our principles of integrity, but also against their
					{' '}
					<ExternalLink href="https://play.google.com/about/comment-posting-policy/">
						Comment Posting Policy
					</ExternalLink>
					.
				</p>

				<Accordion
					contentClassName="border-l bg-hover"
					summaryClassName="border bg-hover hover:!bg-border"
					summary="Featured reviews"
					openByDefault
				>
					{featuredReviews.map(review =>
						<div
							key={review.id}
							className={styles.featuredReview}
						>
							<div>
								<img
									loading="lazy"
									decoding="async"
									src={REVIEW_IMAGE_PREFIX + review.author.image + REVIEW_IMAGE_SIZE_SUFFIX}
									alt={review.author.name}
								/>
								<div>
									<div>{review.author.name}</div>
									{Array.from({ length: 5 }, (_, index) =>
										<FontAwesomeIcon
											key={'review-' + index + 1}
											icon={(index + 1) <= review.rating ? fasStar : farStar}
										/>
									)}
									<span>{review.date}</span>
								</div>
								<a
									className="btn"
									href={REVIEW_LINK_PREFIX + review.id}
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faUpRightFromSquare} />
								</a>
							</div>
							<span>{review.content}</span>
						</div>
					)}
				</Accordion>
			</aside>
		</>
	);
}

const setupGsap = () => {
	gsap.defaults({
		duration: 0.3,
		overwrite: 'auto',
	});

	gsap.registerEffect({
		name: 'fadeIn',
		effect: (targets: gsap.TweenTarget) => gsap.to(targets, {
			autoAlpha: 1,
		}),
	});

	gsap.registerEffect({
		name: 'fadeOut',
		effect: (targets: gsap.TweenTarget) => gsap.to(targets, {
			autoAlpha: 0,
		}),
	});
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const baseUrl = process.env.API_BASE_URL!;
	const appInfo = await (
		await fetch(baseUrl, {
			method: 'POST',
			body: JSON.stringify({
				type: process.env.API_TYPE_APP_INFO,
			}),
		})
	).json() as AppInfo;
	const devices = await (
		await fetch(baseUrl, {
			method: 'POST',
			body: JSON.stringify({
				type: process.env.API_TYPE_DEVICES_ENABLED,
			}),
		})
	).json() as Device[];

	const totalEnabledDevices = devices.length;
	const enabledDevicesGroupedByImageUrl = new Map<string, EnabledDevice>();
	devices.forEach(device => {
		const imageWithoutCacheBuster = device.image.split('?v=', 2)[0];
		let existing = enabledDevicesGroupedByImageUrl.get(imageWithoutCacheBuster);
		const split = device.name.split('(', 2).map(element => element.trim());
		if (!existing) {
			existing = { ids: [device.id], name: split[0], image: device.image, qualifiers: [] };
			enabledDevicesGroupedByImageUrl.set(imageWithoutCacheBuster, existing);
		} else {
			if (existing.ids.indexOf(device.id) === -1) {
				existing.ids.push(device.id);
			}

			if (existing.qualifiers.length === 0) {
				existing.qualifiers.push('Global');
			}
		}

		if (split.length === 2) {
			const region = split[1].replaceAll(')', '');
			if (existing.qualifiers.indexOf(region) === -1) {
				existing.qualifiers.push(region);
			}
		}
	});

	const enabledDevices: EnabledDevice[] = [];
	enabledDevicesGroupedByImageUrl.forEach((value, key) => {
		value.ids.sort();
		enabledDevices.push(value);
	});

	return {
		props: {
			appInfo,
			enabledDevices,
			totalEnabledDevices,
			featuredReviews,
		},
	};
};
