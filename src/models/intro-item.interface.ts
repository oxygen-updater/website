export interface IntroItem {
	image: string          // filename without extension
	crop: 'top' | 'bottom' // value for `object-position`
	h2: string             // item header; text-only
	p: string[]            // paragraphs; may contain HTML
	li?: string[]          // optional list items; text-only
	note?: string          // optional note; text-only
}
