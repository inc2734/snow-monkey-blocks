'use strict';

import BadgePopover from './badge-popover';

import {
	RichTextToolbarButton,
} from '@wordpress/editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	toggleFormat,
	applyFormat,
	removeFormat,
} from '@wordpress/richText';

import {
	__,
} from '@wordpress/i18n';

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
			onChange( toggleFormat( value, { name } ) );
		};

		const onChangeColor = ( color ) => {
			const attributes = {};
			if ( color ) {
				attributes.style = `background-color: ${ color }`;
				onChange( applyFormat( value, { name, attributes } ) );
			} else {
				onChange( removeFormat( value, name ) );
			}
		};

		return (
			<Fragment>
				<RichTextToolbarButton
					icon="tag"
					title={ __( 'Badge', 'snow-monkey-blocks' ) }
					onClick={ onToggle }
					isActive={ isActive }
				/>
				{ isActive &&
					<BadgePopover
						onChangeColor={ onChangeColor }
					/>
				}
			</Fragment>
		);
	},
};
