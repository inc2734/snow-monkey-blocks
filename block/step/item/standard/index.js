import blockConfig from '@smb/config/block';
import metadata from './block.json';
import icon from '../../icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	edit,
	save,
	transforms,
	deprecated,
};
