'use strict';

import {
	InnerBlocks,
} from '@wordpress/editor';

export default [
	{
		save() {
			return (
				<div className="smb-accordion">
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];
