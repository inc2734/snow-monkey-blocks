import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import { SectionBackground } from '../section/components/background';
import { Save as Header } from '../section/components/header';

import { generateSpacingProperties } from '@smb/helper';

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
		maskOpacity,
		mobileOrder,
		contentsAlignment,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		containerAlign,
		padding,

		backgroundHorizontalPosition,
		backgroundVerticalPosition,
		isBackgroundNoOver,
		backgroundColor,
		backgroundGradientColor,
		backgroundTexture,
		backgroundTextureOpacity,
		fixedBackgroundColor,
		fixedBackgroundGradientColor,
		fixedBackgroundTexture,
		fixedBackgroundTextureOpacity,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		topDividerVerticalPosition,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
		bottomDividerVerticalPosition,
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
			[ className ]: !! className,
			[ `smb-section-break-the-grid--match-height` ]:
				imageMatchHeight && isAvailableVerticalAlignment,
		}
	);

	const containerClasses = classnames( 'c-container', {
		alignfull: 'full' === containerAlign && 'full' === align,
		alignwide: 'wide' === containerAlign && 'full' === align,
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
		[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
	} );

	const contentClasses = classnames( 'smb-section-break-the-grid__content', {
		[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
		[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
		[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
		[ `smb-section-break-the-grid__content--${ contentsAlignment }` ]: !! contentsAlignment,
		'smb-section-break-the-grid__content--remove-outside-p':
			contentPadding && removeContentOutsidePadding,
	} );

	const bodyClasses = classnames(
		'smb-section__body',
		'smb-section-break-the-grid__body'
	);

	const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

	const maskClasses = classnames( 'smb-section-break-the-grid__mask' );

	const sectionStyles = {
		color: textColor || undefined,
		...generateSpacingProperties( padding ),
	};

	const shadowStyles = {};
	if ( shadowColor ) {
		shadowStyles.backgroundColor = shadowColor;
	}
	if ( shadowHorizontalPosition || shadowVerticalPosition ) {
		shadowStyles.transform = `translate(${
			shadowHorizontalPosition || 0
		}%, ${ shadowVerticalPosition || 0 }%)`;
	}

	const contentStyles = {
		backgroundColor:
			contentBackgroundColor &&
			hexToRgba( contentBackgroundColor, contentBackgroundOpacity ),
	};

	const maskStyles = {};
	if ( maskColor ) {
		maskStyles.backgroundColor = maskColor;
	}

	const figureStyles = {
		opacity: !! maskColor ? maskOpacity : undefined,
	};

	const image = (
		<img
			src={ imageURL }
			alt={ imageAlt }
			width={ !! imageWidth && imageWidth }
			height={ !! imageHeight && imageHeight }
			className={ `wp-image-${ imageID }` }
			style={ figureStyles }
		/>
	);

	const video = (
		<video
			controls
			src={ imageURL }
			width={ !! imageWidth && imageWidth }
			height={ !! imageHeight && imageHeight }
			style={ figureStyles }
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
				style: sectionStyles,
			} ) }
		>
			<SectionBackground
				{ ...{
					backgroundHorizontalPosition,
					backgroundVerticalPosition,
					isBackgroundNoOver,
					backgroundColor,
					backgroundGradientColor,
					backgroundTexture,
					backgroundTextureOpacity,
					fixedBackgroundColor,
					fixedBackgroundGradientColor,
					fixedBackgroundTexture,
					fixedBackgroundTextureOpacity,
					topDividerType,
					topDividerLevel,
					topDividerColor,
					topDividerVerticalPosition,
					bottomDividerType,
					bottomDividerLevel,
					bottomDividerColor,
					bottomDividerVerticalPosition,
					backgroundText,
					containerClasses,
				} }
			/>

			<div className="smb-section__inner">
				<div className={ containerClasses }>
					<div className="smb-section__contents-wrapper smb-section-break-the-grid__contents-wrapper">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div
									className={ contentClasses }
									style={ contentStyles }
								>
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
										<div
											className={ shadowClasses }
											style={ shadowStyles }
										/>
									) }

									{ 0 <
										Number(
											( 1 - maskOpacity ).toFixed( 1 )
										) && (
										<div
											className={ maskClasses }
											style={ maskStyles }
										/>
									) }

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
