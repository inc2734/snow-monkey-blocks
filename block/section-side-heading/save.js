import classnames from 'classnames';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { getColumnSize, divider } from '@smb/helper';

export default function ( { attributes, className } ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
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
		textColor,
		headingPosition,
		headingColumnSize,
		isSlim,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		topDividerVerticalPosition,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
		bottomDividerVerticalPosition,
	} = attributes;

	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		headingColumnSize
	);

	const TagName = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-side-heading',
		className
	);

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

	const containerClasses = classnames( 'c-container', {
		'u-slim-width': !! isSlim,
	} );

	const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
		'c-row--reverse': 'right' === headingPosition,
	} );

	const headingColClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		`c-row__col--md-${ imageColumnWidth }`
	);

	const contentColClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		`c-row__col--md-${ textColumnWidth }`
	);

	const hasBackgroundColor = backgroundColor || backgroundGradientColor;
	const hasFixedBackgroundColor =
		fixedBackgroundColor || fixedBackgroundGradientColor;
	const hasBackgroundTexture = backgroundTexture;
	const hasFixedBackgroundTexture = fixedBackgroundTexture;
	const hasTopDivider = !! topDividerLevel;
	const hasBottomDivider = !! bottomDividerLevel;
	const hasTitle = ! RichText.isEmpty( title ) && 'none' !== titleTagName;
	const hasSubTitle = ! RichText.isEmpty( subtitle );
	const hasLede = ! RichText.isEmpty( lede );

	const sectionStyles = {};
	if ( textColor ) {
		sectionStyles.color = textColor;
	}

	const fixedBackgroundStyles = {
		paddingTop: Math.abs( topDividerLevel ),
		paddingBottom: Math.abs( bottomDividerLevel ),
		backgroundColor: fixedBackgroundColor,
		backgroundImage: fixedBackgroundGradientColor,
	};

	const fixedBackgroundTextureStyles = {
		backgroundImage: hasFixedBackgroundTexture
			? `url(${ smb.pluginUrl }/dist/block/section/img/${ fixedBackgroundTexture }.png)`
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
		backgroundImage: hasBackgroundTexture
			? `url(${ smb.pluginUrl }/dist/block/section/img/${ backgroundTexture }.png)`
			: undefined,
		opacity: !! backgroundTextureOpacity
			? backgroundTextureOpacity
			: undefined,
	};

	const innerStyles = {};

	return (
		<TagName
			{ ...useBlockProps.save( {
				className: classes,
				style: sectionStyles,
			} ) }
		>
			{ ( hasFixedBackgroundColor ||
				hasFixedBackgroundTexture ||
				hasBackgroundColor ||
				hasBackgroundTexture ||
				hasTopDivider ||
				hasBottomDivider ) && (
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

			<div className="smb-section__inner" style={ innerStyles }>
				<div className={ containerClasses }>
					<div className={ rowClasses }>
						<div className={ headingColClasses }>
							{ hasTitle && hasSubTitle && (
								<RichText.Content
									tagName="div"
									className="smb-section__subtitle smb-section-side-heading__subtitle"
									value={ subtitle }
								/>
							) }

							{ hasTitle && (
								<RichText.Content
									tagName={ titleTagName }
									className="smb-section__title smb-section-side-heading__title"
									value={ title }
								/>
							) }

							{ hasTitle && hasLede && (
								<div className="smb-section__lede-wrapper smb-section-side-heading__lede-wrapper">
									<RichText.Content
										tagName="div"
										className="smb-section__lede smb-section-side-heading__lede"
										value={ lede }
									/>
								</div>
							) }
						</div>
						<div className={ contentColClasses }>
							<div className="smb-section__body smb-section-side-heading__body">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				</div>
			</div>
		</TagName>
	);
}
