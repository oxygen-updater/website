import {
	DOWNLOAD_TYPE_BOOT_DEBUGGABLE,
	DOWNLOAD_TYPE_FASTBOOT,
	DOWNLOAD_TYPE_STANDARD,
	DOWNLOAD_TYPE_STANDARD_OLD,
	DownloadHowTo,
	DownloadLinksMap,
} from 'src/models/downloads.interface';

// #region Download HowTo
const WARNING_FASTBOOT_PREFIX = 'This process is for advanced users only';
const WARNING_FASTBOOT_SUFFIX = 'If your goal is to simply update your phone, opt for <strong>‘standard’</strong> instead. Backup all data before proceeding!';

const ITEM_POWER_OFF_PHONE = `Turn off your phone completely`;
const ITEM_TERMINAL_FOLDER_SUFFIX = `then go into that folder and open a terminal window there`;

const ITEM_FASTBOOT_INSTALL = `Ensure you have <strong>ADB & fastboot</strong> tools installed on your PC. See this <a href="https://www.xda-developers.com/install-adb-windows-macos-linux/" target="_blank" rel="noopener noreferrer" class="external">XDA Developers guide</a>.`;
const ITEMS_FASTBOOT_MODE = [
	`${ITEM_POWER_OFF_PHONE}, then press the <strong>Power</strong> & <strong>Volume UP</strong> (if ZUK Z1, <strong>Volume DOWN</strong> as well) buttons at the same time`,
	`You should now see <strong>Fastboot mode</strong> on your phone screen`,
	`Connect your phone to your PC`,
	`Type the following into the terminal:<pre>fastboot devices</pre><em>Your device should be listed. If not, double-check the installation of <strong>ADB & fastboot</strong> tools and any relevant drivers.</em>`,
	`Unlock your phone’s bootloader via this command. Note that it may wipe your device’s storage:<pre>fastboot oem unlock</pre>`,
	`Confirm the operation either in the terminal or on your phone’s screen. The phone will reboot now, so repeat <strong>step 3</strong> to take it back into <strong>Fastboot mode</strong>.`,
];

const ITEMS_LOCK_BOOTLOADER_REBOOT = [
	`If you’re not going to perform additional modifications (e.g. rooting), you should now re-lock your bootloader (some apps don’t work on an unlocked bootloader):</p><pre>fastboot oem lock</pre>`,
	`Finally, you can now reboot your phone via this command:</p><pre>fastboot reboot</pre>`,
];

