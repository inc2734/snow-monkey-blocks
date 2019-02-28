'use strict';

const { InnerBlocks } = wp.editor;

export const deprecated = [
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
