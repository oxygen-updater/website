import { faDiscord, faGithub, faGooglePlay, faPatreon, faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import type { IconItem } from 'src/models/icon-item.interface';

export const iconItemList: IconItem[] = [{
	icon: faGooglePlay,
	tooltip: 'Play Store',
	url: 'https://play.google.com/store/apps/details?id=com.arjanvlek.oxygenupdater&utm_source=website-footer',
	rel: 'noopener',
}, {
	icon: faGithub,
	tooltip: 'GitHub',
	url: 'https://github.com/oxygen-updater/oxygen-updater',
	rel: 'noopener',
}, {
	icon: faPatreon,
	tooltip: 'Patreon',
	url: 'https://patreon.com/oxygenupdater',
	rel: 'noopener',
}, {
	icon: faDiscord,
	tooltip: 'Discord',
	url: 'https://discord.gg/5TXdhKJ',
	rel: 'noopener noreferrer',
}, {
	icon: faEnvelope,
	tooltip: 'Email',
	url: 'mailto:support@oxygenupdater.com',
	rel: 'noopener noreferrer',
}, {
	icon: faRedditAlien,
	tooltip: 'Reddit',
	url: 'https://reddit.com/r/OxygenUpdater',
	rel: 'noopener',
}];
