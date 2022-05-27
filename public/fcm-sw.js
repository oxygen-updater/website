// Ensure Firebase version is synced with package.json
importScripts('https://www.gstatic.com/firebasejs/9.8.4/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.4/firebase-messaging-compat.js');
importScripts('./_config/firebase-options-compat.js');

// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/oninstall
self.addEventListener('install', event => {
	// SW code updates are separate from application updates, so code updates are
	// almost as straightforward as restarting the SW. Because of this, it's always
	// safe to skip waiting until application tabs are closed, and activate the new
	// SW version immediately.
	event.waitUntil(self.skipWaiting());
});

// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/onactivate
self.addEventListener('activate', event => {
	// As above, it's safe to take over from existing clients immediately, since the
	// new SW version will continue to serve the old application.
	event.waitUntil(self.clients.claim());
});

// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/onnotificationclick
self.addEventListener('notificationclick', event => {
	event.stopImmediatePropagation(); // don't let Firebase handle clicks
	event.notification.close();

	const data = event.notification.data;
	const url = data.url || data.FCM_MSG.notification.click_action;

	// Open URL in new tab or switch to it if already open
	event.waitUntil(self.clients.matchAll({
		type: 'window',
		includeUncontrolled: true,
	}).then(clientList => {
		const client = clientList.find(element => element.url === url);
		if (client && 'focus' in client) {
			return client.focus();
		}

		if (self.clients.openWindow) {
			return self.clients.openWindow(url);
		}
	}));
});

const app = firebase.initializeApp(firebaseOptions);
if (firebase.messaging.isSupported()) {
	const messaging = firebase.messaging(app);

	// https://firebase.google.com/docs/reference/js/messaging_sw.md#onbackgroundmessage
	messaging.onBackgroundMessage(payload => {
		if (payload.notification || !payload.data) {
			// If `notification` exists, Firebase will handle it automatically.
			// If not, then we need `data` to handle it ourselves.
			return;
		}

		const data = payload.data;
		const { TYPE, ENGLISH_MESSAGE, NEWS_ITEM_ID } = data;
		const icon = '/img/favicon/android-chrome-512x512.png?v=1';
		const image = icon;
		const title = TYPE === 'NEWS'
			? 'News article published'
			: TYPE === 'NEW_VERSION'
				? 'System update available'
				: TYPE === 'NEW_DEVICE'
					? 'New device supported'
					: TYPE === 'GENERAL_NOTIFICATION'
						? 'General'
						: '';
		const body = TYPE === 'NEWS' || TYPE === 'GENERAL_NOTIFICATION'
			? ENGLISH_MESSAGE
			: TYPE === 'NEW_VERSION'
				? `${data.NEW_VERSION_NUMBER} is now available for the ${data.DEVICE_NAME}!`
				: TYPE === 'NEW_DEVICE'
					? `The ${data.NEW_DEVICE_NAME} is now supported. Open the app to choose this device.`
					: '';

		// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
		self.registration.showNotification(title, {
			body,
			icon,
			image,
			requireInteraction: true,
			data: {
				url: NEWS_ITEM_ID ? `/article/${NEWS_ITEM_ID}/` : '/news/all/',
			},
		});
	});
}
