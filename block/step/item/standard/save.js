import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		title,
		numberColor,
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		linkLabel,
		linkURL,
		linkTarget,
		linkColor,
	} = attributes;

	const classes = classnames(
		'smb-step__item',
		`smb-step__item--image-${ imagePosition }`,
		className
	);

	const itemNumberStyles = {
		backgroundColor: numberColor || undefined,
	};

	const itemLinkStyles = {
		color: linkColor || undefined,
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
				{ !! imageURL && (
					<div className="smb-step__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							width={ !! imageWidth && imageWidth }
							height={ !! imageHeight && imageHeight }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
				) }

				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-step__item__summary',
					} ) }
				/>

				{ ! RichText.isEmpty( linkLabel ) && (
					<a
						className="smb-step__item__link"
						href={ linkURL }
						style={ itemLinkStyles }
						target={
							'_self' === linkTarget ? undefined : linkTarget
						}
						rel={
							'_self' === linkTarget
								? undefined
								: 'noopener noreferrer'
						}
					>
						<i className="fas fa-arrow-circle-right" />
						<RichText.Content
							tagName="span"
							className="smb-step__item__link__label"
							value={ linkLabel }
						/>
					</a>
				) }
			</div>
		</div>
	);
}
