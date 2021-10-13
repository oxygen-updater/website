const EN = 'en';
const NL = 'nl';
const FR = 'fr';

const supportedLanguages = new Set<string>([EN, NL, FR]);

/**
 * Returns a language-suffix from the user's {@link getNavigatorLanguage preferred language}
 * that's compatible with what the server returns
 *
 * @see {@link getNavigatorLanguage navigator language}
 */
function getLanguageSuffix() {
	const lang = getNavigatorLanguage().split('-', 2)[0];
	return lang === NL || lang === FR ? lang : EN;
};

/**
 * Cross-browser compatible function that returns the user's preferred language
 *
 * @see https://caniuse.com/mdn-api_navigator_language
 */
function getNavigatorLanguage(): string {
	// For SSR
	if (typeof window === 'undefined') return EN;

	if (navigator.languages && navigator.languages.length) {
		return navigator.languages[0];
	} else {
		return navigator.language
			// IE's non-standard properties
			|| (navigator as any).userLanguage || (navigator as any).browserLanguage
			// Default to `en`
			|| EN;
	}
};

function deleteLanguageFields(obj: any, field: string) {
	delete obj[`${field}_${EN}`];
	delete obj[`${field}_${NL}`];
	delete obj[`${field}_${FR}`];
};

/**
 * For some models, the server often returns language-specified fields.
 * All these fields except the one corresponding to the user's preferred
 * language are unnecessary for the UI.
 *
 * This function strips out such fields, while copying over their contents
 * to a new field without the language-suffix.
 *
 * Example: if the user's preferred language computes to the {@link NL Dutch}
 * suffix, and the server returns:
 * ```typescript
 * {
 *   ...
 *   title_en: 'English title',
 *   title_nl: 'Dutch title',
 *   title_fr: 'French title',
 *   subtitle_en: 'English subtitle',
 *   subtitle_nl: 'Dutch subtitle',
 *   subtitle_fr: 'French subtitle',
 *   text_en: 'English text'
 *   text_nl: 'Dutch text',
 *   text_fr: 'French text',
 *   ...
 * }
 * ```
 * Then all these fields will be stripped, and the object would now contain the
 * following fields:
 * ```typescript
 * {
 *   ...
 *   title: 'Dutch title',
 *   subtitle: 'Dutch subtitle',
 *   text: 'Dutch text'
 *   ...
 * }
 * ```
 *
 * Note that if the appropriate fields for the user's language aren't present,
 * this function defaults to `*_en` fields.
 */
export function stripLanguageSuffixes(obj: any) {
	const fieldsToCheck = new Set<string>();
	Object.keys(obj).forEach(key => {
		// Extract language (index 0) & field (join from index 1 onwards) from the key
		const maybe = key.indexOf('_');
		if (maybe !== -1) {
			const field = key.slice(0, maybe);
			const language = key.slice(maybe + 1);

			// If field is non-empty and language-suffix is supported
			if (field && supportedLanguages.has(language)) {
				// Field is everything except the language-suffix, so join them back
				fieldsToCheck.add(field);
			}
		}
	});

	const language = getLanguageSuffix();
	fieldsToCheck.forEach(field => {
		const languageField = obj[`${field}_${language}`]
			// Default to English if response doesn't contain the field
			// corresponding to user's preferred language
			?? obj[`${field}_${EN}`];
		if (languageField != null) {
			obj[field] = languageField;
			// Not deleting fields because they're needed client-side
			// deleteLanguageFields(obj, field);
		}
	});

	return obj;
};

export function pickLocaleField(obj: any, baseField: string) {
	const language = getLanguageSuffix();
	const value = obj[`${baseField}_${language}`] || obj[`${baseField}_${EN}`];
	return value ?? obj[baseField];
};
