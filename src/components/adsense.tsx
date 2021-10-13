import Script from 'next/script';
import { useCallback, useLayoutEffect, useRef } from 'preact/hooks';
import { useTheme } from 'src/hooks/theme';
import { KEY_THEME_DARK } from 'src/models/theme.type';

const DEFAULT_CLASS = 'adsbygoogle !block';

declare global {
	interface Window {
		adsbygoogle: {
			loaded: boolean
			push: (params: object) => void
		}
	}
}

type AdType = 'display' | 'infeed' | 'inarticle' | 'matchedcontent';
interface Props {
	type: AdType
}

export default function GoogleAdsense({ type }: Props) {

	const { theme } = useTheme();

	const insRef = useRef<HTMLModElement>(null);

	const renderSwitch = useCallback((type: AdType) => {
		const adSlot = getAdSlot(type, theme === KEY_THEME_DARK);
		const className = `${type} ${DEFAULT_CLASS}`;

		switch (type) {
			case 'display': return (
				<ins
					ref={insRef}
					className={className}
					data-ad-client="ca-pub-1816831161514116"
					data-ad-slot={adSlot}
					data-ad-format="auto"
					data-full-width-responsive="true"
				/>
			);
			case 'infeed': return (
				<ins
					ref={insRef}
					className={`${className} border-t`}
					data-ad-client="ca-pub-1816831161514116"
					data-ad-slot={adSlot}
					data-ad-format="fluid"
					data-ad-layout-key="-f9-1b+1r-jp+17l"
					style={{ minHeight: '150px' }}
				/>
			);
			case 'inarticle': return (
				<ins
					ref={insRef}
					className={`${className} text-center`}
					data-ad-client="ca-pub-1816831161514116"
					data-ad-slot={adSlot}
					data-ad-format="fluid"
					data-ad-layout="in-article"
				/>
			);
			case 'matchedcontent': return (
				<ins
					ref={insRef}
					className={className}
					data-ad-client="ca-pub-1816831161514116"
					data-ad-slot={adSlot}
					data-ad-format="autorelaxed"
				/>
			);
		}
		// Dep-array is empty to ad slots don't change on theme changes, because
		// that's bad. Instead in `useLayoutEffect`, `data-ad-slot` is adjusted
		// according to theme, just before telling the SDK to load an ad.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useLayoutEffect(() => {
		insRef.current?.setAttribute(
			'data-ad-slot',
			getAdSlot(type, theme === KEY_THEME_DARK)
		);
		(window.adsbygoogle = window.adsbygoogle || []).push({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Perf: run only once (on mount & unmount)

	return (
		<>
			<Script
				key=".$adsense-script"
				strategy="beforeInteractive"
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1816831161514116"
				crossOrigin="anonymous"
				async
			/>

			{renderSwitch(type)}
		</>
	);
}

const getAdSlot = (type: AdType, dark: boolean) => {
	switch (type) {
		case 'display': return '6352018996';
		case 'infeed': return dark ? '1818704934' : '9142189087';
		case 'inarticle': return dark ? '8092183836' : '9688983997';
		case 'matchedcontent': return dark ? '2355575767' : '6550058027';
	}
};
