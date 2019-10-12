'use strict';

import {
	map,
} from 'lodash';

import {
	select,
} from '@wordpress/data';

import {
	RichTextToolbarButton,
} from '@wordpress/blockEditor';

import {
	Component,
} from '@wordpress/element';

import {
	removeFormat,
} from '@wordpress/richText';

import {
	__,
} from '@wordpress/i18n';

export default class RemoveFormatting extends Component {
	render() {
		const {
			value,
			isActive,
			onChange,
		} = this.props;

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
}
