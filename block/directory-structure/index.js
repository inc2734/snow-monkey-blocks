import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

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
		<path d="M0.958,2.088v3.768v12.057h18.084V5.855V4.349H7.739L6.397,2.088H0.958z M2.465,5.855h4.427h10.643v10.549H2.465V5.855z M3.575,7.265c-0.272,0-0.494,0.221-0.494,0.494s0.222,0.494,0.494,0.494h8.895c0.273,0,0.494-0.221,0.494-0.494 s-0.221-0.494-0.494-0.494H3.575z M14.448,7.265c-0.273,0-0.494,0.221-0.494,0.494s0.221,0.494,0.494,0.494h1.977 c0.271,0,0.494-0.221,0.494-0.494s-0.223-0.494-0.494-0.494H14.448z M3.575,9.241c-0.272,0-0.494,0.221-0.494,0.494 s0.222,0.494,0.494,0.494h9.885c0.271,0,0.494-0.221,0.494-0.494s-0.223-0.494-0.494-0.494H3.575z M3.575,12.207 c-0.272,0-0.494,0.221-0.494,0.494s0.222,0.494,0.494,0.494h10.873c0.271,0,0.494-0.221,0.494-0.494s-0.223-0.494-0.494-0.494H3.575 z M3.575,14.184c-0.272,0-0.494,0.221-0.494,0.494s0.222,0.494,0.494,0.494h8.4c0.273,0,0.494-0.221,0.494-0.494 s-0.221-0.494-0.494-0.494H3.575z" />
	</svg>
);

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	keywords: [ __( 'Directory structure', 'snow-monkey-blocks' ) ],
	edit,
	save,
};
