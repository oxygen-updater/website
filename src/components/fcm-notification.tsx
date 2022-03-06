import { initializeApp } from '@firebase/app';
import type { MessagePayload, Messaging } from '@firebase/messaging';
import { getToken, isSupported, onMessage } from '@firebase/messaging';
import { faBell, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getMessaging } from 'firebase/messaging';
import type { StateUpdater } from 'preact/hooks';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { firebaseOptions } from 'public/_config/firebase-options';
import type { Article } from 'src/models/response/article.interface';
import { TITLE } from 'src/pages/_document';

const FCM_TOPIC_NEWS = process.env.NEXT_PUBLIC_FCM_TOPIC_NEWS as string;
const FCM_SW_SCOPE = '/firebase-cloud-messaging-push-scope';
const FCM_DB = 'firebase-messaging-database';
const FCM_OBJECT_STORE = 'firebase-messaging-store';

const firebaseApp = initializeApp(firebaseOptions, 'Oxygen Updater');

interface Props {
	onNewArticle: (article: Article) => void
}

export default function FcmNotification({ onNewArticle }: Props) {

	const [showRequest, setShowRequest] = useState(shouldShowNotificationRequest());
	const [permission, setPermission] = useState<NotificationPermission | undefined>();

	const hideClicked = useCallback(() => {
		updateNotificationRequestLastHidden();
		setShowRequest(false);
	}, []);

	const requestPermission = useCallback(() => isSupported().then(supported => {
		if (supported) {
			Notification.requestPermission().then(
				permission => setPermission(permission),
				error => setPermission(Notification.permission),
			);
		} else {
			setPermission(undefined);
		}
	}), []);

	useEffect(() => {
		setShowRequest(shouldShowNotificationRequest());

		isSupported().then(supported => {
			if (supported) {
				const notifPermission = Notification.permission;
				setPermission(notifPermission);

				const messaging = getMessaging(firebaseApp);
				onMessage(messaging, payload => onForegroundMessage(payload, onNewArticle));

				if (notifPermission !== 'denied') {
					ensureServiceWorkerIsRegistered(messaging, setPermission);
				} else {
					syncTopicRelation();
				}
			} else {
				setPermission(undefined);
			}
		});
	}, [onNewArticle]); // Perf: run only when `onNewArticle` changes

	return (
		showRequest && (permission !== undefined && permission !== 'granted') ?
			// For some reason if it's a <div>, NextJS/Preact renders the HTML
			// classes of `NewsPagination` from the second-load onwards
			<section className="flex flex-wrap items-center justify-end px-4 py-1 -mx-4 sm:border-x border-b border-border sm:rounded-b">
				<span className="flex-auto mt-2 xs:mt-0">Enable notifications if you&apos;d like to be kept informed of our articles</span>

				<div className="flex">
					<button
						className="icon -ml-1"
						onClick={requestPermission}
					>
						<FontAwesomeIcon
							className="text-green-500 dark:text-green-400"
							icon={faBell}
						/>
					</button>
					<button
						className="icon -mr-1"
						onClick={hideClicked}
					>
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</div>
			</section> : null
	);
}

/**
 * Listen to messages received while in the foreground
 */
const onForegroundMessage = (
	payload: MessagePayload,
	onNewArticle: (article: Article) => void,
) => {
	const notification = payload.notification;
	const data = payload.data;

	const date = new Date().toISOString();
	if (data) {
		const article = data as unknown as Article;
		article.author ||= TITLE;
		article.publishDate ??= date;
		article.editDate ??= date;
		onNewArticle(article);
	} else if (notification) {
		onNewArticle({
			id: 0,
			image: notification.image,
			author: TITLE,
			publishDate: date,
			editDate: date,
			title_en: notification.title,
			subtitle_en: notification.body,
		});
	}
};

type SetPermission = StateUpdater<NotificationPermission | undefined>;

const ensureServiceWorkerIsRegistered = (
	messaging: Messaging,
	setPermission: SetPermission,
) => navigator?.serviceWorker?.getRegistration(
	FCM_SW_SCOPE
).then(existing => existing
	? registrationCallback(messaging, existing, setPermission)
	: navigator?.serviceWorker?.register('/fcm-sw.js', {
		// Breaks in Chrome: https://bugs.chromium.org/p/chromium/issues/detail?id=1292379#c15.
		// As a result, we can't use v9+ modular APIs since they're ESMs.
		// Instead, their `compat` variants are used with v8-style code.
		// type: 'module',
		scope: FCM_SW_SCOPE,
	}).then(registration => registrationCallback(messaging, registration, setPermission))
);

const registrationCallback = (
	messaging: Messaging,
	registration: ServiceWorkerRegistration,
	setPermission: SetPermission,
) => {
	getToken(messaging, {
		vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
		serviceWorkerRegistration: registration,
	}).then(
		token => setPermission('granted'),
		error => console.error(error),
	).finally(() => {
		setPermission(Notification.permission);
		syncTopicRelation();
	});
};

const syncTopicRelation = () => window?.indexedDB?.databases().then(dbInfo => {
	const fcmDbExists = dbInfo.find(db => db.name === FCM_DB) != null;
	if (!fcmDbExists) {
		return;
	}

	const openRequest = window.indexedDB.open(FCM_DB);
	openRequest.onsuccess = () => {
		try {
			// Both lines may throw `DOMException: NotFoundError` if store doesn't exist
			const transaction = openRequest.result.transaction(FCM_OBJECT_STORE);
			const fcmStore = transaction.objectStore(FCM_OBJECT_STORE);

			const getRequest = fcmStore.get(firebaseOptions.appId!);
			getRequest.onsuccess = async () => {
				const token: string = getRequest.result?.token;
				if (!token) {
					return;
				}

				const info = await iidGetInfo(token);
				if (Notification.permission === 'granted') {
					// User has enabled notifications...
					if (!info?.rel?.topics || !info.rel.topics[FCM_TOPIC_NEWS]) {
						// ...but token hasn't yet been subscribed to topic
						await iidSubscribeToTopic(token);
					}
				} else {
					// User has disabled notifications, so unsubscribe token to topic
					await iidUnsubscribeToTopic(token);
				}
			};
		} catch {
			// no-op
		}
	};
});

const KEY_NOTIFICATION_REQUEST_LAST_HIDDEN = 'notification_request_last_hidden';

const shouldShowNotificationRequest = () => {
	if (typeof window === 'undefined') return undefined;
	let showRequest = true;
	try {
		const isoDate = localStorage.getItem(KEY_NOTIFICATION_REQUEST_LAST_HIDDEN) || '0000';
		const today = new Date();
		today.setDate(today.getDate() - 2);
		const lastHidden = new Date(isoDate);
		showRequest = today > lastHidden;
	} catch {
		// unsupported
	}
	return showRequest;
};
const updateNotificationRequestLastHidden = () => {
	try {
		localStorage.setItem(KEY_NOTIFICATION_REQUEST_LAST_HIDDEN, new Date().toISOString());
	} catch {
		// unsupported
	}
};

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_PREFIX + '/api/iid/';

const iidGetInfo = async (token: string) => (
	await fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify({
			action: 'info',
			token,
		}),
	})
).json();

const iidSubscribeToTopic = async (token: string) => (
	await fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify({
			action: 'subscribe',
			token,
		}),
	})
).json();

const iidUnsubscribeToTopic = async (token: string) => (
	await fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify({
			action: 'unsubscribe',
			token,
		}),
	})
).json();
