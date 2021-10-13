export interface EnabledDevice {
	ids: number[]        // ids in this group (grouped by `image` without cache-buster `?v=`)
	image: string        // full image URL (with cache-buster)
	name: string         // device name
	qualifiers: string[] // regions/carriers/etc
}
