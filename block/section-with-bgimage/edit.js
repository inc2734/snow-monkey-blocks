import classnames from 'classnames';
import { times } from 'lodash';

import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	FocalPointPicker,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import { __ } from '@wordpress/i18n';

import { toNumber, getMediaType, isVideoType } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';
import Figure from '@smb/component/figure';

const IMAGE_ALLOWED_TYPES = [ 'image', 'video' ];

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
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
		height,
		contentsAlignment,
		maskColor,
		maskGradientColor,
		maskOpacity,
		textColor,
		parallax,
		isSlim,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

	const TagName = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		className,
		{
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ `smb-section--${ height }` ]: !! height,
			'js-bg-parallax': !! parallax,
		}
	);

	const bgimageClasses = classnames( 'smb-section-with-bgimage__bgimage', {
		'js-bg-parallax__bgimage': !! parallax,
	} );

	const containerClasses = classnames( 'c-container', {
		'u-slim-width': !! isSlim,
	} );

	const hasTitle = ! RichText.isEmpty( title ) && 'none' !== titleTagName;
	const hasSubTitle = ! RichText.isEmpty( subtitle );
	const hasLede = ! RichText.isEmpty( lede );
	const hasMask = 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) );

	const isLgVideo = 'video' === lgImageMediaType;
	const isLgImage =
		'image' === lgImageMediaType || undefined === lgImageMediaType;
	const hasLgBackground = !! lgImageURL;
	const showLgFocalPointPicker = isLgVideo || ( isLgImage && ! parallax );
	const lgPointValue =
		lgFocalPoint && ! parallax
			? `${ lgFocalPoint.x * 100 }% ${ lgFocalPoint.y * 100 }%`
			: undefined;

	const isMdVideo = 'video' === mdImageMediaType;
	const isMdImage =
		'image' === mdImageMediaType || undefined === mdImageMediaType;
	const hasMdBackground = !! mdImageURL;
	const showMdFocalPointPicker = isMdVideo || ( isMdImage && ! parallax );
	const mdPointValue =
		mdFocalPoint && ! parallax
			? `${ mdFocalPoint.x * 100 }% ${ mdFocalPoint.y * 100 }%`
			: undefined;

	const isSmVideo = 'video' === smImageMediaType;
	const isSmImage =
		'image' === smImageMediaType || undefined === smImageMediaType;
	const hasSmBackground = !! smImageURL;
	const showSmFocalPointPicker = isSmVideo || ( isSmImage && ! parallax );
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

	const blockProps = useBlockProps( {
		className: classes,
		style: sectionStyles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: [ 'smb-section__body' ],
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeHeight = ( value ) =>
		setAttributes( {
			height: value,
		} );

	const onChangeContentAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
		} );

	const onChangeParallax = ( value ) =>
		setAttributes( {
			parallax: value,
		} );

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
		} );

	const onSelectLgImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			lgImageURL: newImageURL,
			lgImageID: media.id,
			lgImageAlt: media.alt,
			lgImageMediaType: getMediaType( media ),
		} );
	};

	const onSelectLgImageURL = ( newURL ) => {
		if ( newURL !== lgImageURL ) {
			setAttributes( {
				lgImageURL: newURL,
				lgImageID: 0,
				lgImageMediaType: getMediaType( {
					media_type: isVideoType( newURL ) ? 'video' : 'image',
				} ),
			} );
		}
	};

	const onRemoveLgImage = () =>
		setAttributes( {
			lgImageURL: '',
			lgImageAlt: '',
			lgImageID: 0,
			lgImageMediaType: undefined,
		} );

	const onChangeLgImageRepeat = ( value ) =>
		setAttributes( {
			lgImageRepeat: value,
		} );

	const onChangeLgFocalPoint = ( value ) => {
		setAttributes( {
			lgFocalPoint: value,
		} );
	};

	const onSelectMdImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			mdImageURL: newImageURL,
			mdImageID: media.id,
			mdImageAlt: media.alt,
			mdImageMediaType: getMediaType( media ),
		} );
	};

	const onSelectMdImageURL = ( newURL ) => {
		if ( newURL !== mdImageURL ) {
			setAttributes( {
				mdImageURL: newURL,
				mdImageID: 0,
				mdImageMediaType: getMediaType( {
					media_type: isVideoType( newURL ) ? 'video' : 'image',
				} ),
			} );
		}
	};

	const onRemoveMdImage = () =>
		setAttributes( {
			mdImageURL: '',
			mdImageAlt: '',
			mdImageID: 0,
			mdImageMediaType: undefined,
		} );

	const onChangeMdImageRepeat = ( value ) =>
		setAttributes( {
			mdImageRepeat: value,
		} );

	const onChangeMdFocalPoint = ( value ) => {
		setAttributes( {
			lgFocalPoint: value,
		} );
	};

	const onSelectSmImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			smImageURL: newImageURL,
			smImageID: media.id,
			smImageAlt: media.alt,
			smImageMediaType: getMediaType( media ),
		} );
	};

	const onSelectSmImageURL = ( newURL ) => {
		if ( newURL !== smImageURL ) {
			setAttributes( {
				smImageURL: newURL,
				smImageID: 0,
				smImageMediaType: getMediaType( {
					media_type: isVideoType( newURL ) ? 'video' : 'image',
				} ),
			} );
		}
	};

	const onRemoveSmImage = () =>
		setAttributes( {
			smImageURL: '',
			smImageAlt: '',
			smImageID: 0,
			smImageMediaType: undefined,
		} );

	const onChangeSmImageRepeat = ( value ) =>
		setAttributes( {
			smImageRepeat: value,
		} );

	const onChangeSmFocalPoint = ( value ) => {
		setAttributes( {
			lgFocalPoint: value,
		} );
	};

	const onChangeMaskColor = ( value ) =>
		setAttributes( {
			maskColor: value,
		} );

	const onChangeMaskGradientColor = ( value ) =>
		setAttributes( {
			maskGradientColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeMaskOpacity = ( value ) =>
		setAttributes( {
			maskOpacity: toNumber( ( 1 - value ).toFixed( 1 ), 0, 1 ),
		} );

	const onChangeSubtitle = ( value ) =>
		setAttributes( {
			subtitle: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Wrapper Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-with-bgimage/wrapper-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( wrapperTagNames.length, ( index ) => {
								const onClickWrapperTagName = () =>
									setAttributes( {
										wrapperTagName:
											wrapperTagNames[ index ],
									} );

								const isPrimary =
									wrapperTagName === wrapperTagNames[ index ];
								return (
									<Button
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickWrapperTagName }
										key={ index }
									>
										{ wrapperTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-with-bgimage/title-tag-names"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								const onClickTitleTagName = () =>
									setAttributes( {
										titleTagName: titleTagNames[ index ],
									} );

								const isPrimary =
									titleTagName === titleTagNames[ index ];
								return (
									<Button
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickTitleTagName }
										key={ index }
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<SelectControl
						label={ __( 'Height', 'snow-monkey-blocks' ) }
						value={ height }
						options={ [
							{
								value: 'fit',
								label: __( 'Fit', 'snow-monkey-blocks' ),
							},
							{
								value: 'wide',
								label: __( 'Wide', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeHeight }
					/>

					<SelectControl
						label={ __(
							'Contents alignment',
							'snow-monkey-blocks'
						) }
						value={ contentsAlignment }
						options={ [
							{
								value: '',
								label: __( 'Normal', 'snow-monkey-blocks' ),
							},
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
							{
								value: 'center',
								label: __( 'Center', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentAlignment }
					/>

					<ToggleControl
						label={ __(
							'Parallax (Deprecated)',
							'snow-monkey-blocks'
						) }
						checked={ parallax }
						onChange={ onChangeParallax }
						help={ __(
							'This setting is being retained for backwards compatibility and is not recommended for use. Its use may slow down the page display.',
							'snow-monkey-blocks'
						) }
					/>

					<ToggleControl
						label={ __(
							'Make the content width slim',
							'snow-monkey-blocks'
						) }
						checked={ isSlim }
						onChange={ onChangeIsSlim }
					/>

					<ResponsiveTabPanel
						desktop={ () => (
							<>
								<Figure
									src={ lgImageURL }
									id={ lgImageID }
									alt={ lgImageAlt }
									onSelect={ onSelectLgImage }
									onSelectURL={ onSelectLgImageURL }
									onRemove={ onRemoveLgImage }
									mediaType={ lgImageMediaType }
									allowedTypes={ IMAGE_ALLOWED_TYPES }
								/>

								{ hasLgBackground && isLgImage && (
									<ToggleControl
										label={ __(
											'Repeat images',
											'snow-monkey-blocks'
										) }
										checked={ lgImageRepeat }
										onChange={ onChangeLgImageRepeat }
									/>
								) }

								{ showLgFocalPointPicker && (
									<FocalPointPicker
										label={ __(
											'Focal point picker',
											'snow-monkey-blocks'
										) }
										url={ lgImageURL }
										value={ lgFocalPoint }
										onChange={ onChangeLgFocalPoint }
									/>
								) }
							</>
						) }
						tablet={ () => (
							<>
								<Figure
									src={ mdImageURL }
									id={ mdImageID }
									alt={ mdImageAlt }
									onSelect={ onSelectMdImage }
									onSelectURL={ onSelectMdImageURL }
									onRemove={ onRemoveMdImage }
									mediaType={ mdImageMediaType }
									allowedTypes={ IMAGE_ALLOWED_TYPES }
								/>

								{ hasMdBackground && isMdImage && (
									<ToggleControl
										label={ __(
											'Repeat images',
											'snow-monkey-blocks'
										) }
										checked={ mdImageRepeat }
										onChange={ onChangeMdImageRepeat }
									/>
								) }

								{ showMdFocalPointPicker && (
									<FocalPointPicker
										label={ __(
											'Focal point picker',
											'snow-monkey-blocks'
										) }
										url={ mdImageURL }
										value={ mdFocalPoint }
										onChange={ onChangeMdFocalPoint }
									/>
								) }
							</>
						) }
						mobile={ () => (
							<>
								<Figure
									src={ smImageURL }
									id={ smImageID }
									alt={ smImageAlt }
									onSelect={ onSelectSmImage }
									onSelectURL={ onSelectSmImageURL }
									onRemove={ onRemoveSmImage }
									mediaType={ smImageMediaType }
									allowedTypes={ IMAGE_ALLOWED_TYPES }
								/>

								{ hasSmBackground && isSmImage && (
									<ToggleControl
										label={ __(
											'Repeat images',
											'snow-monkey-blocks'
										) }
										checked={ smImageRepeat }
										onChange={ onChangeSmImageRepeat }
									/>
								) }

								{ showSmFocalPointPicker && (
									<FocalPointPicker
										label={ __(
											'Focal point picker',
											'snow-monkey-blocks'
										) }
										url={ smImageURL }
										value={ smFocalPoint }
										onChange={ onChangeSmFocalPoint }
									/>
								) }
							</>
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Mask Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ maskColor }
						gradientValue={ maskGradientColor }
						onColorChange={ onChangeMaskColor }
						onGradientChange={ onChangeMaskGradientColor }
					/>

					<RangeControl
						label={ __( 'Opacity', 'snow-monkey-blocks' ) }
						value={ Number( ( 1 - maskOpacity ).toFixed( 1 ) ) }
						onChange={ onChangeMaskOpacity }
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>
				</PanelBody>

				<PanelColorGradientSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: textColor,
							onColorChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorGradientSettings>
			</InspectorControls>

			<TagName { ...blockProps }>
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

				<div className="smb-section__inner">
					<div className={ containerClasses }>
						{ hasTitle && ( hasSubTitle || isSelected ) && (
							<RichText
								className="smb-section__subtitle"
								value={ subtitle }
								onChange={ onChangeSubtitle }
								placeholder={ __(
									'Write subtitle…',
									'snow-monkey-blocks'
								) }
							/>
						) }

						{ ( hasTitle ||
							( isSelected && 'none' !== titleTagName ) ) && (
							<RichText
								className="smb-section__title"
								tagName={ titleTagName }
								value={ title }
								onChange={ onChangeTitle }
								placeholder={ __(
									'Write title…',
									'snow-monkey-blocks'
								) }
							/>
						) }

						{ hasTitle && ( hasLede || isSelected ) && (
							<div className="smb-section__lede-wrapper">
								<RichText
									className="smb-section__lede"
									value={ lede }
									onChange={ onChangeLede }
									placeholder={ __(
										'Write lede…',
										'snow-monkey-blocks'
									) }
								/>
							</div>
						) }

						<div { ...innerBlocksProps } />
					</div>
				</div>
			</TagName>
		</>
	);
}
