import classnames from 'classnames';

import { rawHandler } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;
const blockSupprts = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
			content: {
				type: 'string',
				source: 'html',
				selector: 'ul',
				multiline: 'li',
				default: '',
			},
		},

		supports: {
			...blockSupprts,
		},

		migrate( attributes ) {
			const { content } = attributes;

			const list = document.createElement( 'ul' );
			list.innerHTML = content;
			const [ listBlock ] = rawHandler( { HTML: list.outerHTML } );

			return [ { ...attributes }, [ ...listBlock.innerBlocks ] ];
		},

		save( { attributes, className } ) {
			const { content, icon, iconColor } = attributes;

			const classes = classnames( 'smb-list', className );

			return (
				<div
					{ ...useBlockProps.save( { className: classes } ) }
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
	{
		attributes: {
			...blockAttributes,
			content: {
				type: 'string',
				source: 'html',
				selector: 'ul',
				multiline: 'li',
				default: '',
			},
		},

		supports: {
			...blockSupprts,
		},

		migrate( attributes ) {
			const { content } = attributes;

			const list = document.createElement( 'ul' );
			list.innerHTML = content;
			const [ listBlock ] = rawHandler( { HTML: list.outerHTML } );

			return [ { ...attributes }, [ ...listBlock.innerBlocks ] ];
		},

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
