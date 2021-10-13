// @ts-check

// Note: when using Preact, it's necessary to prepend all `key`s with `.$`:
// see https://github.com/vercel/next.js/issues/32944#issuecomment-1008280432.
import withPreact from 'next-plugin-preact';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	trailingSlash: true,
	sassOptions: {
		includePaths: ['./src/styles'],
	},
	typescript: {
		// Because we use Preact (NextJS uses React & its typedefs)
		ignoreBuildErrors: true,
	},
	compiler: {
		// Remove `^data-test` properties (used by Selenium etc as a selector)
		reactRemoveProperties: true,
		// Remove `console.*` statements except `console.error`
		removeConsole: {
			exclude: ['error'],
		},
	},
	experimental: {
		// Ensure `preact/compat` imports are the same version
		// https://github.com/preactjs/next-plugin-preact/issues/53
		esmExternals: false,
	},
};

export default withPreact(nextConfig);
