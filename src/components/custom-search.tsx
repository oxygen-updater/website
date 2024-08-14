import UniqueBeforeInteractiveScript from './unique.script';

export default function GoogleCustomSearch() {
	return (
		<>
			<UniqueBeforeInteractiveScript
				key=".$gcse-script"
				strategy="beforeInteractive"
				src="https://cse.google.com/cse.js?cx=db27eaeb80d1d9991"
				async
			/>

			<div className="gcse-search" />
		</>
	);
}
