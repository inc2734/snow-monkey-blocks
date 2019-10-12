'use strict';

import RemoveFormatting from './remove-formatting';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/remove-fomatting';

export const settings = {
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
};
