import { Guide, GUIDE_TYPE_CONVERT, GUIDE_TYPE_UPDATE } from 'src/models/guides.interface';

export const guidesList: Guide[] = [{
	deviceName: 'OnePlus One',
	type: GUIDE_TYPE_UPDATE,
	osZipPath: 'oneplus_one/cm-13.1.2-ZNH2KAS3P0-bacon-signed-fastboot-76d803f730.zip',
	flashtoolsZipPath: 'factory-image-flash-tools-bacon-windows-flashtools.zip',
}, {
	deviceName: 'YU Yuphoria',
	type: GUIDE_TYPE_CONVERT,
	osZipPath: 'yu_yuphoria/cm-12.1-YOG4PAS8A8-lettuce-signed-fastboot-719d105a2b.zip',
	flashtoolsZipPath: 'yuphoria-lollipop-windows-flashtools.zip',
}, {
	deviceName: 'YU Yureka/Yureka+',
	type: GUIDE_TYPE_CONVERT,
	osZipPath: 'yu_yureka_yurekaplus/cm-12.1-YOG4PAS8A4-tomato-signed-224c88c4ef.zip',
	flashtoolsZipPath: 'yureka-lollipop-windows-flashtools.zip',
}, {
	deviceName: 'ZUK Z1',
	type: GUIDE_TYPE_UPDATE,
	osZipPath: 'zuk_z1/cm-12.1-YOG4PAS9IG-ham-signed-d4fc2c5394.zip',
	flashtoolsZipPath: 'factory-image-flash-tools-z1-lollipop-windows-flashtools.zip',
}];
