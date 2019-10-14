'use strict';

import {
	RichTextToolbarButton,
} from '@wordpress/editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	toggleFormat,
} from '@wordpress/richText';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/highlighter';

export const settings = {
	title: __( 'Highlighter', 'snow-monkey-blocks' ),
	tagName: 'span',
	className: 'smb-highlighter',
	edit( props ) {
		const { value, isActive, onChange } = props;
		const onToggle = () => onChange( toggleFormat( value, { type: name } ) );

		return (
			<Fragment>
				<RichTextToolbarButton
					icon="admin-customizer"
					title={ __( 'Highlighter', 'snow-monkey-blocks' ) }
					onClick={ onToggle }
					isActive={ isActive }
				/>
			</Fragment>
		);
	},
};
