const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

// Deprecations
delete colors.lightBlue; // changed to 'sky' in v2.2
delete colors.warmGray;  // changed to 'stone' in v3.0
delete colors.trueGray;  // changed to 'neutral' in v3.0
delete colors.coolGray;  // changed to 'gray' in v3.0
delete colors.blueGray;  // changed to 'slate' in v3.0

// Reorder Roboto
defaultTheme.fontFamily.sans = [
	'Roboto',
	...defaultTheme.fontFamily.sans.filter(f => f !== 'Roboto'),
];

/** @type {import('tailwindcss').Config} */
const config = {
	// https://tailwindcss.com/docs/dark-mode:
	// - 'media' for browser/system-based dark mode (prefers-color-scheme)
	// - 'class' for class-based dark mode toggling (dark mode is enabled if the 'dark' class is present earlier in the HTML tree)
	darkMode: 'class',
	// https://tailwindcss.com/docs/optimizing-for-production
	content: [
		'./src/{pages,components}/**/*.{js,ts,jsx,tsx}',
	],
	// Customization/overrides
	theme: {
		container: {
			center: true,
		},
		// Prepend custom fonts to defaults
		fontFamily: {
			sans: defaultTheme.fontFamily.sans,
			serif: defaultTheme.fontFamily.serif,
			mono: [
				'Fira Code',
				...defaultTheme.fontFamily.mono,
			],
			display: [
				'Google Sans Display',
				...defaultTheme.fontFamily.sans,
			],
		},
		screens: {
			'2xs': '360px',
			xs: '480px',
			...defaultTheme.screens,
		},
		// Override with Material Colors where possible
		colors: {
			...colors,
			bg: 'var(--bg)',
			fg: 'var(--fg)',
			'bg-variant': 'var(--bg-variant)',
			'fg-variant': 'var(--fg-variant)',
			primary: 'var(--primary)',
			hover: 'var(--hover)',
			border: 'var(--border)',
			overlay: 'var(--overlay)',
			black: '#212121',
			pink: {
				50: '#fce4ec',
				100: '#f8bbd0',
				200: '#f48fb1',
				300: '#f06292',
				400: '#ec407a',
				500: '#e91e63',
				600: '#d81b60',
				700: '#c2185b',
				800: '#ad1457',
				900: '#880e4f',
			},
			purple: {
				50: '#f3e5f5',
				100: '#e1bee7',
				200: '#ce93d8',
				300: '#ba68c8',
				400: '#ab47bc',
				500: '#9c27b0',
				600: '#8e24aa',
				700: '#7b1fa2',
				800: '#6a1b9a',
				900: '#4a148c',
			},
			indigo: {
				50: '#e8eaf6',
				100: '#c5cae9',
				200: '#9fa8da',
				300: '#7986cb',
				400: '#5c6bc0',
				500: '#3f51b5',
				600: '#3949ab',
				700: '#303f9f',
				800: '#283593',
				900: '#1a237e',
			},
			blue: {
				50: '#e3f2fd',
				100: '#bbdefb',
				200: '#90caf9',
				300: '#64b5f6',
				400: '#42a5f5',
				500: '#2196f3',
				600: '#1e88e5',
				700: '#1976d2',
				800: '#1565c0',
				900: '#0d47a1',
			},
			sky: {
				50: '#e1f5fe',
				100: '#b3e5fc',
				200: '#81d4fa',
				300: '#4fc3f7',
				400: '#29b6f6',
				500: '#03a9f4',
				600: '#039be5',
				700: '#0288d1',
				800: '#0277bd',
				900: '#01579b',
			},
			cyan: {
				50: '#e0f7fa',
				100: '#b2ebf2',
				200: '#80deea',
				300: '#4dd0e1',
				400: '#26c6da',
				500: '#00bcd4',
				600: '#00acc1',
				700: '#0097a7',
				800: '#00838f',
				900: '#006064',
			},
			teal: {
				50: '#e0f2f1',
				100: '#b2dfdb',
				200: '#80cbc4',
				300: '#4db6ac',
				400: '#26a69a',
				500: '#009688',
				600: '#00897b',
				700: '#00796b',
				800: '#00695c',
				900: '#004d40',
			},
			green: {
				50: '#e8f5e9',
				100: '#c8e6c9',
				200: '#a5d6a7',
				300: '#81c784',
				400: '#66bb6a',
				500: '#4caf50',
				600: '#43a047',
				700: '#388e3c',
				800: '#2e7d32',
				900: '#1b5e20',
			},
			lime: {
				50: '#f9fbe7',
				100: '#f0f4c3',
				200: '#e6ee9c',
				300: '#dce775',
				400: '#d4e157',
				500: '#cddc39',
				600: '#c0ca33',
				700: '#afb42b',
				800: '#9e9d24',
				900: '#827717',
			},
			yellow: {
				50: '#fffde7',
				100: '#fff9c4',
				200: '#fff59d',
				300: '#fff176',
				400: '#ffee58',
				500: '#ffeb3b',
				600: '#fdd835',
				700: '#fbc02d',
				800: '#f9a825',
				900: '#f57f17',
			},
			amber: {
				50: '#fff8e1',
				100: '#ffecb3',
				200: '#ffe082',
				300: '#ffd54f',
				400: '#ffca28',
				500: '#ffc107',
				600: '#ffb300',
				700: '#ffa000',
				800: '#ff8f00',
				900: '#ff6f00',
			},
			orange: {
				50: '#fff3e0',
				100: '#ffe0b2',
				200: '#ffcc80',
				300: '#ffb74d',
				400: '#ffa726',
				500: '#ff9800',
				600: '#fb8c00',
				700: '#f57c00',
				800: '#ef6c00',
				900: '#e65100',
			},
			red: {
				50: '#ffebee',
				100: '#ffcdd2',
				200: '#ef9a9a',
				300: '#e57373',
				400: '#ef5350',
				500: '#f44336',
				600: '#e53935',
				700: '#d32f2f',
				800: '#c62828',
				900: '#b71c1c',
			},
			// https://tailwindcss.com/docs/upgrade-guide#renamed-gray-scales
			zinc: {
				50: '#fafafa',
				100: '#f5f5f5',
				200: '#eeeeee',
				300: '#e0e0e0',
				400: '#bdbdbd',
				500: '#9e9e9e',
				600: '#757575',
				700: '#616161',
				800: '#424242',
				900: '#212121',
			},
			stone: {
				50: '#eceff1',
				100: '#cfd8dc',
				200: '#b0bec5',
				300: '#90a4ae',
				400: '#78909c',
				500: '#607d8b',
				600: '#546e7a',
				700: '#455a64',
				800: '#37474f',
				900: '#263238',
			},
		},
		borderColor: ({ theme }) => ({
			...theme('colors'),
			DEFAULT: theme('colors.hover', 'currentColor'),
		}),
		extend: {
			backgroundImage: {
				page: 'var(--bg-image)',
			},
		},
	},
	corePlugins: {
		filter: false,
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		// Override preflight defaults: https://tailwindcss.com/docs/preflight
		plugin(({ addBase, theme }) => addBase({
			'html, body': {
				height: '100%',
			},
			'blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre, ol, ul, table': {
				marginBottom: '1rem',
			},
			'ol, ul': {
				listStylePosition: 'outside',
				'&:not(.list-none)': {
					paddingInlineStart: theme('fontSize')['2xl'][0],
				},
			},
			ol: {
				listStyleType: 'decimal',
			},
			ul: {
				listStyleType: 'disc',
				'& ul': {
					listStyleType: 'circle',
				},
			},
			'h1, h2, h3, h4, h5, h6': {
				fontFamily: theme('fontFamily').display.join(', '),
			},
			h1: {
				fontWeight: 700,
			},
			h2: {
				fontWeight: 500,
			},
			h3: {
				fontWeight: 400,
			},
			'a:not(.btn)': {
				borderBottom: 'dotted 1px',
				textDecoration: 'none',
				transition: `color ${theme('transitionDuration')['150']} ${theme('transitionTimingFunction')['in-out']}`,
				'&:hover': {
					color: theme('colors').primary,
					borderBottom: 'none',
					textDecoration: 'none',
				},
			},
			button: {
				display: 'flex',
				alignItems: 'center',
				fontFamily: theme('fontFamily').display.join(', '),
				borderRadius: '1.5rem',
				transition: `background-color ${theme('transitionDuration')['150']} ${theme('transitionTimingFunction')['in-out']}`,
				'&:disabled': {
					opacity: .5,
				},
				'&:hover:enabled': {
					backgroundColor: theme('colors').hover,
				},
				'&:not(:enabled)': {
					cursor: 'default',
				},
				'&:not(.icon)': {
					padding: '.5rem 1.25rem',
					border: `1px solid ${theme('colors').border}`,
					'> svg': {
						'& + span, &:last-child:not(:first-child)': {
							marginLeft: '.75rem',
							textAlign: 'left',
						},
					},
				},
				'&.icon': {
					width: '2.5rem',
					height: '2.5rem',
					fontSize: theme('fontSize').xl[0],
					justifyContent: 'center',
				},
				'&:enabled:not(.gsc-search-button):hover': {
					backgroundColor: theme('colors').hover,
				},
			},
			blockquote: {
				borderLeftColor: theme('colors').border,
				borderLeftWidth: '3px',
				paddingLeft: '1rem',
			},
			hr: {
				borderColor: theme('colors').hover,
			},
			table: {
				border: `1px solid ${theme('colors').border}`,
				borderRadius: '4px',
				borderCollapse: 'separate !important',
				borderSpacing: 0,
			},
			'thead, tfoot': {
				height: '56px',
			},
			'th, td': {
				height: '48px',
				padding: '1rem',
				'&:first-of-type': {
					paddingRight: 0,
				},
			},
			tr: {
				transition: `background-color ${theme('transitionDuration')['150']} ${theme('transitionTimingFunction')['in-out']}`,
				'tbody > &:hover': {
					backgroundColor: theme('colors').hover,
				},
				'thead > & > th': {
					borderBottom: `1px solid ${theme('colors').border}`,
				},
				'tfoot > & > td': {
					borderTop: `1px solid ${theme('colors').border}`,
				},
			},
			summary: {
				padding: '.5rem .5rem .5rem 2.125rem',
				position: 'relative',
				display: 'block',
				cursor: 'pointer',
				borderColor: theme('colors').hover,
				transitionProperty: theme('transitionProperty').colors,
				transitionDuration: theme('transitionDuration')['150'],
				transitionTimingFunction: theme('transitionTimingFunction')['in-out'],
				'&:hover': {
					backgroundColor: theme('colors').hover,
				},
				'&::-webkit-details-marker': {
					display: 'none',
				},
				'&:before': {
					position: 'absolute',
					top: '1.125rem',
					left: '1rem',
					content: '\'\'',
					borderWidth: '.25rem',
					borderStyle: 'solid',
					borderColor: 'transparent transparent transparent currentColor',
					transformOrigin: '.125rem 50%',
					transform: 'rotate(0)',
					transition: `transform ${theme('transitionDuration')['150']} ${theme('transitionTimingFunction')['in-out']}`,
					'details[open] > &': {
						transform: 'rotate(90deg)',
					},
				},
				'> h3': {
					display: 'inline',
				},
				'+ div': {
					display: 'flex',
					flexWrap: 'wrap',
					borderColor: theme('colors').hover,
				},
			},
		})),
		// Add component classes
		plugin(({ addComponents, theme }) => addComponents({
			'@media(max-width: 639px)': {
				// Make xs-container full-width
				'.container': {
					maxWidth: '100%',
				},
			},
			'.typography': {
				fontWeight: 400,
				fontSize: '14px',
				lineHeight: '20px',
				letterSpacing: 'normal',
				'h1:not([class*="text-"])': {
					fontSize: '24px',
					lineHeight: '32px',
				},
				'h2:not([class*="text-"])': {
					fontSize: '20px',
					lineHeight: '32px',
				},
				'h3:not([class*="text-"])': {
					fontSize: '16px',
					lineHeight: '28px',
				},
				'h4:not([class*="text-"])': {
					fontSize: '15px',
					lineHeight: '24px',
				},
			},
			'.btn': {
				display: 'flex',
				alignItems: 'center',
				fontFamily: theme('fontFamily').display.join(', '),
				padding: '.5rem 1.25rem',
				border: `1px solid transparent`,
				borderRadius: '1.5rem',
				transition: `background-color ${theme('transitionDuration')['150']} ${theme('transitionTimingFunction')['in-out']}`,
				'&:hover': {
					backgroundColor: theme('colors').hover,
				},
				'&.active': {
					border: `1px solid ${theme('colors').border}`,
					backgroundColor: theme('colors').hover,
				},
				'> svg': {
					'& + span, &:last-child:not(:first-child)': {
						marginLeft: '.75rem',
						textAlign: 'left',
					},
				},
			},
			'.overlay': {
				backgroundColor: theme('colors').overlay,
			},
			'.app-logo': {
				display: 'block',
				backgroundImage: 'url(/img/adaptive-foreground.svg?v=1)',
				backgroundRepeat: 'no-repeat',
				backgroundColor: theme('colors').primary,
				borderRadius: '50%',
				transition: `background-color ${theme('transitionDuration')['150']} ${theme('transitionTimingFunction')['in-out']}`,
			},
			'ins.adsbygoogle': {
				// https://support.google.com/adsense/answer/10762946
				'&[data-ad-status="unfilled"]': {
					display: 'none !important',
				},
				// Set ads apart from content
				'&.infeed[data-ad-status="filled"]': {
					border: `1px solid ${theme('colors').border}`,
					boxSizing: 'content-box', // so that borders are visible
				},
			},
		})),
	],
};

module.exports = config;
