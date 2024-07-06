import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import {
	generateStylesForSectionBackground,
	SectionBackground,
} from '../section/components/background';

import { Save as Header } from '../section/components/header';

export default function ( { attributes, className } ) {
	const {
		align,

		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageMediaType,
		textColor,
		imagePosition,
		imageSize,
		imageMatchHeight,
		verticalAlignment,
		contentSize,
		contentHorizontalPosition,
		contentVerticalPosition,
		contentBackgroundColor,
		contentBackgroundOpacity,
		contentPadding,
		removeContentOutsidePadding,
		shadowColor,
		shadowHorizontalPosition,
		shadowVerticalPosition,
		maskColor,
		maskGradientColor,
		maskOpacity,
		mobileOrder,
		contentsAlignment,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		containerAlign,
		disableContainerPadding,

		backgroundHorizontalPosition,
		backgroundVerticalPosition,
		isBackgroundNoOver,
		backgroundColor,
		backgroundGradientColor,
		backgroundTexture,
		backgroundTextureOpacity,
		backgroundTextureUrl,
		fixedBackgroundColor,
		fixedBackgroundGradientColor,
		fixedBackgroundTexture,
		fixedBackgroundTextureOpacity,
		fixedBackgroundTextureUrl,
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

	const isAvailableVerticalAlignment = [ 'right', 'left' ].includes(
		imagePosition
	);

	const isNowrapWhenMobile =
		'nowrap' === mobileOrder && isAvailableVerticalAlignment;

	const TagName = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-break-the-grid',
		`smb-section-break-the-grid--${ imagePosition }`,
		{
			[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
				contentVerticalPosition &&
				verticalAlignment &&
				'center' !== verticalAlignment &&
				isAvailableVerticalAlignment,
			[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]:
				!! mobileOrder && isAvailableVerticalAlignment,
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ `smb-section--top-divider-no-overlay` ]: ! topDividerOverlay,
			[ `smb-section--bottom-divider-no-overlay` ]:
				! bottomDividerOverlay,
			[ className ]: !! className,
			[ `smb-section-break-the-grid--match-height` ]:
				imageMatchHeight && isAvailableVerticalAlignment,
		}
	);

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

	const rowClasses = classnames( 'c-row', {
		'c-row--lg-top':
			'top' === verticalAlignment && isAvailableVerticalAlignment,
		'c-row--lg-middle':
			'center' === verticalAlignment && isAvailableVerticalAlignment,
		'c-row--lg-bottom':
			'bottom' === verticalAlignment && isAvailableVerticalAlignment,
	} );

	const textColumnClasses = classnames( 'c-row__col', {
		'c-row__col--1-1': ! isNowrapWhenMobile,
		'c-row__col--1-2': isNowrapWhenMobile,
		'c-row__col--lg-1-2':
			isAvailableVerticalAlignment && ! isNowrapWhenMobile,
	} );
	const imageColumnClasses = classnames( 'c-row__col', {
		'c-row__col--1-1': ! isNowrapWhenMobile,
		'c-row__col--1-2': isNowrapWhenMobile,
		'c-row__col--lg-1-2':
			isAvailableVerticalAlignment && ! isNowrapWhenMobile,
	} );

	const figureClasses = classnames( 'smb-section-break-the-grid__figure', {
		[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]:
			!! imageSize,
	} );

	const contentClasses = classnames( 'smb-section-break-the-grid__content', {
		[ `smb-section-break-the-grid__content--w-${ contentSize }` ]:
			!! contentSize,
		[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]:
			!! contentPadding,
		[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]:
			!! contentHorizontalPosition,
		[ `smb-section-break-the-grid__content--${ contentsAlignment }` ]:
			!! contentsAlignment,
		'smb-section-break-the-grid__content--remove-outside-p':
			contentPadding && removeContentOutsidePadding,
	} );

	const bodyClasses = classnames(
		'smb-section__body',
		'smb-section-break-the-grid__body'
	);

	const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

	const maskClasses = classnames( 'smb-section-break-the-grid__mask' );

	const styles = {
		'--smb-section--color': textColor || undefined,
		'--smb-section-break-the-grid--shadow-color': shadowColor || undefined,
		'--smb-section-break-the-grid--shadow-transform':
			!! shadowHorizontalPosition && !! shadowVerticalPosition
				? `translate(${ shadowHorizontalPosition || 0 }%, ${
						shadowVerticalPosition || 0
				  }%)`
				: undefined,
		'--smb-section-break-the-grid--content-background-color':
			contentBackgroundColor &&
			hexToRgba( contentBackgroundColor, contentBackgroundOpacity ),
		'--smb-section-break-the-grid--mask-color': maskColor || undefined,
		'--smb-section-break-the-grid--mask-image':
			maskGradientColor || undefined,
		'--smb-section-break-the-grid--mask-opacity':
			!! maskColor || !! maskGradientColor ? maskOpacity : undefined,
		...generateStylesForSectionBackground( {
			backgroundHorizontalPosition,
			backgroundVerticalPosition,
			isBackgroundNoOver,
			backgroundColor,
			backgroundGradientColor,
			backgroundTexture,
			backgroundTextureOpacity,
			backgroundTextureUrl,
			fixedBackgroundColor,
			fixedBackgroundGradientColor,
			fixedBackgroundTexture,
			fixedBackgroundTextureOpacity,
			fixedBackgroundTextureUrl,
			topDividerVerticalPosition,
			topDividerLevel,
			bottomDividerVerticalPosition,
			bottomDividerLevel,
			backgroundText,
		} ),
	};

	const image = (
		<img
			src={ imageURL }
			alt={ imageAlt }
			width={ !! imageWidth && imageWidth }
			height={ !! imageHeight && imageHeight }
			className={ `wp-image-${ imageID }` }
		/>
	);

	const video = (
		<video
			playsInline
			loop
			autoPlay
			muted
			src={ imageURL }
			width={ !! imageWidth && imageWidth }
			height={ !! imageHeight && imageHeight }
		/>
	);

	let figure;
	if ( !! imageURL ) {
		if ( 'image' === imageMediaType || undefined === imageMediaType ) {
			figure = image;
		} else if ( 'video' === imageMediaType ) {
			figure = video;
		}
	}

	return (
		<TagName
			{ ...useBlockProps.save( {
				className: classes,
				style: styles,
			} ) }
		>
			<SectionBackground
				{ ...{
					backgroundColor,
					backgroundGradientColor,
					backgroundTexture,
					fixedBackgroundColor,
					fixedBackgroundGradientColor,
					fixedBackgroundTexture,
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

			<div className="smb-section__inner">
				<div className={ containerClasses }>
					<div className="smb-section__contents-wrapper smb-section-break-the-grid__contents-wrapper">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div className={ contentClasses }>
									<Header
										{ ...{
											title,
											titleTagName,
											subtitle,
											lede,
										} }
										className="smb-section-break-the-grid"
									/>

									<div
										{ ...useInnerBlocksProps.save( {
											className: bodyClasses,
										} ) }
									/>
								</div>
							</div>
							<div className={ imageColumnClasses }>
								<div className={ figureClasses }>
									{ shadowColor && (
										<div className={ shadowClasses } />
									) }

									{ 0 <
										Number(
											( 1 - maskOpacity ).toFixed( 1 )
										) && <div className={ maskClasses } /> }

									{ figure }
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</TagName>
	);
}
