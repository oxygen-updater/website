import type { FunctionComponent } from 'preact';
import { createContext } from 'preact';
import { useCallback, useContext, useEffect, useMemo, useState } from 'preact/hooks';
import type { Theme } from 'src/models/theme.type';
import { KEY_THEME, KEY_THEME_DARK, KEY_THEME_LIGHT } from 'src/models/theme.type';

const PREFERS_COLOR_SCHEME = '(prefers-color-scheme: dark)';

export interface UseThemeProps {
	theme: Theme | undefined
	setTheme: (theme: Theme, store?: boolean) => void
}

const ThemeContext = createContext<UseThemeProps>({
	theme: KEY_THEME_DARK,
	setTheme: (theme, store = true) => { },
});
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: FunctionComponent = ({ children }) => {

	const [theme, setThemeState] = useState(() => getTheme());

	const setTheme = useCallback((newTheme: Theme, store: boolean = true) => {
		updateTheme(newTheme, store);
		setThemeState(newTheme);
	}, []); // Perf: run only once (on mount & unmount)

	useEffect(() => {
		const pcsMql = window.matchMedia(PREFERS_COLOR_SCHEME);
		if (theme) {
			setTheme(theme);
		} else {
			setTheme(getSystemTheme(pcsMql), false);
		}

		//#region `prefers-color-scheme` changes
		const pcsListener = (event: MediaQueryListEvent) => {
			if (!theme) {
				setTheme(event.matches ? KEY_THEME_DARK : KEY_THEME_LIGHT, false);
			}
		};

		// Safari <14 doesn't support the non-deprecated counterparts:
		// https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#browser_compatibility
		pcsMql.addListener(pcsListener);
		//#endregion

		//#region `localStorage` events
		const handleStorage = (event: StorageEvent) => {
			if (event.newValue == null && (event.key == null || event.key === KEY_THEME)) {
				// Fallback to system theme if `localStorage` was cleared (can
				// happen via the "Application" tab in devtools)
				setTheme(getSystemTheme(), false);
			} else if (event.key === KEY_THEME) {
				// Sync if theme was changed from another tab. Don't re-store
				// since `localStorage` is shared across the same origin
				setTheme(event.newValue as Theme, false);
			}
		};

		window.addEventListener('storage', handleStorage);
		//#endregion

		// Cleanup
		return () => {
			pcsMql.removeListener(pcsListener);
			window.removeEventListener('storage', handleStorage);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const themeValue = useMemo(() => (
		{ theme, setTheme }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	), [theme]); // Perf: run only when `theme` changes

	return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
};

const getTheme = () => {
	if (typeof window === 'undefined') return undefined;
	let theme;
	try {
		theme = localStorage.getItem(KEY_THEME) as Theme;
	} catch {
		// unsupported
	}
	return theme;
};

const getSystemTheme = (mql?: MediaQueryList) => (
	mql ?? window.matchMedia(PREFERS_COLOR_SCHEME)
).matches ? KEY_THEME_DARK : KEY_THEME_LIGHT;

const updateTheme = (theme: Theme, store: boolean) => {
	if (store) {
		try {
			localStorage.setItem(KEY_THEME, theme);
		} catch {
			// unsupported
		}
	}

	document.body.className = theme || getSystemTheme();
};
