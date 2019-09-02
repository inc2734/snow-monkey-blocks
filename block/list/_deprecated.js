'use strict';

import { schema } from './_schema';

const { RichText } = wp.editor;

export const deprecated = [
	{
		attributes: schema,

		save( { attributes } ) {
			const { content, icon, iconColor } = attributes;

			return (
				<div className="smb-list" data-icon={ icon } data-icon-color={ iconColor }>
					<ul>
						<RichText.Content value={ content } />
					</ul>
				</div>
			);
		},
	},
];
