import { isEmpty } from 'lodash';
import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetGapCSSValue as getGapCSSValue,
} from '@wordpress/block-editor';

import { getColumnSize } from '@smb/helper';

export default function ( { attributes, className } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		textColor,
		titleTagName,
		title,
		mediaId,
		mediaUrl,
		mediaAlt,
		mediaWidth,
		mediaHeight,
		caption,
		mediaPosition,
		verticalAlignment,
		mediaColumnSize,
		mobileOrder,
		href,
		linkTarget,
		rel,
		linkClass,
		mediaType,
		imageFill,
		focalPoint,
		splitPoint,
	} = attributes;

	const isFill = 'image' === mediaType && imageFill;

	const newRel = isEmpty( rel ) ? undefined : rel;

	const { textColumnWidth, mediaColumnWidth } =
		getColumnSize( mediaColumnSize );

	const classes = classnames( 'smb-media-text', className, {
		'smb-media-text--has-background':
			!! backgroundColor || !! backgroundGradientColor,
		[ `smb-media-text--mobile-${ mobileOrder }` ]: !! mobileOrder,
	} );

	const rowClasses = classnames( 'c-row', {
		'c-row--reverse': 'left' === mediaPosition,
		'c-row--top': ! isFill && 'top' === verticalAlignment,
		'c-row--middle': ! isFill && 'center' === verticalAlignment,
		'c-row--bottom': ! isFill && 'bottom' === verticalAlignment,
		'c-row--fill': isFill,
	} );

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--${ splitPoint }-${ textColumnWidth }`,
	] );

	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--${ splitPoint }-${ mediaColumnWidth }`,
	] );

	const image = (
		<img
			src={ mediaUrl }
			alt={ mediaAlt }
			width={ !! mediaWidth && mediaWidth }
			height={ !! mediaHeight && mediaHeight }
			className={ `wp-image-${ mediaId }` }
		/>
	);

	const video = (
		<video
			controls
			src={ mediaUrl }
			width={ !! mediaWidth && mediaWidth }
			height={ !! mediaHeight && mediaHeight }
		/>
	);

	let figure;
	if ( !! mediaUrl ) {
		if ( 'image' === mediaType || undefined === mediaType ) {
			if ( !! href ) {
				figure = (
					<a
						href={ href }
						target={ linkTarget }
						className={ linkClass }
						rel={ newRel }
					>
						{ image }
					</a>
				);
			} else {
				figure = image;
			}
		} else if ( 'video' === mediaType ) {
			figure = video;
		}
	}

	return (
		<div
			{ ...useBlockProps.save( {
				className: classes,
				style: {
					'--smb-media-text--background-color': backgroundColor,
					'--smb-media-text--background-image':
						backgroundGradientColor,
					'--smb-media-text--color': textColor,
					'--smb-media-text--image-position-x':
						isFill && !! focalPoint?.x
							? `${ focalPoint.x * 100 }%`
							: undefined,
					'--smb-media-text--image-position-y':
						isFill && !! focalPoint?.y
							? `${ focalPoint.y * 100 }%`
							: undefined,
					'--smb-media-text--gap':
						getGapCSSValue(
							attributes?.style?.spacing?.blockGap
						) || undefined,
				},
				'data-sm-split-point': splitPoint,
			} ) }
		>
			<div className={ rowClasses }>
				<div className={ textColumnClasses }>
					<div className="smb-media-text__contents-wrapper">
						{ ! RichText.isEmpty( title ) &&
							'none' !== titleTagName && (
								<RichText.Content
									className="smb-media-text__title"
									tagName={ titleTagName }
									value={ title }
								/>
							) }

						<div
							{ ...useInnerBlocksProps.save( {
								className: 'smb-media-text__body',
							} ) }
						/>
					</div>
				</div>

				<div className={ imageColumnClasses }>
					<div
						className={ classnames( 'smb-media-text__figure', {
							'smb-media-text__figure--fill': isFill,
						} ) }
					>
						{ figure }
					</div>

					{ ! RichText.isEmpty( caption ) && (
						<RichText.Content
							tagName="div"
							className="smb-media-text__caption"
							value={ caption }
						/>
					) }
				</div>
			</div>
		</div>
	);
}
