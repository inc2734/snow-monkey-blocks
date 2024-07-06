import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import {
	generateStylesForSectionBackground,
	SectionBackground,
} from '../section/components/background';

import { Save as Header } from '../section/components/header';

export default function ( { attributes, className } ) {
	const {
		align,

		lgImageID,
		lgImageURL,
		lgImageAlt,
		lgImageWidth,
		lgImageHeight,
		lgImageMediaType,
		lgImageRepeat,
		lgFocalPoint,
		mdImageID,
		mdImageURL,
		mdImageAlt,
		mdImageWidth,
		mdImageHeight,
		mdImageMediaType,
		mdImageRepeat,
		mdFocalPoint,
		smImageID,
		smImageURL,
		smImageAlt,
		smImageWidth,
		smImageHeight,
		smImageMediaType,
		smImageRepeat,
		smFocalPoint,
		contentsAlignment,
		maskColor,
		maskGradientColor,
		maskOpacity,
		textColor,
		parallax,
		contentJustification,
		itemsAlignment,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		height,
		disableCustomHeight,
		containerAlign,
		disableContainerPadding,
		contentsMaxWidth,
		isSlim,

		topDividerType,
		topDividerLevel,
		topDividerColor,
		topDividerVerticalPosition,
		topDividerOverlay,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
		bottomDividerVerticalPosition,
		bottomDividerOverlay,
		backgroundText,
	} = attributes;

	const TagName = wrapperTagName;

	const isItemsAlignmentable = 'fit' !== height;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		className,
		{
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ `smb-section--${ height }` ]: !! height && disableCustomHeight,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
			[ `smb-section--top-divider-no-overlay` ]: ! topDividerOverlay,
			[ `smb-section--bottom-divider-no-overlay` ]:
				! bottomDividerOverlay,
			'js-bg-parallax': !! parallax,
		}
	);

	const bgimageClasses = classnames( 'smb-section-with-bgimage__bgimage', {
		'js-bg-parallax__bgimage': !! parallax,
	} );

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]:
			!! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull:
			( 'full' === containerAlign ||
				'contents-full' === containerAlign ) &&
			'full' === align,
		alignwide:
			'wide' === containerAlign ||
			( 'contents-wide' === containerAlign && 'full' === align ),
		'c-container--no-padding': disableContainerPadding,
	} );

	let headerContainerClasses = containerClasses
		.replace( 'c-container--no-padding', '' )
		.trim();
	if (
		'contents-wide' === containerAlign ||
		'contents-full' === containerAlign
	) {
		headerContainerClasses = headerContainerClasses
			.replace( 'alignfull', '' )
			.replace( 'alignwide', '' )
			.trim();
	}

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			[ `smb-section__contents-wrapper--${ contentsAlignment }` ]:
				!! contentsAlignment,
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const hasMask = 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) );

	const isLgVideo = 'video' === lgImageMediaType;
	const isLgImage =
		'image' === lgImageMediaType || undefined === lgImageMediaType;
	const hasLgBackground = !! lgImageURL;
	const lgPointValue =
		lgFocalPoint && ! parallax
			? `${ lgFocalPoint.x * 100 }% ${ lgFocalPoint.y * 100 }%`
			: undefined;

	const isMdVideo = 'video' === mdImageMediaType;
	const isMdImage =
		'image' === mdImageMediaType || undefined === mdImageMediaType;
	const hasMdBackground = !! mdImageURL;
	const mdPointValue =
		mdFocalPoint && ! parallax
			? `${ mdFocalPoint.x * 100 }% ${ mdFocalPoint.y * 100 }%`
			: undefined;

	const isSmVideo = 'video' === smImageMediaType;
	const isSmImage =
		'image' === smImageMediaType || undefined === smImageMediaType;
	const hasSmBackground = !! smImageURL;
	const smPointValue =
		smFocalPoint && ! parallax
			? `${ smFocalPoint.x * 100 }% ${ smFocalPoint.y * 100 }%`
			: undefined;

	const styles = {
		'--smb-section--color': textColor || undefined,
		'--smb-section--contents-wrapper-width':
			!! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
		'--smb-section--min-height':
			!! height && ! disableCustomHeight ? height : undefined,
		'--smb-section-with-bgimage--mask-color': maskColor || undefined,
		'--smb-section-with-bgimage--mask-image':
			maskGradientColor || undefined,
		'--smb-section-with-bgimage--mask-opacity': String( maskOpacity ),
		'--smb-section-with-bgimage--lg-media-position': lgPointValue,
		'--smb-section-with-bgimage--lg-repeatable-image':
			lgImageRepeat && !! lgImageURL ? `url(${ lgImageURL })` : undefined,
		'--smb-section-with-bgimage--md-media-position': mdPointValue,
		'--smb-section-with-bgimage--md-repeatable-image':
			mdImageRepeat && !! mdImageURL ? `url(${ mdImageURL })` : undefined,
		'--smb-section-with-bgimage--sm-media-position': smPointValue,
		'--smb-section-with-bgimage--sm-repeatable-image':
			smImageRepeat && !! smImageURL ? `url(${ smImageURL })` : undefined,
		...generateStylesForSectionBackground( {
			topDividerVerticalPosition,
			topDividerLevel,
			bottomDividerVerticalPosition,
			bottomDividerLevel,
			backgroundText,
		} ),
	};

	return (
		<TagName
			{ ...useBlockProps.save( {
				className: classes,
				style: styles,
			} ) }
		>
			{ hasLgBackground && (
				<div
					className={ classnames(
						bgimageClasses,
						'smb-section-with-bgimage__bgimage--lg'
					) }
				>
					{ hasMask && (
						<div className="smb-section-with-bgimage__mask" />
					) }

					{ isLgImage &&
						( lgImageRepeat ? (
							<div className="smb-section-with-bgimage__repeatable-image">
								<img
									src={ lgImageURL }
									alt={ lgImageAlt }
									width={ lgImageWidth }
									height={ lgImageHeight }
									className={ `wp-image-${ lgImageID }` }
								/>
							</div>
						) : (
							<img
								src={ lgImageURL }
								alt={ lgImageAlt }
								width={ lgImageWidth }
								height={ lgImageHeight }
								className={ `wp-image-${ lgImageID }` }
							/>
						) ) }

					{ isLgVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ lgImageURL }
							width={ lgImageWidth }
							height={ lgImageHeight }
						/>
					) }
				</div>
			) }

			{ hasMdBackground && (
				<div
					className={ classnames(
						bgimageClasses,
						'smb-section-with-bgimage__bgimage--md'
					) }
				>
					{ hasMask && (
						<div className="smb-section-with-bgimage__mask" />
					) }

					{ isMdImage &&
						( mdImageRepeat ? (
							<div className="smb-section-with-bgimage__repeatable-image">
								<img
									src={ mdImageURL }
									alt={ mdImageAlt }
									width={ mdImageWidth }
									height={ mdImageHeight }
									className={ `wp-image-${ mdImageID }` }
								/>
							</div>
						) : (
							<img
								src={ mdImageURL }
								alt={ mdImageAlt }
								width={ mdImageWidth }
								height={ mdImageHeight }
								className={ `wp-image-${ mdImageID }` }
							/>
						) ) }

					{ isMdVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ mdImageURL }
							width={ mdImageWidth }
							height={ mdImageHeight }
						/>
					) }
				</div>
			) }

			{ hasSmBackground && (
				<div
					className={ classnames(
						bgimageClasses,
						'smb-section-with-bgimage__bgimage--sm'
					) }
				>
					{ hasMask && (
						<div className="smb-section-with-bgimage__mask" />
					) }

					{ isSmImage &&
						( smImageRepeat ? (
							<div className="smb-section-with-bgimage__repeatable-image">
								<img
									src={ smImageURL }
									alt={ smImageAlt }
									width={ smImageWidth }
									height={ smImageHeight }
									className={ `wp-image-${ smImageID }` }
								/>
							</div>
						) : (
							<img
								src={ smImageURL }
								alt={ smImageAlt }
								width={ smImageWidth }
								height={ smImageHeight }
								className={ `wp-image-${ smImageID }` }
							/>
						) ) }

					{ isSmVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ smImageURL }
							width={ smImageWidth }
							height={ smImageHeight }
						/>
					) }
				</div>
			) }

			<SectionBackground
				{ ...{
					topDividerType,
					topDividerLevel,
					topDividerColor,
					bottomDividerType,
					bottomDividerLevel,
					bottomDividerColor,
					backgroundText,
					containerClasses,
				} }
			/>

			<div className={ innerClasses }>
				<div className={ containerClasses }>
					<div className={ contentsWrapperClasses }>
						<Header
							{ ...{
								title,
								titleTagName,
								subtitle,
								lede,
								hasContainer:
									( disableContainerPadding &&
										'full' === containerAlign &&
										'full' === align ) ||
									'contents-wide' === containerAlign ||
									'contents-full' === containerAlign,
								containerClassName: headerContainerClasses,
							} }
						/>

						<div
							{ ...useInnerBlocksProps.save( {
								className: 'smb-section__body',
							} ) }
						/>
					</div>
				</div>
			</div>
		</TagName>
	);
}
