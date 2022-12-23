import classnames from 'classnames';

import {
	RichText,
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
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const { title, numberColor } = attributes;

			const classes = classnames( 'smb-step__item', className );

			const itemNumberStyles = {
				backgroundColor: numberColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<div className="smb-step__item__title">
						<div
							className="smb-step__item__number"
							style={ itemNumberStyles }
						/>
						<RichText.Content tagName="span" value={ title } />
					</div>

					<div className="smb-step__item__body">
						<div
							{ ...useInnerBlocksProps.save( {
								className: 'smb-step__item__summary',
							} ) }
						/>
					</div>
				</div>
			);
		},
	},
];
