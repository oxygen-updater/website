// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from 'next/document';

export const TITLE = 'Oxygen Updater';
export const DEFAULT_META = (
	<>
		{/* Ensure this is synced with `og:description` */}
		<meta
			key=".$description"
			name="description"
			content="Oxygen Updater is an open-source app for OPPO/OnePlus devices that allows you to install official OTA (over-the-air) updates ASAP. Ensure your device is up-to-date — it's quick, easy, and free!"
		/>
		<meta
			key=".$author"
			name="author"
			content="Adhiraj S. Chauhan"
		/>

		{/* Default Open Graph tags */}
		<meta
			key=".$og:type"
			property="og:type"
			content="website"
		/>
		<meta
			key=".$og:title"
			property="og:title"
			content="Oxygen Updater — skip rollout queues & update your OPPO/OnePlus device ASAP!"
		/>
		<meta
			key=".$og:image"
			property="og:image"
			content="/img/favicon/android-chrome-96x96.png?v=1"
		/>
		{/* Ensure this is synced with `description` */}
		<meta
			key=".$og:description"
			property="og:description"
			content="Oxygen Updater is an open-source app for OPPO/OnePlus devices that allows you to install official OTA (over-the-air) updates ASAP. Ensure your device is up-to-date — it's quick, easy, and free!"
		/>

		{/* Default Twitter tags */}
		<meta
			key=".$twitter:card"
			name="twitter:card"
			content="app"
		/>
	</>
);

export default class MyDocument extends Document {

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta
						httpEquiv="X-UA-Compatible"
						content="IE=edge"
					/>
					<meta
						name="color-scheme"
						content="dark light"
					/>

					<meta
						key=".$keywords"
						name="keywords"
						content="Oxygen,OPPO,OnePlus,OxygenOS,ColorOS,OS,Android,AndroidOS,System,Update,Systemupdate,OTA,Flash,Download,Faster,App"
					/>

					{/* Global Open Graph tags */}
					<meta
						key=".$og:site_name"
						property="og:site_name"
						content="Oxygen Updater"
					/>

					{/* Global Twitter tags */}
					<meta
						key=".$twitter:creator"
						name="twitter:creator"
						content="@IAmAscii"
					/>
					<meta
						key=".$twitter:site"
						name="twitter:site"
						content="@IAmAscii"
					/>
					<meta
						key=".$twitter:app:name:googleplay"
						name="twitter:app:name:googleplay"
						content="Oxygen Updater"
					/>
					<meta
						key=".$twitter:app:id:googleplay"
						name="twitter:app:id:googleplay"
						content="com.arjanvlek.oxygenupdater"
					/>
					<meta
						key=".$twitter:app:url:googleplay"
						name="twitter:app:url:googleplay"
						content="https://play.google.com/store/apps/details?id=com.arjanvlek.oxygenupdater&utm_source=website-twitter-card"
					/>

					{/* Favicons */}
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/img/favicon/apple-touch-icon.png?v=1"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/img/favicon/favicon-32x32.png?v=1"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="192x192"
						href="/img/favicon/android-chrome-192x192.png?v=1"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/img/favicon/favicon-16x16.png?v=1"
					/>
					<link
						rel="manifest"
						href="/site.webmanifest?v=1"
					/>
					<link
						rel="mask-icon"
						href="/img/favicon/safari-pinned-tab.svg?v=1"
						// @ts-ignore
						color="#f50514"
					/>
					<link
						rel="shortcut icon"
						href="/favicon.ico?v=1"
					/>
					<meta
						key=".$apple-mobile-web-app-title"
						name="apple-mobile-web-app-title"
						content="Oxygen Updater"
					/>
					<meta
						key=".$application-name"
						name="application-name"
						content="Oxygen Updater"
					/>
					<meta
						key=".$msapplication-TileColor"
						name="msapplication-TileColor"
						content="#f50514"
					/>
					<meta
						key=".$msapplication-TileImage"
						name="msapplication-TileImage"
						content="/mstile-144x144.png?v=1"
					/>
					<meta
						key=".$theme-color"
						name="theme-color"
						content="#f50514"
					/>

					{/* For Google Fonts */}
					<link
						rel="dns-prefetch"
						href="https://fonts.googleapis.com"
					/>
					{/* eslint-disable-next-line @next/next/google-font-preconnect */}
					<link
						rel="dns-prefetch"
						href="https://fonts.gstatic.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					{/* Roboto, Google Sans Display, Fira Code */}
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Google+Sans+Display:wght@400;500;700&family=Fira+Code:wght@400&display=swap"
					/>
				</Head>

				<body className="dark">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
