'use strict';

import {
	map,
} from 'lodash';

import {
	select,
} from '@wordpress/data';

import {
	RichTextToolbarButton,
} from '@wordpress/block-editor';

import {
	removeFormat,
} from '@wordpress/rich-text';

import {
	__,
} from '@wordpress/i18n';

export default function( { value, isActive, onChange } ) {
	const onToggle = () => {
		const formatTypes = select( 'core/rich-text' ).getFormatTypes();
		if ( 0 < formatTypes.length ) {
			let newValue = value;
			map( formatTypes, ( activeFormat ) => {
				newValue = removeFormat( newValue, activeFormat.name );
			} );
			onChange( { ...newValue } );
		}
	};

	return (
		<RichTextToolbarButton
			icon="editor-removeformatting"
			title={ __( 'Remove formatting', 'snow-monkey-blocks' ) }
			onClick={ onToggle }
			isActive={ isActive }
		/>
	);
}
