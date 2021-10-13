export interface PrivacyCategory extends PrivacyEntry {
	items: PrivacyItem[]
}

interface PrivacyItem extends PrivacyEntry {
	req: boolean
	pii: boolean
	body: string
}

interface PrivacyEntry {
	id: number
	seq: number
	title: string
}
