export const GUIDE_TYPE_UPDATE = 'update';
export const GUIDE_TYPE_CONVERT = 'convert';

export type GuideType = typeof GUIDE_TYPE_UPDATE | typeof GUIDE_TYPE_CONVERT;

export interface Guide {
	deviceName: string
	type: GuideType
	osZipPath: string          // prefixed by /downloads/ in HTML
	flashtoolsZipPath: string
}
