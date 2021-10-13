export interface Article {
	id: number
	image?: string
	author?: string
	publishDate?: string
	editDate?: string

	// Also has `*_nl` fields
	title_en?: string
	subtitle_en?: string
	text_en?: string

	// Used by the UI as a quick way to render an ad in its place
	ad?: boolean
}
