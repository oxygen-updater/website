import Accordion from 'src/components/accordion';
import GoogleAdsense from 'src/components/adsense';
import DefaultHead from 'src/components/default-head';
import { guidesList } from 'src/data/guides.list';
import { GUIDE_TYPE_CONVERT, GUIDE_TYPE_UPDATE } from 'src/models/guides.interface';
import { TITLE } from 'src/pages/_document';

export default function Guides() {
	return (
		<>
			<DefaultHead title={`Guides • ${TITLE}`} />

			<h1 className="pt-4 mb-0">Guides</h1>

			<GoogleAdsense type="display" />

			<div className="px-4 py-2 mt-4 border border-error text-error rounded text-justify">
				Before following any steps in the guides below, please make a full backup of all files on your device. This procedure
				{' '}
				<strong>WILL ERASE ALL FILES</strong>
				{' '}
				on your device. You have been warned! Regardless of whether you manually update to a newer CyanogenOS version, or convert to CyanogenOS from stock Android, you should NOT go back to the previous system version, as this might cause your device to fail to boot.
			</div>

			{guidesList.map(({ deviceName, type, osZipPath, flashtoolsZipPath }) =>
				<>
					{/* Space between accordions: works better than CSS margins */}
					<br />

					<Accordion
						key={deviceName + type}
						summary={deviceName + ': ' + (type === GUIDE_TYPE_UPDATE ? 'manual update' : type === GUIDE_TYPE_CONVERT ? 'convert to CyanogenOS' : '')}
						contentClassName="border-l bg-bg-variant pl-8 pr-4 pt-2 leading-6"
						summaryClassName="border bg-bg-variant hover:!bg-hover"
					>
						{type === GUIDE_TYPE_UPDATE ?
							<span>
								This guide allows you to manually update your
								{' '}
								<strong>{deviceName}</strong>
								{' '}
								to the latest CyanogenOS version. It’s meant for users who have problems installing updates on the device itself, and fixes the following errors:
								<ul>
									<li>Error: “Failed to verify whole-file signature”</li>
									<li>Error 7: “System partition has unexpected contents”</li>
									<li>Boot-up issues after installing an update</li>
								</ul>
							</span>
							: type === GUIDE_TYPE_CONVERT ?
								<span>
									This guide allows you to convert your
									{' '}
									<strong>{deviceName}</strong>
									, running stock android, to the latest version of CyanogenOS. Credits go to all contributors of this
									{' '}
									<a
										href="https://forums.yuplaygod.com/threads/unofficial-android-to-cyanogen-yureka.26106/"
										target="_blank"
										rel="noopener noreferrer"
										class="external"
									>
										forum post
									</a>
									.
								</span>
								: ''}

						<h2 className="mt-2 w-full">Required tools</h2>
						<ul>
							<li>Computer with Windows 7 or newer</li>
							<li>
								Your
								{' '}
								{deviceName}
								{' '}
								charged to at least 50% (higher is better)
							</li>
							<li>USB cable to connect your phone to the computer</li>
						</ul>

						<h2 className="mt-2 w-full">Download & extract all required software</h2>
						<p>
							First, you’ll need to download some software to get started. You’ll need the operating system image and a flashing tools package, which allows you to install the operating system image on your device
						</p>
						<ul>
							<li>
								Latest CyanogenOS for
								{' '}
								{deviceName}
								:
								{' '}
								<a href={'/downloads/' + osZipPath}>{osZipPath.substring(osZipPath.lastIndexOf('/') + 1)}</a>
							</li>
							<li>
								Flashing tools:
								{' '}
								<a href={'/downloads/' + flashtoolsZipPath}>{flashtoolsZipPath.substring(flashtoolsZipPath.lastIndexOf('/') + 1)}</a>
							</li>
							<li>
								Create a new folder and extract the contents of both ZIPs into the same folder, so that you end up with all the system files (e.g.
								{' '}
								<code>system.img</code>
								,
								{' '}
								<code>boot.img</code>
								, etc.), and the flashing tools (
								<code>adb.exe</code>
								,
								{' '}
								<code>flash-all-64gb.bat</code>
								, etc.) within the same folder you created.
							</li>
						</ul>

						<h2 className="mt-2 w-full">Enter Fastboot Mode</h2>
						<p>Fastboot mode is useful as an alternate method of installing the operating system—via a computer—if the standard phone recovery environment proves insufficient. Thus, fastboot mode can help in recovering from serious issues. It is also used to either install/remove custom software (TWRP, etc.). Despite the name, fastboot mode has nothing to do with booting your device faster, or speeding it up in any other way.</p>
						<ul>
							<li>Turn off your phone completely</li>
							{type === GUIDE_TYPE_UPDATE ?
								<li>
									Press the
									{' '}
									<strong>Power</strong>
									{' '}
									&
									{' '}
									<strong>Volume UP</strong>
									{' '}
									{deviceName === 'ZUK Z1' ?
										<>
											&
											{' '}
											<strong>Volume DOWN</strong>
										</> : ''}
									{' '}
									buttons at the same time, until you see
									{' '}
									<strong>Fastboot Mode</strong>
									{' '}
									displayed on your phone screen
								</li> :
								<li>
									Press and hold the
									{' '}
									<strong>Volume UP</strong>
									{' '}
									button, until you see
									{' '}
									<strong>Fastboot Mode</strong>
									{' '}
									displayed on your phone screen
								</li>}
							<li>You can now plug in your phone to the computer via a USB cable for further steps</li>
						</ul>

						<h2 className="mt-2 w-full">Install CyanogenOS</h2>
						<p>Now that you’re in Fastboot mode, it’s time to install the operating system image. This will be done from your computer using the flashing tools package you downloaded in step 1.</p>
						<ul>
							<li>On your computer, open the folder that contains the files extracted from the operating system & flashting tools ZIPs</li>
							<li>
								Right click on
								{' '}
								<strong><code>flash-all-xxGB.bat</code></strong>
								{' '}
								and select
								{' '}
								<strong>Run as Administrator</strong>
								. Choose the version matching your phone’s storage capacity, e.g. 16GB, 32GB, or 64GB.
								{' '}
								<span class="text-error">MAKE SURE you click on the file for the right size:</span>
								{' '}
								not doing so may result in a smaller capacity, or it may even brick your device!
							</li>
							<li>
								Your bootloader will be unlocked as first part of the flashing procedure. Afterwards, your device will restart on its own. Leave the command prompt window open and enter
								{' '}
								<strong>Fastboot Mode again</strong>
								{' '}
								(see the earlier steps on how to do so).
							</li>
							<li>
								Once back in
								{' '}
								<strong>Fastboot Mode</strong>
								, the actual installation process will continue, assuming you had left the command prompt window open in the previous step. Once finished, the command prompt window will close by itself, and your device should automatically restart.
							</li>
							<li class="text-error">Please wait until the installation process is complete. DO NOT disconnect your device during the installation procedure!</li>
							<li>
								Disconnect the USB cable. If your device has not restarted automatically, you can restart it by long pressing the
								{' '}
								<strong>Power</strong>
								{' '}
								button.
							</li>
						</ul>

						<h2 className="mt-2 w-full">Done</h2>
						<p>
							Your
							{' '}
							<strong>{deviceName}</strong>
							{' '}
							should now be fully restored to factory settings on the latest CyanogenOS version. If you have any questions or issues following this guide, please send them in an
							{' '}
							<a href="mailto:support@oxygenupdater.com?subject=[Cyanogen%20Updater]%20Help">email</a>
							{' '}
							.
						</p>
					</Accordion>
				</>
			)}

			<GoogleAdsense type="display" />
		</>
	);
}
