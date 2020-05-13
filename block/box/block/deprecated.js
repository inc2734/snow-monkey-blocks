'use strict';

import { InnerBlocks } from '@wordpress/block-editor';

import blockAttributes from './attributes.json';

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes } ) {
			const {
				backgroundColor,
				borderColor,
				textColor,
				borderWidth,
			} = attributes;

			return (
				<div
					className="smb-box"
					style={ {
						backgroundColor,
						borderColor,
						color: textColor,
						borderWidth,
					} }
				>
					<div className="smb-box__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];
