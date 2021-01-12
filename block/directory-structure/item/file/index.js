import blockConfig from '@smb/config/block';
import metadata from './block.json';
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
		<path d="M4.079,2.105v15.789h11.842V6.712l-4.605-4.606H4.079z M5.395,3.421h5.265v3.948h3.946v9.211H5.395V3.421z M7.368,9.343 v0.658h3.947V9.343H7.368z M7.368,11.316v0.658h5.264v-0.658H7.368z M7.368,13.291v0.657h3.947v-0.657H7.368z" />
	</svg>
);

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
};
