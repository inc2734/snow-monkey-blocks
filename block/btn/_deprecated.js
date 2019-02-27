'use strict';

import classnames from 'classnames';

const { RichText } = wp.editor;
const { __ } = wp.i18n;

export const deprecated = [
	{
		attributes: {
			content: {
				source: 'html',
				selector: '.smb-btn__label',
				default: __( 'Button', 'snow-monkey-blocks' ),
			},
			url: {
				type: 'string',
				default: '',
			},
			target: {
				type: 'string',
				default: '_self',
			},
			modifier: {
				type: 'string',
				default: '',
			},
			backgroundColor: {
				type: 'string',
			},
			textColor: {
				type: 'string',
			},
		},
		supports: {
			align: [ 'left', 'center', 'right' ],
		},

		save( { attributes } ) {
			const { content, url, target, modifier, backgroundColor, textColor } = attributes;

			return (
				<div className="u-clearfix smb-btn-wrapper">
					<a
						className={ classnames( 'smb-btn', { [ `smb-btn--${ modifier }` ]: !! modifier } ) }
						href={ url }
						target={ target }
						style={ { backgroundColor: backgroundColor } }
					>
						<span className="smb-btn__label" style={ { color: textColor } }>
							<RichText.Content value={ content } />
						</span>
					</a>
				</div>
			);
		},
	},
];
