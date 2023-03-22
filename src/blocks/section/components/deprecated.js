import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

import { divider } from '@smb/helper';

export const SectionBackgroundV3 = ( {
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

	const fixedBackgroundStyles = {
		paddingTop: !! topDividerLevel ? Math.abs( topDividerLevel ) : 0,
		paddingBottom: !! bottomDividerLevel
			? Math.abs( bottomDividerLevel )
			: 0,
	};

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
						<div className="smb-section__fixed-background__texture" />
					) }
					{ ( hasBackgroundColor || hasBackgroundTexture ) && (
						<div className="smb-section__background">
							{ hasBackgroundTexture && (
								<div className="smb-section__background__texture" />
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
												[ `has-${ backgroundText?.fontSizeSlug.replace(
													/(\d+?)([^-])/,
													'$1-$2'
												) }-font-size` ]:
													!! backgroundText?.fontSizeSlug,
											}
										) }
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
						<div className="smb-section__dividers">
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

export const SectionBackgroundV2 = ( {
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

export const SectionBackgroundV1 = ( {
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
