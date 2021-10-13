import type { PlayStoreReview } from 'src/models/play-store-review';

// Note to contributors: time must be UTC/GMT
export const updateDate = new Date('2022-01-11 07:05 UTC').toISOString();

/**
 * Prefix 'https://play.google.com/store/apps/details?id=com.arjanvlek.oxygenupdater&reviewId=gp%3AAOqpTO' to `id`
 * Prefix 'https://play-lh.googleusercontent.com/a' and append '=w48-h48' to `author.image`
 */
export const featuredReviews: PlayStoreReview[] = [{
	id: 'GCq1DLCqGNctdEiv-r_BEpqOrj0C0lLOUPsxhhMmhsb_sLq7DiFKDXaHqIcLLxwPyfPHHdtDp6FJOJrWg',
	rating: 5,
	date: '2020-07-30',
	content: 'Got a new 7 Pro I had TONS of problems updating is. Even returned one phone and got another. Turns out it never would have worked because OnePlus only had the most recent update and I needed an interim one. You\'d think OnePlus as the company selling would be aware of it. This app was recommended on reddit and while I was skeptical at first, the number of downloads, reviews and the vendor feedback won me over. Worked amazing! And now after two updates my phone works great! Happy paid customer!',
	author: {
		name: 'Craig Willford',
		image: '-/AOh14Gjgh8S5-GGh1ScgFTFiH62jHcCrjEzPrwkyYrkNCA',
	},
}, {
	id: 'HiLyGtpm96lkfT5-Z1SsKXKZNj7rJAwGURvQX3mXvoHJVU9s3LPnn6cYzTc2nQ9D4xCvxCALOkAnFxAe8',
	rating: 5,
	date: '2019-12-29',
	content: 'It\'s pretty rare I leave app reviews, but felt compelled to for this one. I am 1+ 6t user in USA and was still stuck on Android 9 WEEKS after 10 started rolling out (a couple months I guess if you count the stop/go/stop/go/stop/go rollout) . Installed this app and BAM! Updated to 10.3 in minutes with no hiccups! Outstanding job, developers!',
	author: {
		name: 'Chris Lake',
		image: '-/AOh14GgzE-Ugp9AaYHRaovIaduKGhMwiYi8p6pai0uM2rw',
	},
}, {
	id: 'HU8lTpSIKtIwid8z8Y_w3z5SQcnLwRfcdWEnI6lv4hRV5ibtnz_OPnYrv3IbsWKQFxOFG8mQkcdD1bZAk',
	rating: 5,
	date: '2019-10-06',
	content: 'Very thankful to this app as it made installing the latest Oxygen OS update to my OnePlus 7Pro a very easy & friendly process shortly after I switched my phone to the International version. This app works perfectly with TalkBack which allows those who are blind to use our phones. Happy to purchased ad free & support developer. Thanks to Android Authority for informing me about this app.',
	author: {
		name: 'steven clark',
		image: '/AATXAJx4gNTtlZD2xCbi09CWwvfH80jmpAm7iX1EdfPO',
	},
}, {
	id: 'HT2XNPfeXPdYpJ1fJ_WyLY8T3MTLeq7PWb8KR3rCCmkyhOYK3haxDCrwRscWCvTHK7tGQBXlNWnxhEurQ',
	rating: 5,
	date: '2021-10-02',
	content: 'This is so much better than trolling XDA-Developers for expired links to ROM files, or waiting for timers to expire to click through ad pages to download official builds from 3rd party hosts. Convenient and accessible. 5/5.',
	author: {
		name: 'Teddy Parks',
		image: '-/AOh14Gh68DiGx8mbv8nagOQN8q5M64dZwgJtNeA1ZAULjQ',
	},
}, {
	id: 'E-BdUn4Y9haZrHODWC4oAoUC32yx4-Gq6gAfTMEUn2QGPQprR3IoAh4n0QnwHgNFWRaPsMbqRHR3kaehA',
	rating: 5,
	date: '2019-11-23',
	content: 'I just recently discovered this app and I have to say it is awesome. I own a 7 pro and I am in the US. I kept waiting for the Android 10 OTA update but it never updated. I searched through forums and did most of the non-intrusive suggestions (wasn\'t going to factory reset my device if it could be avoided) but nothing worked. I was still stuck on Android 9 as of today...until I downloaded this app. The upgrade process was smooth and uneventful just the way I like it. 5 stars for this app.',
	author: {
		name: 'Srini Vaikunth',
		image: '-/AOh14Ghdzo4u8vmY588tui4St_zUjnkziA_SMFY91WQOUN8',
	},
}, {
	id: 'FwEOqUWH3MG8--u_mtP8wc7K17kQI47MkPq8dw91jhxU_CrpayqT6B3SxOKF-Ru2h_bOjIuBueWY-mKuc',
	rating: 4,
	date: '2021-12-07',
	content: 'Very useful app.. OP mobile user must have tools.. I gave 4*.. reason money to skip ads, cause am poor😂😂.. All in all.. it\'s a great app,..Big Thanks to the developer.',
	author: {
		name: 'joela rinahnamte',
		image: '-/AOh14Gj6bMP4tID-QOv2jG46VKhF24myKhSbkdYyNLYC',
	},
}];
