'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

const icon = (
	<svg
		role="img"
		focusable="false"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path d="M0.958,2.088v3.768v12.057h18.084V5.855V4.349H7.739L6.397,2.088H0.958z M2.465,5.855h4.427h10.643v10.549H2.465V5.855z" />
	</svg>
);

export const name = 'snow-monkey-blocks/directory-structure--item--directory';

export const settings = {
	title: __( 'Directory item', 'snow-monkey-blocks' ),
	description: __( 'Display a directory item', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/directory-structure' ],
	attributes,
	edit,
	save,
	transforms,
};
