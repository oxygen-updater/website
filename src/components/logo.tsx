
interface Props {
	size: number
}

export default function Logo({ size }: Props) {
	return (
		<div
			className="app-logo"
			style={{ width: size, height: size }}
		/>
	);
}
