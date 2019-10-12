'use strict';

import blockAttributes from './attributes';

import {
	InnerBlocks,
} from '@wordpress/editor';

export default [
	{
		attributes: blockAttributes,

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
