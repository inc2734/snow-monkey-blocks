'use strict';

import { BadgePopover } from './badge-popover';

const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { registerFormatType, toggleFormat, applyFormat, removeFormat } = wp.richText;
const { RichTextToolbarButton } = wp.editor;

const type = 'snow-monkey-blocks/badge';

registerFormatType(
	type,
	{
		title: __( 'Badge', 'snow-monkey-blocks' ),
		tagName: 'span',
		className: 'smb-badge',
		attributes: {
			style: 'style',
		},
		edit( props ) {
			const { value, isActive, onChange } = props;

			const onToggle = () => {
				onChange( toggleFormat( value, { type } ) );
			};

			const onChangeColor = ( color ) => {
				const attributes = {};
				if ( color ) {
					attributes.style = `background-color: ${ color }`;
					onChange( applyFormat( value, { type, attributes } ) );
				} else {
					onChange( removeFormat( value, type ) );
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
	}
);
