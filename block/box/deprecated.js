import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
			const {
				backgroundColor,
				borderColor,
				textColor,
				borderWidth,
			} = attributes;

			const boxStyles = {
				backgroundColor: backgroundColor || undefined,
				borderColor: borderColor || undefined,
				color: textColor || undefined,
				borderWidth: borderWidth || undefined,
			};

			const classes = classnames( 'smb-box', className );

			return (
				<div className={ classes } style={ boxStyles }>
					<div className="smb-box__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
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
