import type { IdAndName } from './id-name.interface';

export interface DeviceLatestVersions extends IdAndName {
	updateMethods: UpdateMethodLatestVersion[]
}

export interface UpdateMethodLatestVersion extends IdAndName {
	version: string
	date: string
}
