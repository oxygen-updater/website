import type { IdAndName } from './id-name.interface';

export interface DeviceLatestVersions {
	[deviceName: string]: {
		methods: IdAndName[]
		variants: IdAndName[] // { id: DeviceId, name: RegionCode }
		data: {
			[methodId: string]: {
				[deviceId: string]: { // per-region
					version: string
					code: string
					date: string
				}
			}
		}
	}
}
