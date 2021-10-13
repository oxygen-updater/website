import DOMPurify, { Config } from 'isomorphic-dompurify';

type AdditionalConfig = Config & {
	RETURN_DOM_FRAGMENT?: false
	RETURN_DOM?: false
};

export function sanitize(html: string, config: AdditionalConfig = {}) {
	return DOMPurify.sanitize(html, {
		...config,
		ADD_ATTR: [
			'target', // for <a target="_blank">
			...config.ADD_ATTR ?? [],
		],
		USE_PROFILES: { html: true, svg: true },
		IN_PLACE: true,
	});
}
