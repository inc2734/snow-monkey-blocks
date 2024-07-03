import classnames from 'classnames';

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
			textAlign: {
				type: 'string',
			},
			contentJustification: {
				type: 'string',
			},
		},

		supports: {
			...blockSupports,
		},

		isEligible: ( attributes ) => !! attributes.contentJustification,

		migrate( attributes ) {
			const newAttributes = {
				...attributes,
				layout: {
					...attributes?.layout,
					type: 'flex',
					justifyContent:
						attributes?.contentJustification || undefined,
				},
			};
			return newAttributes;
		},

		save( { attributes, className } ) {
			const { contentJustification } = attributes;

			const classes = classnames( 'smb-buttons', className, {
				[ `is-content-justification-${ contentJustification }` ]:
					contentJustification,
			} );

			return (
				<div
					{ ...useInnerBlocksProps.save(
						useBlockProps.save( { className: classes } )
					) }
				/>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			textAlign: {
				type: 'string',
			},
			contentJustification: {
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
