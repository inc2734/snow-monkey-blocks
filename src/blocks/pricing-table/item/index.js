import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

import metadata from './block.json';
import icon from '../icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

registerBlockType( metadata.name, {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	edit,
	save,
	deprecated,
} );

function addCoreListItemToPricingTable( settings, name ) {
	if ( name !== 'core/list-item' ) {
		return settings;
	}

	let parents = [];
	if ( null != settings?.parent ) {
		if ( Array.isArray( settings.parent ) ) {
			parents = settings.parent;
		} else {
			parents = [ settings.parent ];
		}
	}

	return {
		...settings,
		parent: [ ...parents, metadata.name ],
	};
}

addFilter(
	'blocks.registerBlockType',
	'snow-monkey-blocks/add-core-list-item-to-pricing-table',
	addCoreListItemToPricingTable
);
