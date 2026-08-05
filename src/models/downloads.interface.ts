export const DOWNLOAD_TYPE_STANDARD = 'standard';
export const DOWNLOAD_TYPE_STANDARD_OLD = 'standard-old';
export const DOWNLOAD_TYPE_FASTBOOT = 'fastboot';
export const DOWNLOAD_TYPE_BOOT_DEBUGGABLE = 'boot-debuggable';

export type DownloadType = typeof DOWNLOAD_TYPE_STANDARD | typeof DOWNLOAD_TYPE_STANDARD_OLD | typeof DOWNLOAD_TYPE_FASTBOOT | typeof DOWNLOAD_TYPE_BOOT_DEBUGGABLE;

export interface DownloadHowTo {
	warning?: string // optional warning, may contain HTML
	li: string[]     // list items; may contain HTML
}

export interface DownloadLinksMap {
	[deviceName: string]: {
		[type in DownloadType]?: {
			path: string  // relative path that forms the download link
			md5: string   // MD5 checksum of the file
			note?: string // optional notice to the user
		}
	}
}
