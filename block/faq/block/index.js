'use strict';

import blockConfig from '../../../src/js/config/block';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/faq';

export const settings = {
	title: __( 'FAQ', 'snow-monkey-blocks' ),
	description: __( 'You can list the FAQs.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'businessman',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/faq.png`,
	},
	edit,
	save,
	deprecated,
};
