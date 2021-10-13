export interface FaqCategory extends FaqEntry {
	items: FaqItem[]
}

interface FaqItem extends FaqEntry {
	imp: boolean

	// Also has `*_nl|fr` fields
	body_en?: string
}

interface FaqEntry {
	id: number
	seq: number

	// Also has `*_nl|fr` fields
	title_en?: string
}
