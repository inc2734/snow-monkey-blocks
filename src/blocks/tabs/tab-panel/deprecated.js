import classnames from 'classnames';
import metadata from './block.json';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
			tabPanelId: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-tab-panel',
				attribute: 'id',
				default: '',
			},
		},

		supports: {
			...blockSupports,
			anchor: false,
		},

		migrate( attributes ) {
			const newAttributes = { ...attributes };

			if ( ! newAttributes?.anchor && !! newAttributes.tabPanelId ) {
				newAttributes.anchor = newAttributes?.tabPanelId;
			}

			return newAttributes;
		},

		save( { attributes, className } ) {
			const { tabPanelId, ariaHidden } = attributes;

			const classes = classnames( 'smb-tab-panel', className );

			return (
				<div
					{ ...useBlockProps.save( { className: classes } ) }
					id={ tabPanelId }
					aria-hidden={ ariaHidden }
					role="tabpanel"
				>
					<div
						{ ...useInnerBlocksProps.save( {
							className: 'smb-tab-panel__body',
						} ) }
					/>
				</div>
			);
		},
	},
];
