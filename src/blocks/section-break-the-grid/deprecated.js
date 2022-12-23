import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import { omit, without } from 'lodash';

import {
	RichText,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import metadata from './block.json';

import { divider, generateSpacingProperties } from '@smb/helper';

import { Save as Header } from '../section/components/header';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

const SectionBackgroundV2 = ( {
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
	bottomDividerType,
	bottomDividerLevel,
	bottomDividerColor,
	bottomDividerVerticalPosition,
	backgroundText,
	containerClasses,
} ) => {
	const hasBackgroundColor = !! backgroundColor || !! backgroundGradientColor;
	const hasBackgroundTexture = !! backgroundTexture;
	const hasFixedBackgroundColor =
		!! fixedBackgroundColor || !! fixedBackgroundGradientColor;
	const hasFixedBackgroundTexture = !! fixedBackgroundTexture;
	const hasTopDivider = !! topDividerLevel;
	const hasBottomDivider = !! bottomDividerLevel;
	const hasBackgroundText = !! backgroundText?.text;

	const topDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--top',
		`smb-section__divider--${ topDividerType }`
	);

	const bottomDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--bottom',
		`smb-section__divider--${ bottomDividerType }`
	);

	const backgroundStyles = {};
	if ( hasBackgroundColor ) {
		backgroundStyles.backgroundColor = backgroundColor;
		backgroundStyles.backgroundImage = backgroundGradientColor;

		if ( ! isBackgroundNoOver ) {
			if ( backgroundHorizontalPosition || backgroundVerticalPosition ) {
				backgroundStyles.transform = `translate(${
					backgroundHorizontalPosition || 0
				}%, ${ backgroundVerticalPosition || 0 }%)`;
			}
		} else {
			if ( 0 < backgroundHorizontalPosition ) {
				backgroundStyles.left = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			} else if ( 0 > backgroundHorizontalPosition ) {
				backgroundStyles.right = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			}

			if ( 0 < backgroundVerticalPosition ) {
				backgroundStyles.top = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			} else if ( 0 > backgroundVerticalPosition ) {
				backgroundStyles.bottom = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			}
		}
	}

	const backgroundTextureStyles = {
		// eslint-disable-next-line no-nested-ternary
		backgroundImage: hasBackgroundTexture
			? !! backgroundTextureUrl
				? `url(${ backgroundTextureUrl })`
				: `url(${ smb.pluginUrl }/dist/blocks/section/img/${ backgroundTexture }.png)`
			: undefined,
		opacity: !! backgroundTextureOpacity
			? backgroundTextureOpacity
			: undefined,
	};

	const fixedBackgroundStyles = {
		paddingTop: !! topDividerLevel ? Math.abs( topDividerLevel ) : 0,
		paddingBottom: !! bottomDividerLevel
			? Math.abs( bottomDividerLevel )
			: 0,
		backgroundColor: !! fixedBackgroundColor
			? fixedBackgroundColor
			: undefined,
		backgroundImage: !! fixedBackgroundGradientColor
			? fixedBackgroundGradientColor
			: undefined,
	};

	const fixedBackgroundTextureStyles = {
		// eslint-disable-next-line no-nested-ternary
		backgroundImage: hasFixedBackgroundTexture
			? !! fixedBackgroundTextureUrl
				? `url(${ fixedBackgroundTextureUrl })`
				: `url(${ smb.pluginUrl }/dist/blocks/section/img/${ fixedBackgroundTexture }.png)`
			: undefined,
		opacity: !! fixedBackgroundTextureOpacity
			? fixedBackgroundTextureOpacity
			: undefined,
	};

	const dividersStyles = {};
	if ( topDividerVerticalPosition ) {
		dividersStyles.top = `${ topDividerVerticalPosition }%`;
	}
	if ( bottomDividerVerticalPosition ) {
		dividersStyles.bottom = `${ bottomDividerVerticalPosition }%`;
	}

	const backgroundTextStyles = {};
	backgroundTextStyles.color = !! backgroundText?.color
		? backgroundText.color
		: undefined;
	backgroundTextStyles.opacity =
		!! backgroundText?.opacity && 1 > backgroundText.opacity
			? backgroundText.opacity
			: undefined;
	backgroundTextStyles.fontSize =
		!! backgroundText?.fontSize && ! backgroundText?.fontSizeSlug
			? backgroundText.fontSize
			: undefined;
	backgroundTextStyles.lineHeight = !! backgroundText?.lineHeight
		? backgroundText.lineHeight
		: undefined;
	backgroundTextStyles.top = !! backgroundText?.position?.top
		? backgroundText.position.top
		: undefined;
	backgroundTextStyles.right = !! backgroundText?.position?.right
		? backgroundText.position.right
		: undefined;
	backgroundTextStyles.bottom = !! backgroundText?.position?.bottom
		? backgroundText.position.bottom
		: undefined;
	backgroundTextStyles.left = !! backgroundText?.position?.left
		? backgroundText.position.left
		: undefined;

	return (
		<>
			{ ( hasFixedBackgroundColor ||
				hasFixedBackgroundTexture ||
				hasBackgroundColor ||
				hasBackgroundTexture ||
				hasTopDivider ||
				hasBottomDivider ||
				hasBackgroundText ) && (
				<div
					className="smb-section__fixed-background"
					style={ fixedBackgroundStyles }
				>
					{ hasFixedBackgroundTexture && (
						<div
							className="smb-section__fixed-background__texture"
							style={ fixedBackgroundTextureStyles }
						/>
					) }
					{ ( hasBackgroundColor || hasBackgroundTexture ) && (
						<div
							className="smb-section__background"
							style={ backgroundStyles }
						>
							{ hasBackgroundTexture && (
								<div
									className="smb-section__background__texture"
									style={ backgroundTextureStyles }
								/>
							) }
						</div>
					) }
					{ hasBackgroundText && (
						<div
							className="smb-section__background-text"
							aria-hidden="true"
						>
							<div className={ containerClasses }>
								<div className="smb-section__background-text__inner">
									<div
										className={ classnames(
											'smb-section__background-text__text',
											{
												[ `has-${ backgroundText?.fontSizeSlug }-font-size` ]:
													!! backgroundText?.fontSizeSlug,
											}
										) }
										style={ backgroundTextStyles }
									>
										<RichText.Content
											value={ backgroundText.text?.replace(
												/\n/g,
												'<br>'
											) }
										/>
									</div>
								</div>
							</div>
						</div>
					) }
					{ ( hasTopDivider || hasBottomDivider ) && (
						<div
							className="smb-section__dividers"
							style={ dividersStyles }
						>
							{ hasTopDivider && (
								<div className={ topDividerClasses }>
									{ divider(
										topDividerType,
										topDividerLevel,
										topDividerColor
									) }
								</div>
							) }

							{ hasBottomDivider && (
								<div className={ bottomDividerClasses }>
									{ divider(
										bottomDividerType,
										bottomDividerLevel,
										bottomDividerColor
									) }
								</div>
							) }
						</div>
					) }
				</div>
			) }
		</>
	);
};

