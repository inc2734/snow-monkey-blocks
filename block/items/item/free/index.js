import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	edit,
	save,
	transforms,
};
