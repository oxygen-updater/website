import type { ComponentChildren } from 'preact';
import { useCallback, useRef } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';

interface Props {
	summary: string
	summaryClassName?: string
	contentClassName?: string
	openByDefault?: boolean
	children: ComponentChildren
}

export default function Accordion({
	summary,
	summaryClassName,
	contentClassName,
	openByDefault,
	children,
}: Props) {

	const detailsRef = useRef<HTMLDetailsElement>(null);
	const summaryRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	let animationRef = useRef<Animation | null>(null);
	let isClosingRef = useRef(false);
	let isExpandingRef = useRef(false);

	const summaryClicked = useCallback((e: JSXInternal.TargetedMouseEvent<HTMLElement>) => {
		e.preventDefault();
		// Add an overflow on the <details> to avoid content overflowing
		detailsRef.current!.style.overflow = 'hidden';
		// Check if the element is being closed or is already closed
		if (isClosingRef.current || !detailsRef.current?.open) {
			open();
			// Check if the element is being openned or is already open
		} else if (isExpandingRef.current || detailsRef.current?.open) {
			shrink();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const shrink = useCallback(() => {
		// Set the element as "being closed"
		isClosingRef.current = true;

		// Store the current height of the element
		const startHeight = `${detailsRef.current!.offsetHeight}px`;
		// Calculate the height of the summary
		const endHeight = `${summaryRef.current!.offsetHeight}px`;

		// If there is already an animation running, cancel the current one
		animationRef.current?.cancel();

		// Start a WAAPI animation
		animationRef.current = detailsRef.current!.animate({
			// Set the keyframes from the startHeight to endHeight
			height: [startHeight, endHeight],
		}, {
			duration: 200,
			easing: 'cubic-bezier(.4, 0, .2, 1)',
		});

		// When the animation is complete, call onAnimationFinish()
		animationRef.current.onfinish = () => onAnimationFinish(false);
		// If the animation is cancelled, isClosing variable is set to false
		animationRef.current.oncancel = () => isClosingRef.current = false;
	}, []);

	const open = useCallback(() => {
		// Apply a fixed height on the element
		detailsRef.current!.style.height = `${detailsRef.current!.offsetHeight}px`;
		// Force the [open] attribute on the details element
		detailsRef.current!.open = true;
		// Wait for the next frame to call the expand function
		requestAnimationFrame(expand);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const expand = useCallback(() => {
		// Set the element as "being expanding"
		isExpandingRef.current = true;
		// Get the current fixed height of the element
		const startHeight = `${detailsRef.current!.offsetHeight}px`;
		// Calculate the open height of the element (summary height + content height)
		const endHeight = `${summaryRef.current!.offsetHeight + contentRef.current!.offsetHeight}px`;

		// If there is already an animation running, cancel the current one
		animationRef.current?.cancel();

		// Start a WAAPI animation
		animationRef.current = detailsRef.current!.animate({
			// Set the keyframes from the startHeight to endHeight
			height: [startHeight, endHeight],
		}, {
			duration: 200,
			easing: 'cubic-bezier(.4, 0, .2, 1)',
		});

		// When the animation is complete, call onAnimationFinish()
		animationRef.current.onfinish = () => onAnimationFinish(true);
		// If the animation is cancelled, isExpanding variable is set to false
		animationRef.current.oncancel = () => isExpandingRef.current = false;
	}, []);

	const onAnimationFinish = (open: boolean) => {
		// Clear the stored animation
		animationRef.current = null;
		// Reset isClosing & isExpanding
		isClosingRef.current = false;
		isExpandingRef.current = false;

		// Set the open attribute based on the parameter
		detailsRef.current!.open = open;
		// Remove the overflow hidden and the fixed height
		detailsRef.current!.style.height = detailsRef.current!.style.overflow = '';
	};

	return (
		<details
			ref={detailsRef}
			open={openByDefault}
		>
			<summary
				ref={summaryRef}
				className={summaryClassName}
				onClick={summaryClicked}
			>
				<h3>{summary}</h3>
			</summary>

			<div
				ref={contentRef}
				className={contentClassName}
			>
				{children}
			</div>
		</details>
	);
}
