export interface PlayStoreReview {
	/**
	 * Used for constructing public link by prepending
	 * https://play.google.com/store/apps/details?id=com.arjanvlek.oxygenupdater&reviewId=gp%3AAOqpTO
	 */
	id: string
	rating: number
	date: string
	content: string
	author: {
		/**
		 * Prepend https://play-lh.googleusercontent.com/a and append with `=w<width>-h<height>` for custom sizing
		 */
		image: string
		name: string
	}
}
