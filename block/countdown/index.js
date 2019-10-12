'use strict';

import blockIcon from './block-icon.svg';

import blockConfig from '../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/countdown';

export const settings = {
	title: __( 'Countdown Timer', 'snow-monkey-blocks' ),
	description: __( 'Display the countdown until the set date and time (Front-end only)', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: blockIcon,
	},
	category: blockConfig.blockCategories.common,
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'snow-monkey-blocks' ),
			isDefault: true,
		},
		{
			name: 'inline',
			label: __( 'Inline', 'snow-monkey-blocks' ),
		},
	],
	keywords: [
		__( 'Countdown', 'snow-monkey-blocks' ),
	],
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/countdown.png`,
	},
	attributes,
	edit,
	save,
};
