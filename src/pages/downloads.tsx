import { useCallback, useEffect, useRef } from 'preact/hooks';
import type { ChangeEvent } from 'react';
import Accordion from 'src/components/accordion';
import GoogleAdsense from 'src/components/adsense';
import DefaultHead from 'src/components/default-head';
import WileyfoxFacebookPostDialog, { WILEFOX_DIALOG_ID } from 'src/components/wileyfox-facebook-post.dialog';
import { downloadHowToMap, downloadLinksMap, downloadNotesMap } from 'src/data/downloads.map';
import {
	DOWNLOAD_TYPE_BOOT_DEBUGGABLE,
	DOWNLOAD_TYPE_FASTBOOT,
	DOWNLOAD_TYPE_STANDARD,
	DOWNLOAD_TYPE_STANDARD_OLD,
	DownloadType,
} from 'src/models/downloads.interface';
import { TITLE } from 'src/pages/_document';
import styles from 'src/styles/Versions.module.scss';
import { sanitize } from 'src/utilities/sanitize';

export default function Downloads() {

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
			<DefaultHead title={`Downloads • ${TITLE}`} />

			<div className="flex flex-wrap gap-4 mb-8">
				<h1 className="mb-0">Firmware download links</h1>

				<input
					type="text"
					placeholder="Filter rows"
					className="bg-transparent border border-border rounded-full px-3 py-[5px]"
					onChange={filter}
				/>
			</div>

			<p>This page allows you to download the latest version of CyanogenOS for your device or to restore your device back to working conditions. There are three main types of files on this page. Installation instructions for each are below.</p>

			<GoogleAdsense type="display" />

			<p class="mb-0">Note: the links on this page may be updated from time to time. When sharing them with others, please do not link directly to the files; rather, link to this page instead. This would ensure that others view & act on the latest information.</p>

			{([DOWNLOAD_TYPE_STANDARD, DOWNLOAD_TYPE_FASTBOOT, DOWNLOAD_TYPE_BOOT_DEBUGGABLE] as DownloadType[]).map(type => {
				const item = downloadHowToMap[type];
				return (
					<>
						{/* Space between accordions: works better than CSS margins */}
						<br />

						<Accordion
							key={type}
							summary={getTypeExplanation(type)}
							contentClassName="border-l bg-bg-variant pl-8 pr-4 pt-2 leading-6"
							summaryClassName="border bg-bg-variant hover:!bg-hover"
						>
							{item.warning ?
								<span
									className="px-4 py-2 border border-error text-error rounded"
									// eslint-disable-next-line react/no-danger
									dangerouslySetInnerHTML={{
										__html: sanitize(item.warning),
									}}
								/> : ''}

							<ol>
								{item.li.map((item, index) =>
									<li
										key={item.substring(0, 50)}
										className="mt-1"
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{
											__html: sanitize(item),
										}}
									/>
								)}
							</ol>

							{type === 'standard' ?
								<div className="w-full flex flex-wrap items-center mb-4">
									<span>
										Note: Wileyfox version compatibility information is taken from this
										{' '}
										<a
											href="https://www.facebook.com/officialwileyfox/photos/a.1484448178533169.1073741828.1481273535517300/1794536560857661/?type=3"
											target="_blank"
											rel="noopener noreferrer"
											class="external"
										>
											official Wileyfox Facebook post
										</a>
									</span>

									<button
										className="!p-1 !border-none"
										// @ts-expect-error TS2322 valid: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#command
										command="show-modal"
										commandFor={WILEFOX_DIALOG_ID}
									>
										(copied here)
									</button>
									.
								</div>
								: ''}
						</Accordion>
					</>
				);
			})}

			<hr className="mt-4" />

			<section className={styles.host}>

				{Object.keys(downloadLinksMap).map(deviceName => {
					const device = downloadLinksMap[deviceName];
					const types = Object.keys(device) as DownloadType[];

					return (
						<div key={deviceName}>
							<div>
								<h2>{deviceName}</h2>

								<strong>Download/MD5</strong>

								{/* Show notes header only if necessary */}
								<strong>{types.some(type => device[type]?.note) ? 'Notes' : ''}</strong>
							</div>

							{types.map(type => {
								const { path, md5, note } = device[type] ?? { path: '', md5: '' };

								return (
									<div key={type}>
										<strong
											key={type}
											title={getTypeTooltip(type)}
											className="cursor-help"
										>
											{type}
										</strong>

										<div>
											<div>
												<a href={path}>
													{path?.substring(path.lastIndexOf('/') + 1) ?? '<unknown>'}
												</a>
											</div>
											<small>{'MD5: ' + (md5 || '<unknown>')}</small>
										</div>

										{note && downloadNotesMap[note] ?
											// eslint-disable-next-line react/no-danger
											<span dangerouslySetInnerHTML={{
												__html: sanitize(downloadNotesMap[note]),
											}}
											/> : <span />}
									</div>
								);
							})}
						</div>
					);
				})}
			</section>

			<WileyfoxFacebookPostDialog />

			<GoogleAdsense type="display" />
		</>
	);
}

const getTypeExplanation = (type: DownloadType) =>
	type === DOWNLOAD_TYPE_STANDARD || type === DOWNLOAD_TYPE_STANDARD_OLD
		? 'Standard ZIPs: Regular update packages to be installed via system recovery.'
		: type === DOWNLOAD_TYPE_FASTBOOT
			? `Fastboot ZIPs: For flashing via a PC. Useful if experiencing issues and 'standard' doesn't work.`
			: type === DOWNLOAD_TYPE_BOOT_DEBUGGABLE
				? 'Boot-debuggable IMGs: For nerds only. Kernels that enable root access to Android developer tools.'
				: '<unknown>';

const getTypeTooltip = (type: DownloadType) =>
	type === DOWNLOAD_TYPE_STANDARD || type === DOWNLOAD_TYPE_STANDARD_OLD
		? 'Regular update packages to be installed via system recovery.'
		: type === DOWNLOAD_TYPE_FASTBOOT
			? `For flashing via a PC. Useful if experiencing issues and 'standard' doesn't work.`
			: type === DOWNLOAD_TYPE_BOOT_DEBUGGABLE
				? 'For nerds only. Kernels that enable root access to Android developer tools.'
				: '';

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