export const downloadHowToMap: Record<string, DownloadHowTo> = {
	[DOWNLOAD_TYPE_STANDARD]: {
		li: [
			`If not already done, transfer the downloaded ZIP to your phone’s <strong>Download</strong> folder`,
			ITEM_POWER_OFF_PHONE,
			`Press the <strong>Power</strong> & <strong>Volume DOWN</strong> (<strong>UP</strong> if ZUK Z1) buttons at the same time`,
			`You should now see <strong>Cyanogen Recovery</strong> on your phone screen`,
			`Tap on <strong>Apply Update</strong>, then tap on <strong>Choose from SD/Emulated</strong>`,
			`If you tapped on <strong>Choose from Emulated</strong>, tap on <strong>0</strong> (or on the folder of your user account, if there are multiple on your phone)`,
			`Tap on the folder you saved the downloaded ZIP in (usually <strong>Download</strong>)`,
			`Tap on the downloaded ZIP on your phone — be sure to select the correct one!`,
			`Tap on <strong>Yes — confirm installation</strong>. The installation process may take up to 15 minutes, so be patient.`,
			`Tap on <strong>Reboot system now</strong> once completed`,
			`Congratulations, you’ve just installed the standard CyanogenOS update package on your phone!`,
		],
	},
	[DOWNLOAD_TYPE_FASTBOOT]: {
		warning: `${WARNING_FASTBOOT_PREFIX} and erases the contents of your phone. ${WARNING_FASTBOOT_SUFFIX}`,
		li: [
			ITEM_FASTBOOT_INSTALL,
			`Download and extract the fastboot ZIP to a new folder on your PC, ${ITEM_TERMINAL_FOLDER_SUFFIX}`,
			...ITEMS_FASTBOOT_MODE,
			`Stop and double-check if you’ve downloaded the fastboot ZIP specific to your device. Any mistakes could brick your device.`,
			`Run this command in the terminal to re-install your modem firmware/baseband (required)<ul><li><strong>MacOS/Linux/Windows with Git Bash:</strong><pre>./flash-radio.sh</pre><em>This will automatically install all modem firmware components for you.</em></li><li><strong>Windows without Git Bash:</strong><br><em>Unfortunately, the standard Windows terminal can’t execute <code>.sh</code> scripts. You’ll need to manually copy all the <strong>fastboot</strong> commands in the <code>flash-radio.sh</code> file and run them one-by-one in the terminal. They must be done exactly in the same order as in the file!</em></li></ul>`,
			`Run these commands to re-install your phone’s OS:<pre>fastboot flash boot boot.img
fastboot flash recovery recovery.img
fastboot flash cache cache.img
fastboot flash system system.img</pre>`,
			`Re-install the user data partition of your phone (usually the <strong><code>userdata.img</code></strong> file)<pre>fastboot flash userdata YOUR_USERDATA_FILE.img</pre><em>This step may vary depending on your device’s storage space configuration. For example, in the OnePlus One package, <strong><code>userdata.img</code></strong> is for the 16GB variant and <strong><code>userdata_64G.img</code></strong> is for the 64GB variant. Choosing the wrong file may result in a smaller capacity, or it may even brick your device!</em>`,
			...ITEMS_LOCK_BOOTLOADER_REBOOT,
			`Congratulations, your phone should now be running the freshly-applied factory software!`,
		],
	},
	[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
		warning: `${WARNING_FASTBOOT_PREFIX}. These kernels are only meant for low-level phone development. ${WARNING_FASTBOOT_SUFFIX}`,
		li: [
			ITEM_FASTBOOT_INSTALL,
			`Download the boot-debuggable IMG to a new folder on your PC, ${ITEM_TERMINAL_FOLDER_SUFFIX}`,
			...ITEMS_FASTBOOT_MODE,
			`Stop and double-check if you’ve downloaded the boot-debuggable IMG specific to your device. Any mistakes could brick your device.`,
			`Type the following command to install the boot-debuggable IMG:<pre>fastboot flash boot NAME_OF_THE_BOOT_DEBUGGABLE_IMAGE.img</pre>`,
			...ITEMS_LOCK_BOOTLOADER_REBOOT,
			`Congratulations, your phone should now be running the boot-debuggable kernel software!`,
		],
	},
};
// #endregion

// #region Download notes
const NOTE_OBI_UNOFFICIAL = 'obi-unofficial';
const NOTE_WILEYFOX_OLD = 'wileyfox-old';
const NOTE_WILEYFOX_STORM_OLD = 'wileyfox-storm-old';
const NOTE_WILEYFOX_STORM_LATEST = 'wileyfox-storm-latest';
const NOTE_WILEYFOX_SWIFT_OLD = 'wileyfox-swift-old';
const NOTE_WILEYFOX_SWIFT_LATEST = 'wileyfox-swift-latest';

