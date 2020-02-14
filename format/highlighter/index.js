'use strict';

import { RichTextToolbarButton } from '@wordpress/block-editor';
import { toggleFormat } from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/highlighter';

export const settings = {
	title: __( 'Highlighter', 'snow-monkey-blocks' ),
	tagName: 'span',
	className: 'smb-highlighter',
	edit( props ) {
		const { value, isActive, onChange } = props;
		const onToggle = () =>
			onChange( toggleFormat( value, { type: name } ) );

		return (
			<>
				<RichTextToolbarButton
					icon="admin-customizer"
					title={ __( 'Highlighter', 'snow-monkey-blocks' ) }
					onClick={ onToggle }
					isActive={ isActive }
				/>
			</>
		);
	},
};
