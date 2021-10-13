import Head from 'next/head';
import type { ComponentChildren } from 'preact';
import { DEFAULT_META } from 'src/pages/_document';

interface Props {
	title: string
	children?: ComponentChildren
}

export default function DefaultHead({ title, children }: Props) {
	return (
		<Head>
			<title>{title}</title>
			{DEFAULT_META}
			<meta
				key=".$og:title"
				property="og:title"
				content={title}
			/>
			{children}
		</Head>
	);
}
