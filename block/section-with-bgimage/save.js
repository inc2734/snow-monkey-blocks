import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import { SectionBackground } from '../section/components/background';
import { Save as Header } from '../section/components/header';

export default function ( { attributes, className } ) {
	const {
		align,

		lgImageID,
		lgImageURL,
		lgImageAlt,
		lgImageMediaType,
		lgImageRepeat,
		lgFocalPoint,
		mdImageID,
		mdImageURL,
		mdImageAlt,
		mdImageMediaType,
		mdImageRepeat,
		mdFocalPoint,
		smImageID,
		smImageURL,
		smImageAlt,
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
		containerAlign,
		disableContainerPadding,
		contentsMaxWidth,
		isSlim,

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
			[ `smb-section--${ height }` ]: !! height,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
			'js-bg-parallax': !! parallax,
		}
	);

	const bgimageClasses = classnames( 'smb-section-with-bgimage__bgimage', {
		'js-bg-parallax__bgimage': !! parallax,
	} );

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]: !! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull:
			( 'full' === containerAlign ||
				'contents-full' === containerAlign ) &&
			'full' === align,
		alignwide:
			'wide' === containerAlign ||
			( 'contents-wide' === containerAlign && 'full' === align ),
		'c-container--no-padding':
			disableContainerPadding &&
			( 'full' === containerAlign ||
				'contents-full' === containerAlign ) &&
			'full' === align,
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
			[ `smb-section__contents-wrapper--${ contentsAlignment }` ]: !! contentsAlignment,
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

	const sectionStyles = {
		color: textColor || undefined,
	};

	const maskStyles = {};
	if ( maskColor || maskGradientColor ) {
		maskStyles.backgroundColor = maskColor;
		maskStyles.backgroundImage = maskGradientColor;
	}

	const lgVideoStyles = {
		opacity: maskOpacity,
		objectPosition: lgPointValue,
	};

	const norepeatableLgImageStyles = {
		opacity: maskOpacity,
		objectPosition: lgPointValue,
	};

	const repeatableLgImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ lgImageURL } )`,
		backgroundPosition: lgPointValue,
	};

	const mdVideoStyles = {
		opacity: maskOpacity,
		objectPosition: mdPointValue,
	};

	const norepeatableMdImageStyles = {
		opacity: maskOpacity,
		objectPosition: mdPointValue,
	};

	const repeatableMdImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ mdImageURL } )`,
		backgroundPosition: mdPointValue,
	};

	const smVideoStyles = {
		opacity: maskOpacity,
		objectPosition: smPointValue,
	};

	const norepeatableSmImageStyles = {
		opacity: maskOpacity,
		objectPosition: smPointValue,
	};

	const repeatableSmImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ smImageURL } )`,
		backgroundPosition: smPointValue,
	};

	const innerStyles = {};

	const contentsWrapperStyles = {
		width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	};

	return (
		<TagName
			{ ...useBlockProps.save( {
				className: classes,
				style: sectionStyles,
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
						<div
							className="smb-section-with-bgimage__mask"
							style={ maskStyles }
						/>
					) }

					{ isLgImage &&
						( lgImageRepeat ? (
							<div
								className="smb-section-with-bgimage__repeatable-image"
								style={ repeatableLgImageStyles }
							>
								<img
									src={ lgImageURL }
									alt={ lgImageAlt }
									className={ `wp-image-${ lgImageID }` }
									style={ norepeatableLgImageStyles }
								/>
							</div>
						) : (
							<img
								src={ lgImageURL }
								alt={ lgImageAlt }
								className={ `wp-image-${ lgImageID }` }
								style={ norepeatableLgImageStyles }
							/>
						) ) }

					{ isLgVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ lgImageURL }
							style={ lgVideoStyles }
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
						<div
							className="smb-section-with-bgimage__mask"
							style={ maskStyles }
						/>
					) }

					{ isMdImage &&
						( mdImageRepeat ? (
							<div
								className="smb-section-with-bgimage__repeatable-image"
								style={ repeatableMdImageStyles }
							>
								<img
									src={ mdImageURL }
									alt={ mdImageAlt }
									className={ `wp-image-${ mdImageID }` }
									style={ norepeatableMdImageStyles }
								/>
							</div>
						) : (
							<img
								src={ mdImageURL }
								alt={ mdImageAlt }
								className={ `wp-image-${ mdImageID }` }
								style={ norepeatableMdImageStyles }
							/>
						) ) }

					{ isMdVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ mdImageURL }
							style={ mdVideoStyles }
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
						<div
							className="smb-section-with-bgimage__mask"
							style={ maskStyles }
						/>
					) }

					{ isSmImage &&
						( smImageRepeat ? (
							<div
								className="smb-section-with-bgimage__repeatable-image"
								style={ repeatableSmImageStyles }
							>
								<img
									src={ smImageURL }
									alt={ smImageAlt }
									className={ `wp-image-${ smImageID }` }
									style={ norepeatableSmImageStyles }
								/>
							</div>
						) : (
							<img
								src={ smImageURL }
								alt={ smImageAlt }
								className={ `wp-image-${ smImageID }` }
								style={ norepeatableSmImageStyles }
							/>
						) ) }

					{ isSmVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ smImageURL }
							style={ smVideoStyles }
						/>
					) }
				</div>
			) }

			<SectionBackground
				{ ...{
					backgroundText,
					containerClasses,
				} }
			/>

			<div className={ innerClasses } style={ innerStyles }>
				<div className={ containerClasses }>
					<div
						className={ contentsWrapperClasses }
						style={ contentsWrapperStyles }
					>
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
