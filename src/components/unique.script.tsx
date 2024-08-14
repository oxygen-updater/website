import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context';
import type { ScriptProps } from 'next/script';
import Script from 'next/script';
import { useContext } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';

/**
 * Modified from https://github.com/vercel/next.js/issues/53651#issuecomment-1791515523.
 *
 * @returns de-duped {@link Script}
 */
export default function UniqueBeforeInteractiveScript(props: { key: string, strategy: 'beforeInteractive' } & ScriptProps) {
	// Context is available only during SSR
	const context = useContext(HeadManagerContext);
	if (context.updateScripts) {
		const scripts = context.scripts as Record<string, ScriptProps[]> || {};
		const existing = scripts[props.strategy] || [];
		if (existing.find((state: JSXInternal.IntrinsicAttributes & ScriptProps) => state.key === props.key)) {
			// Page already has this script; skip
			return null;
		}
	}

	// Passthrough to `next/script`
	return <Script {...props} />;
}
