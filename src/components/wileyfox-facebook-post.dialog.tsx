import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const WILEFOX_DIALOG_ID = 'wileyfox-facebook-post-dialog';

export default function WileyfoxFacebookPostDialog() {
	return (
		<dialog
			id={WILEFOX_DIALOG_ID}
			// @ts-expect-error TS2322 valid: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby
			closedBy="any"
		>
			<div className="border-b border-hover px-6 pt-4">
				<h2>
					Verbatim copy of the
					{' '}
					<a
						href="https://www.facebook.com/officialwileyfox/photos/a.1484448178533169.1073741828.1481273535517300/1794536560857661/?type=3"
						target="_blank"
						rel="noopener noreferrer"
						class="external"
					>
						official Wileyfox Facebook post
					</a>
					: “Y’ALL NEED TO UPDATE YA PHONES – RIGHT NOW”
				</h2>

				<button
					className="icon absolute top-1 right-1"
					title="Close dialog"
					// @ts-expect-error TS2322 valid: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#command
					command="close"
					commandFor="wileyfox-facebook-post-dialog"
					autofocus
				>
					<FontAwesomeIcon icon={faClose} />
				</button>
			</div>

			<div className="overflow-y-auto px-6 pt-4 leading-6">
				<p><em>(Please excuse the language and tone of the following text. It was taken straight from the official Wileyfox post. We’ve only made some minor formatting adjustments.)</em></p>

				<p>Some of you (lazy-bums) haven’t updated your phones yet and NOW is the time to do so. If you are already on any of our Android 7 software, then you don’t need to take any action. If you want to be up to date, if you want to have the latest security updates and continue receiving the latest automatic FOTA updates in future, then all is in your hand, don’t get stuck on an older CyanogenOS version as it will be no longer supported nor will you have access to receive automatic updates from Wileyfox. So we will help to take you to latest software version which will then make you eligible for automatic updates to Android 7.</p>

				<p>Currently, automatic updates for Android 7 are only available for Swift, Storm, Swift 2/2+/2X. For Spark/Spark+ and Spark X, the automatic Android 7 update will be released to customers in near future, however you need to make sure you are eligible. Please check the software version below:</p>
				<ul>
					<li>
						Swift:
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						Storm:
						{' '}
						<code>ZNH2KAS7EC</code>
					</li>
					<li>
						Swift 2/2+/2X:
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						Spark/Spark+:
						{' '}
						<code>ZNH0EAS9KB</code>
						,
						{' '}
						<code>ZNH0EASC8L</code>
					</li>
					<li>
						Spark X:
						{' '}
						<code>ZNH0EAS9KC</code>
					</li>
				</ul>

				<p>Please follow the steps below and get in touch with us via DM or email customersupport@wileyfox.com if you have any issues. We are here to help 💚</p>

				<h3>STEP 1: CHECK</h3>
				<p>Check if you have the latest software! Turn on your phone › Settings › About Phone › (look for space that says) CyanogenOS/Android Version</p>

				<h4>What if I have Android Nougat?</h4>
				<p>YOU DON’T HAVE TO DO ANYTHING. If you’ve already upgraded to Android 7, relax, don’t worry, you need to do nada; you’re on track to continuously get automatic updates.</p>

				<h4>What if I have any Cyanogen?</h4>
				<p>We are only worried about the old, outdated Cyanogen versions. If you are on any of the fairly recent Cyanogen version then you are good, and you don’t need to do anything else. If you have chosen not to upgrade your software for a while you’ll be on an old version of the Cyanogen software and will require a twostep (mostly applicable for SWIFT or STORM users who are stuck on Android 5.1/CM12.1) process to enable a full software and security update (key learning: AAAAAALWAYS UPDATE as soon as available). Please check the software list in the bottom of the post.</p>

				<h3>STEP 2: UPDATE</h3>
				<h4>A. I need to update; how do I do that?</h4>
				<p>To update: Go to Settings › About Phone › System updates › Check for updates › Follow the steps to upgrade to latest software</p>

				<h4>B. I can’t do A. How do I upgrade to any of the eligible version?</h4>
				<p>Unfortunately, if you have skipped the past updates you have to do a MANUAL UPDATE of the software. If you do not do a manual software upgrade you will NOT be able to access future automatic software upgrades. What does that mean? It means that you really NEED to update. The steps you need to take depend on which device you are using and the current software version you have on your phone so please CHECK BELOW for correct todo.</p>
				<p>
					What do I need to do for a MANUAL UPDATE?
					BACKUP YOUR PHONE. GET AN SD CARD. MAKE SURE YOU HAVE WIFI.
					You will need to download the recovery file into an SD card and go through the recovery menu to
					update the SW.
					The SD card manual update effectively does the SW upgrade in the same way as an automatic
					upgrade – this means you should not lose any data – but we strongly encourage you to backup in case
					of any unforeseen mishaps. SERIOUSLY. BACK UP. Better safe than sorry!
					The recovery file is a single file in zip format. DO NOT unzip or rename. You don’t need to have any
					manual interaction with the file itself, it just needs to be placed in the correct location (root directory of
					SD card).
				</p>

				<strong>Instructions:</strong>
				<p>READ THIS prior to attempting to manually update your device it contains vital information. There will be a couple of options of updates you need to look through the below list to see which software you are on and which you should update to. The capital letters and numbers to the left is your current software version and the ones to the right are the one you should choose to upgrade to (links to stepbystep manual update instructions is given at the bottom of this post):</p>

				<strong>Swift:</strong>
				<p>IF No automatic update (FOTA path) available, do 1 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						<code>ZNH2KAS3LG</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
				</ul>

				<p>No automatic update (FOTA path) available, do 1 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						<code>ZNH0EAS2NH</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						<code>ZNH2KAS29G</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
				</ul>

				<p>No automatic update (FOTA path) available, do 2 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						Step1:
						{' '}
						<code>YOG7DAS2FI</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS2NH</code>
						{' '}
						and then Step2:
						{' '}
						<code>ZNH0EAS2NH</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						Step1:
						{' '}
						<code>YOG4PAS33J</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS2NH</code>
						{' '}
						and then Step2:
						{' '}
						<code>ZNH0EAS2NH</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						Step1:
						{' '}
						<code>YOG4PAS1T1</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS2NH</code>
						{' '}
						and then Step2:
						{' '}
						<code>ZNH0EAS2NH</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
				</ul>

				<strong>Storm:</strong>
				<p>No automatic update (FOTA path) available, do 1 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						<code>ZNH2KAS4YE</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EC</code>
					</li>
					<li>
						<code>ZNH2KAS3NA</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EC</code>
					</li>
					<li>
						<code>ZNH0EAS45F</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EC</code>
					</li>
				</ul>

				<p>No automatic update (FOTA path) available, do 2 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						Step1:
						{' '}
						<code>YOG7DAS2FI</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS4YE</code>
						{' '}
						and then Step2:
						{' '}
						<code>ZNH2KAS4YE</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EC</code>
					</li>
					<li>
						Step1:
						{' '}
						<code>YOG4PAS3MG</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS4YE</code>
						{' '}
						and then Step2:
						{' '}
						<code>ZNH2KAS4YE</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EC</code>
					</li>
					<li>
						Step1:
						{' '}
						<code>YOG4PAS33I</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS4YE</code>
						{' '}
						and then Step2:
						{' '}
						<code>ZNH2KAS4YE</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EC</code>
					</li>
				</ul>

				<strong>Swift 2/2+/2X:</strong>
				<p>IF No automatic update (FOTA path) available, do 1 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						<code>ZNH2KAS4TD</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						<code>ZNH2KAS5RM</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						<code>ZNH2KAS5JA</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						<code>ZNH2KAS6FF</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						<code>ZNH2KAS5FA</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
				</ul>

				<p>No automatic update (FOTA path) available, do 1 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						<code>ZNH2KAS4OB</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
					<li>
						<code>ZNH2KAS64C</code>
						{' '}
						to
						{' '}
						<code>ZNH2KAS7EB</code>
					</li>
				</ul>

				<p><strong>Up to date as of June 22th, 2017: PLEASE NOTE THAT ON SPARK, SPARK+ AND SPARKX THERE IS NO ANDROID7 UPDATE AVAILABLE YET! THIS BELOW, WILL TAKE YOU TO THE LATEST CYANOGEN VERSION AND MAKE YOU ELIGIBLE FOR THE ANDROID 7 UPDATE WHICH IS DUE LATER THIS MONTH (JUNE 2017).</strong></p>

				<strong>Spark/Spark+:</strong>
				<p>IF No automatic update (FOTA path) available, do 1 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						<code>ZNH0EAS6MA</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS9KB</code>
					</li>
					<li>
						<code>ZNH0EAS7BD</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS9KB</code>
					</li>
					<li>
						<code>ZNH0EAS8IC</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS9KB</code>
					</li>
				</ul>

				<p>No automatic update (FOTA path) available, do 1 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						<code>ZNH0EAS3UH</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS9KB</code>
					</li>
					<li>
						<code>ZNH0EAS58C</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS9KB</code>
					</li>
					<li>
						<code>ZNH0EAS4SF</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS9KB</code>
					</li>
				</ul>

				<strong>Spark X:</strong>
				<p>IF No automatic update (FOTA path) available, do 1 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						<code>ZNH0EAS8CE</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS9KC</code>
					</li>
					<li>
						<code>ZNH0EAS6XD</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS9KC</code>
					</li>
				</ul>

				<p>No automatic update (FOTA path) available, do 1 step manual SD card/recovery method update:</p>
				<ul>
					<li>
						<code>ZNH0EAS5UI</code>
						{' '}
						to
						{' '}
						<code>ZNH0EAS9KC</code>
					</li>
				</ul>
			</div>
		</dialog>
	);
}