const SectionBackgroundV1 = ( {
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
	bottomDividerType,
	bottomDividerLevel,
	bottomDividerColor,
	bottomDividerVerticalPosition,
	backgroundText,
	containerClasses,
} ) => {
	const hasBackgroundColor = !! backgroundColor || !! backgroundGradientColor;
	const hasBackgroundTexture = !! backgroundTexture;
	const hasFixedBackgroundColor =
		!! fixedBackgroundColor || !! fixedBackgroundGradientColor;
	const hasFixedBackgroundTexture = !! fixedBackgroundTexture;
	const hasTopDivider = !! topDividerLevel;
	const hasBottomDivider = !! bottomDividerLevel;
	const hasBackgroundText = !! backgroundText?.text;

	const topDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--top',
		`smb-section__divider--${ topDividerType }`
	);

	const bottomDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--bottom',
		`smb-section__divider--${ bottomDividerType }`
	);

	const backgroundStyles = {};
	if ( hasBackgroundColor ) {
		backgroundStyles.backgroundColor = backgroundColor;
		backgroundStyles.backgroundImage = backgroundGradientColor;

		if ( ! isBackgroundNoOver ) {
			if ( backgroundHorizontalPosition || backgroundVerticalPosition ) {
				backgroundStyles.transform = `translate(${
					backgroundHorizontalPosition || 0
				}%, ${ backgroundVerticalPosition || 0 }%)`;
			}
		} else {
			if ( 0 < backgroundHorizontalPosition ) {
				backgroundStyles.left = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			} else if ( 0 > backgroundHorizontalPosition ) {
				backgroundStyles.right = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			}

			if ( 0 < backgroundVerticalPosition ) {
				backgroundStyles.top = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			} else if ( 0 > backgroundVerticalPosition ) {
				backgroundStyles.bottom = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			}
		}
	}

	const backgroundTextureStyles = {
		// eslint-disable-next-line no-nested-ternary
		backgroundImage: hasBackgroundTexture
			? !! backgroundTextureUrl
				? `url(${ backgroundTextureUrl })`
				: `url(${ smb.pluginUrl }/dist/block/section/img/${ backgroundTexture }.png)`
			: undefined,
		opacity: !! backgroundTextureOpacity
			? backgroundTextureOpacity
			: undefined,
	};

	const fixedBackgroundStyles = {
		paddingTop: !! topDividerLevel ? Math.abs( topDividerLevel ) : 0,
		paddingBottom: !! bottomDividerLevel
			? Math.abs( bottomDividerLevel )
			: 0,
		backgroundColor: !! fixedBackgroundColor
			? fixedBackgroundColor
			: undefined,
		backgroundImage: !! fixedBackgroundGradientColor
			? fixedBackgroundGradientColor
			: undefined,
	};

	const fixedBackgroundTextureStyles = {
		// eslint-disable-next-line no-nested-ternary
		backgroundImage: hasFixedBackgroundTexture
			? !! fixedBackgroundTextureUrl
				? `url(${ fixedBackgroundTextureUrl })`
				: `url(${ smb.pluginUrl }/dist/block/section/img/${ fixedBackgroundTexture }.png)`
			: undefined,
		opacity: !! fixedBackgroundTextureOpacity
			? fixedBackgroundTextureOpacity
			: undefined,
	};

	const dividersStyles = {};
	if ( topDividerVerticalPosition ) {
		dividersStyles.top = `${ topDividerVerticalPosition }%`;
	}
	if ( bottomDividerVerticalPosition ) {
		dividersStyles.bottom = `${ bottomDividerVerticalPosition }%`;
	}

	const backgroundTextStyles = {};
	backgroundTextStyles.color = !! backgroundText?.color
		? backgroundText.color
		: undefined;
	backgroundTextStyles.opacity =
		!! backgroundText?.opacity && 1 > backgroundText.opacity
			? backgroundText.opacity
			: undefined;
	backgroundTextStyles.fontSize =
		!! backgroundText?.fontSize && ! backgroundText?.fontSizeSlug
			? backgroundText.fontSize
			: undefined;
	backgroundTextStyles.lineHeight = !! backgroundText?.lineHeight
		? backgroundText.lineHeight
		: undefined;
	backgroundTextStyles.top = !! backgroundText?.position?.top
		? backgroundText.position.top
		: undefined;
	backgroundTextStyles.right = !! backgroundText?.position?.right
		? backgroundText.position.right
		: undefined;
	backgroundTextStyles.bottom = !! backgroundText?.position?.bottom
		? backgroundText.position.bottom
		: undefined;
	backgroundTextStyles.left = !! backgroundText?.position?.left
		? backgroundText.position.left
		: undefined;

	return (
		<>
			{ ( hasFixedBackgroundColor ||
				hasFixedBackgroundTexture ||
				hasBackgroundColor ||
				hasBackgroundTexture ||
				hasTopDivider ||
				hasBottomDivider ||
				hasBackgroundText ) && (
				<div
					className="smb-section__fixed-background"
					style={ fixedBackgroundStyles }
				>
					{ hasFixedBackgroundTexture && (
						<div
							className="smb-section__fixed-background__texture"
							style={ fixedBackgroundTextureStyles }
						/>
					) }
					{ ( hasBackgroundColor || hasBackgroundTexture ) && (
						<div
							className="smb-section__background"
							style={ backgroundStyles }
						>
							{ hasBackgroundTexture && (
								<div
									className="smb-section__background__texture"
									style={ backgroundTextureStyles }
								/>
							) }
						</div>
					) }
					{ hasBackgroundText && (
						<div
							className="smb-section__background-text"
							aria-hidden="true"
						>
							<div className={ containerClasses }>
								<div className="smb-section__background-text__inner">
									<div
										className={ classnames(
											'smb-section__background-text__text',
											{
												[ `has-${ backgroundText?.fontSizeSlug }-font-size` ]:
													!! backgroundText?.fontSizeSlug,
											}
										) }
										style={ backgroundTextStyles }
									>
										<RichText.Content
											value={ backgroundText.text?.replace(
												/\n/g,
												'<br>'
											) }
										/>
									</div>
								</div>
							</div>
						</div>
					) }
					{ ( hasTopDivider || hasBottomDivider ) && (
						<div
							className="smb-section__dividers"
							style={ dividersStyles }
						>
							{ hasTopDivider && (
								<div className={ topDividerClasses }>
									{ divider(
										topDividerType,
										topDividerLevel,
										topDividerColor
									) }
								</div>
							) }

							{ hasBottomDivider && (
								<div className={ bottomDividerClasses }>
									{ divider(
										bottomDividerType,
										bottomDividerLevel,
										bottomDividerColor
									) }
								</div>
							) }
						</div>
					) }
				</div>
			) }
		</>
	);
};

