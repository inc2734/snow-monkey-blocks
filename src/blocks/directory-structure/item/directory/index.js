import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
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

registerBlockType( metadata.name, {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	edit,
	save,
	deprecated,
	transforms,
} );
