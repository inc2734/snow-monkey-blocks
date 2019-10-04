'use strict';

import map from 'lodash/map';

const { registerFormatType } = wp.richText;
const { select } = wp.data;
const { RichTextToolbarButton } = wp.blockEditor;
const { Component } = wp.element;
const { removeFormat } = wp.richText;
const { __ } = wp.i18n;

const type = 'snow-monkey-blocks/remove-fomatting';

class RemoveFormatting extends Component {
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

registerFormatType(
	type,
	{
		title: __( 'Remove formatting', 'snow-monkey-blocks' ),
		tagName: 'span',
		className: 'smb-remove-fomatting',
		edit( { isActive, value, onChange } ) {
			return (
				<RemoveFormatting
					value={ value }
					isActive={ isActive }
					onChange={ onChange }
				/>
			);
		},
	}
);
