import type { GetStaticProps } from 'next';
import { useCallback, useEffect, useRef } from 'preact/hooks';
import type { ChangeEvent } from 'react';
import TimeAgo from 'react-timeago';
import DefaultHead from 'src/components/default-head';
import type { DeviceLatestVersions } from 'src/models/response/versions.interface';
import styles from 'src/styles/Versions.module.scss';
import { TITLE } from './_document';

interface Props {
	latestVersions: DeviceLatestVersions
}

export default function LatestVersions({ latestVersions }: Props) {

	const filterableElements = useRef<NodeListOf<Element>>();

	useEffect(() => {
		filterableElements.current = document.querySelectorAll(`.${styles.host} > div`);
		// Cleanup
		return () => filterableElements.current = undefined;
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const filter = useCallback(debounceChangeEvent((value: string) => {
		if (filterableElements.current) {
			value = value?.toLowerCase()?.trim();
			filterableElements.current.forEach(el => {
				if (!value || (el.textContent?.toLowerCase() ?? '').indexOf(value) !== -1) {
					el.classList.remove('!hidden');
				} else {
					el.classList.add('!hidden');
				}
			});
		}
	}), []);

	return (
		<>
			<DefaultHead title={`Versions • ${TITLE}`} />

			<div className="flex flex-wrap gap-4 mb-8">
				<h1 className="mb-0">Latest OS versions in the app</h1>

				<input
					type="text"
					placeholder="Filter rows"
					className="bg-transparent border border-border rounded-full px-3 py-[5px]"
					onChange={filter}
				/>
			</div>

			<section className={styles.host}>

				{Object.keys(latestVersions).map(deviceName => {
					const device = latestVersions[deviceName];

					return (
						<>
							<div>
								<h2>{deviceName}</h2>

								{device.variants.map(variant => <strong key={variant.id}>{variant.name}</strong>)}
							</div>

							{device.methods.map(method => {
								const methodKey = `${method.id}`;

								return (
									<div key={methodKey}>
										<strong>{method.name}</strong>

										{device.variants.map(variant => {
											const variantKey = `${variant.id}`;
											const data = (device.data[methodKey] ?? {})[variantKey] ?? {};

											return (
												<div key={variant.id}>
													<div>{data.version || '<unknown>'}</div>

													{data.code || data.date ?
														<small>
															{data.code}
															{data.code && data.date ? <> • </> : ''}
															<TimeAgo date={data.date} />
														</small>
														: ''}
												</div>
											);
										})}
									</div>
								);
							})}

							{/* Divider */}
							<hr />
						</>
					);
				})}
			</section>
		</>
	);
}

const debounceChangeEvent = (fn: (value: string) => void) => {
	let timeout: NodeJS.Timeout | null;
	return function () {
		const event = arguments[0] as ChangeEvent<HTMLInputElement>;
		const later = () => {
			timeout = null;
			fn(event.target.value);
		};
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, 150);
	};
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const baseUrl = process.env.API_BASE_URL!;
	const latestVersions = await (
		await fetch(baseUrl, {
			method: 'POST',
			body: JSON.stringify({
				type: process.env.API_TYPE_LATEST_VERSIONS,
			}),
		})
	).json() as DeviceLatestVersions;

	return {
		props: {
			latestVersions,
		},
	};
};
