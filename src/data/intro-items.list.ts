import type { IntroItem } from 'src/models/intro-item.interface';

export const introItemList: IntroItem[] = [{
	image: 'changelog',
	crop: 'bottom',
	h2: `View update information`,
	p: [
		`If there's a new update available, the app shows you the changelog right on the main screen (which can be handy if you'd like to know what's new in the update), as well as the filename and MD5 checksum for full transparency.`,
		`If you're already up-to-date, the app displays important information about that latest update:`,
	],
	li: [
		`Android & OxygenOS/ColorOS version`,
		`OTA version`,
		`Incremental OS version`,
		`Security patch date`,
	],
	note: `you can view the changelog even if you're already on the latest version, in case you forgot what that update brought you.`,
}, {
	image: 'downloading',
	crop: 'bottom',
	h2: `Built-in download manager`,
	p: [
		`The app has a robust download mechanism, and it always downloads official updates <strong>directly from OPPO/OnePlus/Google servers</strong>. Assuming you have a sufficiently fast & stable internet connection, high speeds are almost always a guarantee.`,
		`The app <strong>automatically reports download failures</strong> to our team members, so that we can investigate & fix things if possible.`,
	],
	note: `since the app always downloads directly from OPPO/OnePlus/Google OTA servers, most of the time such failures are due to an unstable network connection on your end, or if you use a VPN (their servers block some VPNs).`,
}, {
	image: 'downloaded',
	crop: 'bottom',
	h2: `MD5 Verification`,
	p: [
		`After the download task successfully completes, the app automatically starts a verification task so that it can establish the downloaded file's integrity. Verifying the MD5 checksum <strong>protects against corruption or tampering</strong>.`,
		`If verification fails for any reason, the app auto-deletes the file to safeguard you & your device. A direct download link is shown so that you can try downloading the file via the browser and verify things yourself.`,
	],
	note: `since we employ rigorous validation checks behind-the-scenes, MD5 verification should never fail. In case it does, it's highly likely that it's just human error, and you should report this to us so we can investigate.`,
}, {
	image: 'install-guide',
	crop: 'top',
	h2: `Detailed install guides`,
	p: [
		`The installation process is handled by the system itself, and is fairly straightforward. If you're new to this or find yourself getting stuck somewhere, don't worry — the app shows a step-by-step installation guide after the download & verification tasks successfully complete.`,
		`We try and keep the guides up-to-date, but if you ever spot an opportunity for improvement, don't hesistate to let us know (either via <a href="mailto:support@oxygenupdater.com" target="_blank" rel="noopener noreferrer">email</a> or on our <a href="https://discord.gg/5TXdhKJ" target="_blank" rel="noopener noreferrer" class="external">Discord server</a>).`,
	],
}, {
	image: 'news-list',
	crop: 'top',
	h2: `Stay informed`,
	p: [
		`All our team members are well-versed in all things tech, and we write regular news articles as well. The usual topics are related to OPPO/OnePlus, their devices/policies, OxygenOS/ColorOS & new OTA updates, and sometimes we post updates about our project too.`,
		`We highly recommend reading through our articles, especially those about a new OTA update. There's often <strong>important information</strong> in those articles that all our users should be aware of.`,
	],
	note: `notifications for articles can be controlled within the app itself, as well as in Android's global notification settings screen.`,
}, {
	image: 'device',
	crop: 'top',
	h2: `Check device information`,
	p: [
		`The app lets you easily check important software & hardware information:`,
	],
	li: [
		`Device name (along with region, if any)`,
		`Model number`,
		`RAM configuration`,
		`SoC & frequency (as reported by the system)`,
		`Android & OxygenOS/ColorOS version`,
		`Security patch date`,
	],
	note: `most software information is also shown on the main screen if you're already up-to-date.`,
}, {
	image: 'theme',
	crop: 'bottom',
	h2: `Built-in themes`,
	p: [
		`<strong>Light</strong> & <strong>Dark</strong> themes, which are meticulously designed for the best possible experience (e.g. proper contrast ratios adhering to WCAG 2.0, no AMOLED black smear, etc).`,
		`There's also an option to use the <strong>System</strong>'s dark mode configuration if available (default), as well as an <strong>Auto</strong> theme: switches between light/dark based on time of day (to prevent eye strain at night), or based on battery percentage (dark themes generally help reduce battery usage).`,
		`Moreover, integrating with <strong>Material You/Monet on Android 12+</strong> allows adapting the entire app — even the icon — to your device wallpaper, giving a homogenous feel with the rest of the system.`,
	],
}];
