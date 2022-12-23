import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { title, numberColor } = attributes;

	const classes = classnames( 'smb-step__item', className );

	const styles = {
		'--smb-step--number-background-color': numberColor || undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: classes, style: styles } ) }>
			<div className="smb-step__item__title">
				<div className="smb-step__item__number" />
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
}
