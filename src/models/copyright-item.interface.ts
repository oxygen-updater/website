export interface HrefAndText {
	href: string
	text: string
}

export interface CopyrightItem extends HrefAndText {
	prefix: string
	suffix?: string
}
