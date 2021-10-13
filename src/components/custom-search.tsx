import Script from 'next/script';

export default function GoogleCustomSearch() {
	return (
		<>
			<Script
				key=".$gcse-script"
				strategy="beforeInteractive"
				src="https://cse.google.com/cse.js?cx=db27eaeb80d1d9991"
				async
			/>

			<div className="gcse-search" />
		</>
	);
}
