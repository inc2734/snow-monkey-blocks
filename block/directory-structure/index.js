'use strict';

import blockIcon from './block-icon.svg';

import blockConfig from '../../src/js/config/block';
import edit from './edit';
import save from './save';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/directory-structure';

export const settings = {
	title: __( 'Directory structure', 'snow-monkey-blocks' ),
	description: __( 'Display a list of directories and files', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: blockIcon,
	},
	category: blockConfig.blockCategories.common,
	keywords: [
		__( 'Directory structure', 'snow-monkey-blocks' ),
	],
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/directory-structure.png`,
	},
	edit,
	save,
};
