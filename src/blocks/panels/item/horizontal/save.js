import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

export default function ( { attributes } ) {
	const {
		titleTagName,
		title,
		summary,
		displayLink,
		rel,
		linkLabel,
		linkURL,
		linkTarget,
		displayImage,
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
	} = attributes;

	const isHrefSet = !! linkURL;

	const colorProps = getColorClassesAndStyles( {
		style: {
			color: {
				...attributes?.style?.color,
			},
		},
		backgroundColor: attributes?.backgroundColor || undefined,
		textColor: attributes?.textColor || undefined,
		gradient: attributes?.gradient || undefined,
	} );

	const classes = 'c-row__col';

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--horizontal',
		colorProps?.className,
		{
			'smb-panels__item--reverse': 'right' === imagePosition,
		}
	);

	const itemStyles = colorProps?.style;

	const actionClasses = classnames( 'smb-panels__item__action', {
		'smb-panels__item__action--nolabel': ! displayLink,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ itemClasses } style={ itemStyles }>
				{ displayImage && (
					<div className="smb-panels__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							width={ !! imageWidth && imageWidth }
							height={ !! imageHeight && imageHeight }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
				) }

				<div className="smb-panels__item__body">
					{ ! RichText.isEmpty( title ) &&
						'none' !== titleTagName && (
							<RichText.Content
								tagName={ titleTagName }
								className="smb-panels__item__title"
								value={ title }
							/>
						) }

					{ ! RichText.isEmpty( summary ) && (
						<div className="smb-panels__item__content">
							<RichText.Content value={ summary } />
						</div>
					) }

					{ ( isHrefSet || displayLink ) && (
						<div className={ actionClasses }>
							<a
								href={ linkURL }
								target={ linkTarget }
								rel={ rel }
							>
								{ displayLink ? (
									<div className="smb-panels__item__link">
										<RichText.Content value={ linkLabel } />
									</div>
								) : (
									<div className="smb-panels__item__link screen-reader-text">
										{ linkLabel ||
											__(
												'Learn more',
												'snow-monkey-blocks'
											) }
									</div>
								) }
							</a>
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
