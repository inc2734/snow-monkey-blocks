'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { RichText } = wp.editor;

export const deprecated = [
	{
		attributes: schema,

		save( { attributes } ) {
			const { title, content, modifier, icon } = attributes;

			return (
				<div className={ classnames( 'smb-alert', { [ `smb-alert--${ modifier }` ]: !! modifier } ) }>
					{ ! RichText.isEmpty( title ) &&
						<div className="smb-alert__title">
							<i className={ `fas fa-${ icon }` } />
							<strong>
								<RichText.Content value={ title } />
							</strong>
						</div>
					}

					<div className="smb-alert__body">
						<RichText.Content value={ content } />
					</div>
				</div>
			);
		},
	},
];
