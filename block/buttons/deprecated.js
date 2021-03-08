import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
			textAlign: {
				type: 'string',
			},
		},

		supports: {
			align: [ 'left', 'right' ],
		},

		save( { attributes, className } ) {
			const { textAlign } = attributes;

			const classes = classnames( 'smb-buttons', className, {
				[ `has-text-align-${ textAlign }` ]: textAlign,
			} );

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<InnerBlocks.Content />
				</div>
			);
		},

		migrate( attributes ) {
			return {
				...attributes,
				contentJustification: attributes.textAlign,
			};
		},
	},
];
