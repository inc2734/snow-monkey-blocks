'use strict';

import blockIcon from './block-icon.svg';

import blockConfig from '../../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import transforms from './transforms';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/directory-structure--item--file';

export const settings = {
	title: __( 'File item', 'snow-monkey-blocks' ),
	description: __( 'Display a file item', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: blockIcon,
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/directory-structure' ],
	attributes,
	edit,
	save,
	transforms,
};
