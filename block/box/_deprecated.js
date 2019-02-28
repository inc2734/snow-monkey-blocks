'use strict';

import { schema } from './_schema.js';

const { InnerBlocks } = wp.editor;

export const deprecated = [
	{
		attributes: schema,

		save( { attributes } ) {
			const { backgroundColor, borderColor, textColor, borderWidth } = attributes;

			return (
				<div
					className="smb-box"
					style={ { backgroundColor: backgroundColor, borderColor: borderColor, color: textColor, borderWidth: borderWidth } }
				>
					<div className="smb-box__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];
