'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { RichText } = wp.editor;

export const deprecated = [
	{
		attributes: schema,

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
						style={ { backgroundColor: backgroundColor } }
						target={ '_self' === target ? undefined : target }
						rel={ '_self' === target ? undefined : 'noopener noreferrer' }
					>
						<span className="smb-btn__label" style={ { color: textColor } }>
							<RichText.Content value={ content } />
						</span>
					</a>
				</div>
			);
		},
	},
	{
		attributes: schema,

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
