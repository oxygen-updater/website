const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

// Deprecations
delete colors.lightBlue; // changed to 'sky' in v2.2
delete colors.warmGray;  // changed to 'stone' in v3.0
delete colors.trueGray;  // changed to 'neutral' in v3.0
delete colors.coolGray;  // changed to 'gray' in v3.0
delete colors.blueGray;  // changed to 'slate' in v3.0

// Delete unneeded built-in colours
Object.keys(colors).forEach(key => {
	const value = colors[key];
	// Keep `inherit`, `current`, `transparent`, `black`, `white`
	if (typeof value !== 'string') delete colors[key];
});

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
			positive: 'var(--positive)',
			warning: 'var(--warning)',
			error: 'var(--error)',
			black: '#212121',
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
