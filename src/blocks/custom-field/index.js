import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { cog as cogIcon } from '@wordpress/icons';

import metadata from './block.json';
import edit from './edit';
import save from './save';

import './index.scss';

registerBlockType( metadata.name, {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: cogIcon,
	},
	edit,
	save,
} );