export default [
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
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
					[ `smb-section--${ contentsAlignment }` ]:
						!! contentsAlignment,
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
					'center' === verticalAlignment &&
					isAvailableVerticalAlignment,
				'c-row--lg-bottom':
					'bottom' === verticalAlignment &&
					isAvailableVerticalAlignment,
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

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]:
						!! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
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
				}
			);

			const bodyClasses = classnames(
				'smb-section__body',
				'smb-section-break-the-grid__body'
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

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
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
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
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
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
					<SectionBackgroundV2
						{ ...{
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
													( 1 - maskOpacity ).toFixed(
														1
													)
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
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
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
					[ `smb-section--${ contentsAlignment }` ]:
						!! contentsAlignment,
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
					'center' === verticalAlignment &&
					isAvailableVerticalAlignment,
				'c-row--lg-bottom':
					'bottom' === verticalAlignment &&
					isAvailableVerticalAlignment,
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

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]:
						!! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
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
				}
			);

			const bodyClasses = classnames(
				'smb-section__body',
				'smb-section-break-the-grid__body'
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

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
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
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
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
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
					<SectionBackgroundV1
						{ ...{
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
													( 1 - maskOpacity ).toFixed(
														1
													)
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
		},
	},
	{
		attributes: {
			...blockAttributes,
			imageSize: {
				type: 'string',
				default: 'l',
			},
			contentSize: {
				type: 'string',
				default: 's',
			},
			contentHorizontalPosition: {
				type: 'string',
				default: 's',
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
		},

		migrate( attributes ) {
			let newAttributes = { ...attributes };

			if ( !! newAttributes.imageSize ) {
				switch ( newAttributes.imageSize ) {
					case 'm':
						newAttributes.imageSize = '';
						break;
					case 'l':
						newAttributes.imageSize = '40';
						break;
					case 'xl':
						newAttributes.imageSize = '80';
						break;
					default:
						newAttributes.imageSize = '';
				}
			}

			if ( !! newAttributes.contentSize ) {
				switch ( newAttributes.contentSize ) {
					case 'xs':
						newAttributes.contentSize = '-40';
						break;
					case 's':
						newAttributes.contentSize = '-20';
						break;
					case 'm':
						newAttributes.contentSize = '';
						break;
					case 'l':
						newAttributes.contentSize = '20';
						break;
					case 'xl':
						newAttributes.contentSize = '40';
						break;
					default:
						newAttributes.contentSize = '';
				}
			}

			if ( !! newAttributes.contentHorizontalPosition ) {
				switch ( newAttributes.contentHorizontalPosition ) {
					case 'xs':
						newAttributes.contentHorizontalPosition = '5';
						break;
					case 's':
						newAttributes.contentHorizontalPosition = '10';
						break;
					case 'm':
						newAttributes.contentHorizontalPosition = '15';
						break;
					case 'l':
						newAttributes.contentHorizontalPosition = '20';
						break;
					case 'xl':
						newAttributes.contentHorizontalPosition = '25';
						break;
					default:
						newAttributes.contentHorizontalPosition = '';
				}
			}

			if ( !! newAttributes.contentVerticalPosition ) {
				switch ( newAttributes.contentVerticalPosition ) {
					case 'txl':
						newAttributes.contentVerticalPosition = 't100';
						break;
					case 'tl':
						newAttributes.contentVerticalPosition = 't80';
						break;
					case 'tm':
						newAttributes.contentVerticalPosition = 't60';
						break;
					case 'ts':
						newAttributes.contentVerticalPosition = 't40';
						break;
					case 'bs':
						newAttributes.contentVerticalPosition = 'b40';
						break;
					case 'bm':
						newAttributes.contentVerticalPosition = 'b60';
						break;
					case 'bl':
						newAttributes.contentVerticalPosition = 'b80';
						break;
					case 'bxl':
						newAttributes.contentVerticalPosition = 'b100';
						break;
					default:
						newAttributes.contentVerticalPosition = '';
				}
			}

			if ( !! newAttributes.className ) {
				newAttributes.className = without(
					newAttributes.className.split( ' ' ),
					'smb-section--left',
					'smb-section--center',
					'smb-section--right'
				).join( ' ' );
			}

			if ( ! newAttributes.className ) {
				newAttributes = omit( newAttributes, 'className' );
			}

			return {
				...newAttributes,
			};
		},

		save( { attributes, className } ) {
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
			} = attributes;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-break-the-grid',
				`smb-section-break-the-grid--${ imagePosition }`,
				{
					[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
						contentVerticalPosition &&
						verticalAlignment &&
						'middle' !== verticalAlignment,
					[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]:
						!! mobileOrder,
					[ `smb-section--${ contentsAlignment }` ]:
						!! contentsAlignment,
					[ className ]: !! className,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--margin', {
				'c-row--lg-top': 'top' === verticalAlignment,
				'c-row--lg-middle': 'center' === verticalAlignment,
				'c-row--lg-bottom': 'bottom' === verticalAlignment,
			} );

			const textColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);
			const imageColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]:
						!! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
					[ `smb-section-break-the-grid__content--w-${ contentSize }` ]:
						!! contentSize,
					[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]:
						!! contentPadding,
					[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]:
						!! contentHorizontalPosition,
					'smb-section-break-the-grid__content--remove-outside-p':
						contentPadding && removeContentOutsidePadding,
				}
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

			const hasTitle =
				! RichText.isEmpty( title ) && 'none' !== titleTagName;
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
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
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
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
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
						<div className="c-container">
							<div className={ rowClasses }>
								<div className={ textColumnClasses }>
									<div
										className={ contentClasses }
										style={ contentStyles }
									>
										{ hasTitle && hasSubTitle && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-break-the-grid__subtitle"
												value={ subtitle }
											/>
										) }

										{ hasTitle && (
											<RichText.Content
												tagName={ titleTagName }
												className="smb-section__title smb-section-break-the-grid__title"
												value={ title }
											/>
										) }

										{ hasTitle && hasLede && (
											<div className="smb-section__lede-wrapper smb-section-break-the-grid__lede-wrapper">
												<RichText.Content
													tagName="div"
													className="smb-section__lede smb-section-break-the-grid__lede"
													value={ lede }
												/>
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
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
		},

		save( { attributes, className } ) {
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
			} = attributes;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-break-the-grid',
				`smb-section-break-the-grid--${ imagePosition }`,
				{
					[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
						contentVerticalPosition &&
						verticalAlignment &&
						'middle' !== verticalAlignment,
					[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]:
						!! mobileOrder,
					[ className ]: !! className,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--margin', {
				'c-row--lg-top': 'top' === verticalAlignment,
				'c-row--lg-middle': 'center' === verticalAlignment,
				'c-row--lg-bottom': 'bottom' === verticalAlignment,
			} );

			const textColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);
			const imageColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]:
						!! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
					[ `smb-section-break-the-grid__content--w-${ contentSize }` ]:
						!! contentSize,
					[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]:
						!! contentPadding,
					[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]:
						!! contentHorizontalPosition,
					'smb-section-break-the-grid__content--remove-outside-p':
						contentPadding && removeContentOutsidePadding,
				}
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

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
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
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
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
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
					<div className="c-container">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div
									className={ contentClasses }
									style={ contentStyles }
								>
									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( subtitle ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-break-the-grid__subtitle"
												value={ subtitle }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName={ titleTagName }
												className="smb-section__title smb-section-break-the-grid__title"
												value={ title }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( lede ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__lede smb-section-break-the-grid__lede"
												value={ lede }
											/>
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
				</TagName>
			);
		},
	},

	{
		attributes: {
			...blockAttributes,
			verticalAlignment: {
				type: 'string',
				default: 'middle',
			},
		},

		migrate( attributes ) {
			return {
				...attributes,
				verticalAlignment:
					'middle' === attributes.verticalAlignment
						? 'center'
						: attributes.verticalAlignment,
			};
		},

		save( { attributes, className } ) {
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
			} = attributes;

			const Wrapper = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-break-the-grid',
				`smb-section-break-the-grid--${ imagePosition }`,
				{
					[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
						contentVerticalPosition &&
						verticalAlignment &&
						'middle' !== verticalAlignment,
					[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]:
						!! mobileOrder,
					[ className ]: !! className,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--margin', {
				[ `c-row--lg-${ verticalAlignment }` ]: true,
			} );

			const textColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);
			const imageColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]:
						!! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
					[ `smb-section-break-the-grid__content--w-${ contentSize }` ]:
						!! contentSize,
					[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]:
						!! contentPadding,
					[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]:
						!! contentHorizontalPosition,
					'smb-section-break-the-grid__content--remove-outside-p':
						contentPadding && removeContentOutsidePadding,
				}
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

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
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
			};

			const maskStyles = {};
			if ( maskColor ) {
				maskStyles.backgroundColor = maskColor;
			}

			const figureStyles = {
				opacity: maskOpacity,
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
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
					figure = image;
				} else if ( 'video' === imageMediaType ) {
					figure = video;
				}
			}

			return (
				<Wrapper className={ classes } style={ sectionStyles }>
					<div className="c-container">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div
									className={ contentClasses }
									style={ contentStyles }
								>
									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( subtitle ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-break-the-grid__subtitle"
												value={ subtitle }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName={ titleTagName }
												className="smb-section__title smb-section-break-the-grid__title"
												value={ title }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( lede ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__lede smb-section-break-the-grid__lede"
												value={ lede }
											/>
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
				</Wrapper>
			);
		},
	},
];