export const downloadNotesMap: Record<string, string> = {
	[NOTE_OBI_UNOFFICIAL]: `<strong>Unofficial:</strong> contains root access, may be unstable. Use only if your device stopped working. Not for updating!`,

	[NOTE_WILEYFOX_OLD]: `<strong>Old:</strong> Cyanogen never published newer versions before shutting down. <a href="mailto:support@oxygenupdater.com">Contact us</a> if you somehow have these files.`,

	[NOTE_WILEYFOX_STORM_OLD]: `<strong>Old:</strong> use if currently on CyanogenOS version <code>YOG7DAS2FI</code>, <code>YOG4PAS3MG</code> or <code>YOG4PAS33I</code>. Install <strong>‘latest’</strong> after this.`,
	[NOTE_WILEYFOX_STORM_LATEST]: `<strong>Latest:</strong> use if currently on CyanogenOS version <code>ZNH2KAS4YE</code>, <code>ZNH2KAS3NA</code> or <code>ZNH0EAS45F</code>.`,

	[NOTE_WILEYFOX_SWIFT_OLD]: `<strong>Old:</strong> use if currently on CyanogenOS version <code>YOG4PAS1T1</code>, <code>YOG7DAS2FI</code> or <code>YOG4PAS33J</code>. Install <strong>‘latest’</strong> after this.`,
	[NOTE_WILEYFOX_SWIFT_LATEST]: `<strong>Latest:</strong> use if currently on CyanogenOS version <code>ZNH2KAS29G</code>, <code>ZNH0EAS2NH</code> or <code>ZNH2KAS3LG</code>.`,
};
// #endregion

