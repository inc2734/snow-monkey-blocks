import classnames from 'classnames';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
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
				<span>
					<RichText.Content value={ title } />
				</span>
			</div>

			<div className="smb-step__item__body">
				<div className="smb-step__item__summary">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
