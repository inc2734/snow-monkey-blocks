'use strict';

import blockAttributes from './attributes';

import {
	RichText,
} from '@wordpress/block-editor';

export default [
	{
		attributes: blockAttributes,

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
