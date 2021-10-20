import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageMediaType,
		textColor,
		imagePosition,
		imageSize,
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
		containerAlign,
	} = attributes;

	const isAvailableVerticalAlignment = [ 'right', 'left' ].includes(
		imagePosition
	);

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
		}
	);

	const containerClasses = classnames( 'c-container', {
		alignfull: 'full' === containerAlign,
		alignwide: 'wide' === containerAlign,
	} );

	const rowClasses = classnames( 'c-row', {
		'c-row--margin': isAvailableVerticalAlignment,
		'c-row--lg-top':
			'top' === verticalAlignment && isAvailableVerticalAlignment,
		'c-row--lg-middle':
			'center' === verticalAlignment && isAvailableVerticalAlignment,
		'c-row--lg-bottom':
			'bottom' === verticalAlignment && isAvailableVerticalAlignment,
	} );

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', {
		'c-row__col--lg-1-2': isAvailableVerticalAlignment,
	} );
	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', {
		'c-row__col--lg-1-2': isAvailableVerticalAlignment,
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

	const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

	const maskClasses = classnames( 'smb-section-break-the-grid__mask' );

	const hasTitle = ! RichText.isEmpty( title ) && 'none' !== titleTagName;
	const hasSubTitle = ! RichText.isEmpty( subtitle );
	const hasLede = ! RichText.isEmpty( lede );

	const sectionStyles = {
		color: textColor || undefined,
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
			<div className="smb-section__inner">
				<div className={ containerClasses }>
					<div className="smb-section__contents-wrapper smb-section-break-the-grid__contents-wrapper">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div
									className={ contentClasses }
									style={ contentStyles }
								>
									{ hasTitle && (
										<div className="smb-section__header smb-section-break-the-grid__header">
											{ hasSubTitle && (
												<RichText.Content
													tagName="div"
													className="smb-section__subtitle smb-section-break-the-grid__subtitle"
													value={ subtitle }
												/>
											) }

											<RichText.Content
												tagName={ titleTagName }
												className="smb-section__title smb-section-break-the-grid__title"
												value={ title }
											/>

											{ hasLede && (
												<div className="smb-section__lede-wrapper smb-section-break-the-grid__lede-wrapper">
													<RichText.Content
														tagName="div"
														className="smb-section__lede smb-section-break-the-grid__lede"
														value={ lede }
													/>
												</div>
											) }
										</div>
									) }

									<div className="smb-section__body smb-section-break-the-grid__body">
										<InnerBlocks.Content />
									</div>
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
