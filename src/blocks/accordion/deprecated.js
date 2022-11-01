import { InnerBlocks } from '@wordpress/block-editor';

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
