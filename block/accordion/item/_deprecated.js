'use strict';

import { schema } from './_schema.js';

const { RichText, InnerBlocks } = wp.editor;

export const deprecated = [
	{
		attributes: schema,

		save( { attributes } ) {
			const { title } = attributes;

			return (
				<div className="smb-accordion__item">
					<div className="smb-accordion__item__title">
						<RichText.Content value={ title } />
					</div>
					<input type="checkbox" className="smb-accordion__item__control" />
					<div className="smb-accordion__item__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];
