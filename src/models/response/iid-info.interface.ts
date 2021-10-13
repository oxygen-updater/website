/**
 * @see https://developers.google.com/instance-id/reference/server#example_result
 */
export interface IidInfo {
	application: string
	authorizedEntity: string
	applicationVersion: string
	appSigner: string
	platform: 'ANDROID' | 'IOS' | 'CHROME'
	rel: {
		topics: {
			[topic: string]: {
				addDate: string
			};
		}[];
	}
	scope: string
	subtype: string
}