export const downloadLinksMap: DownloadLinksMap = {
	// #region BQ Aquaris X5
	'BQ Aquaris X5': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'bq_aquaris_x5/cm-13.1.4-ZNH2KAS5FE-paella-signed-9633d5e8c9.zip',
			md5: '7d3c54ece4281972430c8a887e4c51dd',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'bq_aquaris_x5/cm-13.1.4-ZNH2KAS5FE-paella-signed-fastboot-8c1655177b.zip',
			md5: 'a2246eb129da6b0f20b1de33318d7e30',
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'bq_aquaris_x5/cm-13.1.4-ZNH2KAS5FE-paella-boot-debuggable-887e7cfa22.img',
			md5: '7a07a6371ae30b3169a03218421b1c35',
		},
	},
	// #endregion
	// #region OBI Worldphone MV1
	'OBI Worldphone MV1': {
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'obi_mv1/OBI_MV1_CM12.1_511.rar',
			md5: 'c512ef80a1bd4c426bbc84e6171ca504',
			note: NOTE_OBI_UNOFFICIAL,
		},
	},
	// #endregion
	// #region OnePlus One
	'OnePlus One': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'oneplus_one/cm-13.1.2-ZNH2KAS3P0-bacon-signed-8502142fdc.zip',
			md5: 'a40ddd581f58fb1588ed19571d32fedf',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'oneplus_one/cm-13.1.2-ZNH2KAS3P0-bacon-signed-fastboot-76d803f730.zip',
			md5: '79ba0f70c236fe64a6b9db8ec1e718d0',
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'oneplus_one/cm-13.1.2-ZNH2KAS3P0-bacon-boot-debuggable-ff0428d091.img',
			md5: 'b0e74bdc5a02ae6bc69af22e4d899b58',
		},
	},
	// #endregion
	// #region Oppo N1 CM
	'Oppo N1 CM': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'oppo_n1_cm/cm-11.0-XNPH40P-n1-signed.zip',
			md5: '14cc46b307dbfd5159d453e8498dd088',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'oppo_n1_cm/cm-11.0-XNPH40P-n1-signed-fastboot.zip',
			md5: '7ae41b7e4abf19dbd6c12d8e16e27952',
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'oppo_n1_cm/cm-11.0-XNPH40P-n1-boot-debuggable.img',
			md5: '075ea916f091e8186ba7941e7db76a02',
		},
	},
	// #endregion
	// #region Smartfren Andromax Q
	'Smartfren Andromax Q': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'smartfren_andromax_q/cm-12.1-YOG4PAS42M-rendang-signed-258d4e132b.zip',
			md5: 'f736a4fd5cdf25817dc72f284ae4d070',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'smartfren_andromax_q/cm-12.1-YOG4PAS42M-rendang-signed-fastboot-ae9f129c55.zip',
			md5: 'b824a60add21eaeeb08d432b2843fb48',
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'smartfren_andromax_q/cm-12.1-YOG4PAS42M-rendang-boot-debuggable-407a3c9ad7.img',
			md5: '415d6ce4338caee59c2a26cecb796713',
		},
	},
	// #endregion
	// #region Wileyfox Spark/Spark+
	'Wileyfox Spark/Spark+': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'wf_spark_sparkplus/SW21-WF-PORRIDGE-CM-13.0.5-ZNH0EAS9KB-RECOVERY.zip',
			md5: 'ff9b169b1e30161969505d49b2af9cd2',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'wf_spark_sparkplus/cm-13.0.2-ZNH0EAS6MA-porridge-signed-fastboot-c0304c0e4e.zip',
			md5: 'b0404d6b729b65232e047cc070ed8c38',
			note: NOTE_WILEYFOX_OLD,
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'wf_spark_sparkplus/cm-13.0.2-ZNH0EAS6MA-porridge-boot-debuggable-f365a48e53.img',
			md5: 'ffc7891e28c8e3be737cadd6ae1f1c71',
			note: NOTE_WILEYFOX_OLD,
		},
	},
	// #endregion
	// #region Wileyfox Spark X
	'Wileyfox Spark X': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'wf_spark_x/WF-PORRIDGEK-CM-13.0.5-ZNH0EAS9KC-RECOVERY.zip',
			md5: '5295f135938ecf667f89ed7f4da30b92',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'wf_spark_x/cm-13.0.2-ZNH0EAS6XD-porridgek3-signed-fastboot-3215802a44.zip',
			md5: '8c684b93c3cd042866cfdc3d82684729',
			note: NOTE_WILEYFOX_OLD,
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'wf_spark_x/cm-13.0.2-ZNH0EAS6XD-porridgek3-boot-debuggable-a2170ae8ee.img',
			md5: '1e31c75ab6a6e7373c07c306552d835e',
			note: NOTE_WILEYFOX_OLD,
		},
	},
	// #endregion
	// #region Wileyfox Storm
	'Wileyfox Storm': {
		[DOWNLOAD_TYPE_STANDARD_OLD]: {
			path: 'wf_storm/cm-13.1.2-ZNH2KAS4YE-kipper (recovery).zip',
			md5: 'd79ef0441d6f507ac32a7fe861d7564c',
			note: NOTE_WILEYFOX_STORM_OLD,
		},
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'wf_storm/SW23-WF-KIPPER-CM-13.1.5-ZNH2KAS7EC-RECOVERY.zip',
			md5: '2a0d058f73d29a66be85d4b048a4562b',
			note: NOTE_WILEYFOX_STORM_LATEST,
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'wf_storm/cm-13.1.2-ZNH2KAS3NA-kipper-signed-fastboot-1eb4b5e94b.zip',
			md5: '3c8ad411f960acee450ee3644503650e',
			note: NOTE_WILEYFOX_OLD,
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'wf_storm/cm-13.1.2-ZNH2KAS3NA-kipper-boot-debuggable-6c1a30b194.img',
			md5: 'd26370a865e69f5f30bb046c127e240a',
			note: NOTE_WILEYFOX_OLD,
		},
	},
	// #endregion
	// #region Wileyfox Swift
	'Wileyfox Swift': {
		[DOWNLOAD_TYPE_STANDARD_OLD]: {
			path: 'wf_swift1/cm-13.0-ZNH0EAS2NH-crackling-signed-9c92ed2cde_recovery.zip',
			md5: '9185d5c8c4b5d03eec1d9f6366e71530',
			note: NOTE_WILEYFOX_SWIFT_OLD,
		},
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'wf_swift1/SW27-WF-CRACKLING-CM-13.1.5-ZNH2KAS7EB-RECOVERY.zip',
			md5: '482bc9668d2055cd7f1971c040a00698',
			note: NOTE_WILEYFOX_SWIFT_LATEST,
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'wf_swift1/cm-13.1.2-ZNH2KAS3LG-crackling-signed-fastboot-84f0d5200b.zip',
			md5: '6b2b09c40f1a2b85ee5335823640536d',
			note: NOTE_WILEYFOX_OLD,
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'wf_swift1/cm-13.1.2-ZNH2KAS3LG-crackling-boot-debuggable-b3e2b2b5fa.img',
			md5: '247d9ad6c79c3f76537de0ab30dfe02b',
			note: NOTE_WILEYFOX_OLD,
		},
	},
	// #endregion
	// #region Wileyfox Swift 2/2+/2X
	'Wileyfox Swift 2/2+/2X': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'wf_swift2_swift2plus/SW33-WF-MARMITE-CM-13.1.5-ZNH2KAS7EB-RECOVERY.zip',
			md5: '756e7f4fdb0ba9beb2437263e89c53af',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'wf_swift2_swift2plus/cm-13.1.4-ZNH2KAS5RM-marmite-signed-fastboot-c64f8f5d87.zip',
			md5: 'ec3213482f3f807254aa3f820acd94c7',
			note: NOTE_WILEYFOX_OLD,
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'wf_swift2_swift2plus/cm-13.1.4-ZNH2KAS5RM-marmite-boot-debuggable-0c43602595.img',
			md5: '0dea5b00f3ae8a895aeab3746b04551d',
			note: NOTE_WILEYFOX_OLD,
		},
	},
	// #endregion
	// #region YU Yuphoria
	'YU Yuphoria': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'yu_yuphoria/cm-12.1-YOG4PAS8A8-lettuce-signed-42c35cd0a7.zip',
			md5: 'b55495d9ca79ba5346a7be2a49195801',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'yu_yuphoria/cm-12.1-YOG4PAS8A8-lettuce-signed-fastboot-719d105a2b.zip',
			md5: 'd7f6e8e6f26c2c8352ff14206e871096',
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'yu_yuphoria/cm-12.1-YOG4PAS8A8-lettuce-boot-debuggable-2bfddced9d.img',
			md5: '152be7d2d5ee64a87062ffc16d75a040',
		},
	},
	// #endregion
	// #region YU Yureka/Yureka+
	'YU Yureka/Yureka+': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'yu_yureka_yurekaplus/cm-12.1-YOG4PAS8A4-tomato-signed-224c88c4ef.zip',
			md5: '90258fc8099b10160f951e99e79eb263',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'yu_yureka_yurekaplus/cm-12.1-YOG4PAS8A4-tomato-signed-fastboot-a7a306cebd.zip',
			md5: '4a4c3a5810260971b44368676d4556df',
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'yu_yureka_yurekaplus/cm-12.1-YOG4PAS8A4-tomato-boot-debuggable-8bc066a691.img',
			md5: 'becb8c702f8e7a612c328f36872d29c7',
		},
	},
	// #endregion
	// #region YU Yutopia
	'YU Yutopia': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'yu_yutopia/cm-12.1-YOG4PAS5W0-sambar-signed-2dcb7bbf35.zip',
			md5: 'eb259a5377979cc2eb124c668f8300b7',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'yu_yutopia/cm-12.1-YOG4PAS5W0-sambar-signed-fastboot-44d7581426.zip',
			md5: '3c652cf58340112bd9d387f0639a481b',
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'yu_yutopia/cm-12.1-YOG4PAS5W0-sambar-boot-debuggable-3d2b59b9ba.img',
			md5: '22552ef1920a528fdf1072ed1abae0e2',
		},
	},
	// #endregion
	// #region ZUK Z1
	'ZUK Z1': {
		[DOWNLOAD_TYPE_STANDARD]: {
			path: 'zuk_z1/cm-12.1-YOG4PAS9IG-ham-signed-d4fc2c5394.zip',
			md5: 'c061b4f65d5ee5f80c53fe97173923e5',
		},
		[DOWNLOAD_TYPE_FASTBOOT]: {
			path: 'zuk_z1/cm-12.1-YOG4PAS9IG-ham-signed-fastboot-b9cce4220b.zip',
			md5: 'e8329b811d71dd30135138eebf7c19f0',
		},
		[DOWNLOAD_TYPE_BOOT_DEBUGGABLE]: {
			path: 'zuk_z1/cm-12.1-YOG4PAS9IG-ham-boot-debuggable-14878ef4f1.img',
			md5: '2989aa7b5b6cdae9d2bf83b01271aac7',
		},
	},
	// #endregion
};
