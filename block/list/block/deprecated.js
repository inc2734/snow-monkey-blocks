'use strict';

import { RichText } from '@wordpress/block-editor';

import blockAttributes from './attributes';

export default [
	{
		attributes: blockAttributes,

		save( { attributes } ) {
			const { content, icon, iconColor } = attributes;

			return (
				<div
					className="smb-list"
					data-icon={ icon }
					data-icon-color={ iconColor }
				>
					<ul>
						<RichText.Content value={ content } />
					</ul>
				</div>
			);
		},
	},
];
