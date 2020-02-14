'use strict';

import { RichTextToolbarButton } from '@wordpress/block-editor';
import { toggleFormat, applyFormat, removeFormat } from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';

import BadgePopover from './badge-popover';

export const name = 'snow-monkey-blocks/badge';

export const settings = {
	title: __( 'Badge', 'snow-monkey-blocks' ),
	tagName: 'span',
	className: 'smb-badge',
	attributes: {
		style: 'style',
	},
	edit: ( props ) => {
		const { value, isActive, onChange } = props;

		const onToggle = () => {
			onChange( toggleFormat( value, { type: name } ) );
		};

		const onChangeColor = ( color ) => {
			const attributes = {};
			if ( color ) {
				attributes.style = `background-color: ${ color }`;
				onChange( applyFormat( value, { type: name, attributes } ) );
			} else {
				onChange( removeFormat( value, name ) );
			}
		};

		return (
			<>
				<RichTextToolbarButton
					icon="tag"
					title={ __( 'Badge', 'snow-monkey-blocks' ) }
					onClick={ onToggle }
					isActive={ isActive }
				/>
				{ isActive && <BadgePopover onChangeColor={ onChangeColor } /> }
			</>
		);
	},
};
