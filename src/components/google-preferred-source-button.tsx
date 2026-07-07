import type { ComponentChildren } from 'preact';

interface Props {
	href: string
	children: ComponentChildren
}

export default function GooglePreferredSourceButton() {
	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a
			href="https://www.google.com/preferences/source?q=oxygenupdater.com"
			target="_blank"
			rel="noopener"
			className="btn gap-2 w-fit mx-auto border-border border-t-0 rounded-t-none"
		>
			<img
				src="/img/google-favicon-2025.svg?v=1"
				width="24"
				alt="Google"
			/>
			Add us as a preferred source on Google
		</a>
	);
};
