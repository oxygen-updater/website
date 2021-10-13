import { useEffect, useRef } from 'preact/hooks';
import { sanitize } from 'src/utilities/sanitize';

interface Props {
	body?: string
}

export default function FaqBody({ body }: Props) {

	const spanRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		// Using `innerHTML` directly instead of `dangerouslySetInnerHTML`,
		// because it doesn't update if props change (`body` remains in original
		// server-rendered English even if client's language is different)
		spanRef.current!.innerHTML = sanitize(body || 'This FAQ entry is empty');
	}, [body]); // Perf: run only when `body` changes

	return (
		<span
			ref={spanRef}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{
				__html: sanitize(body || 'This FAQ entry is empty'),
			}}
		/>
	);
}
