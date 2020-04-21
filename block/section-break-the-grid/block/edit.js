'use strict';

import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import { times } from 'lodash';

import { __, sprintf } from '@wordpress/i18n';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	BaseControl,
	Button,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

import Figure from '../../../src/js/component/figure';
import { toNumber, getMediaType } from '../../../src/js/helper/helper';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		imageID,
		imageURL,
		imageAlt,
		imageMediaType,
		textColor,
		imagePosition,
		imageSize,
		verticalAlignment,
		contentSize,
		contentHorizontalPosition,
		contentVerticalPosition,
		contentBackgroundColor,
		contentPadding,
		removeContentOutsidePadding,
		shadowColor,
		shadowHorizontalPosition,
		shadowVerticalPosition,
	} = attributes;

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

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

	const figureClasses = classnames( 'smb-section-break-the-grid__figure', {
		[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
	} );

	const contentClasses = classnames( 'smb-section-break-the-grid__content', {
		[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
		[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
		[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
		'smb-section-break-the-grid__content--remove-outside-p':
			contentPadding && removeContentOutsidePadding,
	} );

	const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

	const sectionStyles = {
		color: textColor || undefined,
	};

	const shadowStyles = {};
	if ( shadowColor ) {
		shadowStyles.backgroundColor = shadowColor;
	}
	if ( shadowHorizontalPosition || shadowVerticalPosition ) {
		shadowStyles.transform = `translate(${ shadowHorizontalPosition ||
			0 }%, ${ shadowVerticalPosition || 0 }%)`;
	}

	const contentStyles = {
		backgroundColor:
			contentBackgroundColor && hexToRgba( contentBackgroundColor, 0.98 ),
	};

	const onChangeImagePosition = ( value ) =>
		setAttributes( {
			imagePosition: value,
		} );

	const onChangeImageSize = ( value ) =>
		setAttributes( {
			imageSize: value,
		} );

	const onChangeVerticalAlignment = ( value ) =>
		setAttributes( {
			verticalAlignment: value,
		} );

	const onChangeContentSize = ( value ) =>
		setAttributes( {
			contentSize: value,
		} );

	const onChangeContentHorizontalPosition = ( value ) =>
		setAttributes( {
			contentHorizontalPosition: value,
		} );

	const onChangeContentVerticalPosition = ( value ) =>
		setAttributes( {
			contentVerticalPosition: value,
		} );

	const onChangeContentBackgroundColor = ( value ) =>
		setAttributes( {
			contentBackgroundColor: value,
		} );

	const onChangeContentPadding = ( value ) =>
		setAttributes( {
			contentPadding: value,
		} );

	const onChangeRemoveContentOutsidePadding = ( value ) =>
		setAttributes( {
			removeContentOutsidePadding: value,
		} );

	const onChangeShadowColor = ( value ) =>
		setAttributes( {
			shadowColor: value,
		} );

	const onChangeShadowHorizontalPosition = ( value ) =>
		setAttributes( {
			shadowHorizontalPosition: toNumber( value, -120, 120 ),
		} );

	const onChangeShadowVerticalPosition = ( value ) =>
		setAttributes( {
			shadowVerticalPosition: toNumber( value, -120, 120 ),
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onSelectImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.xlarge
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			imageURL: newImageURL,
			imageID: media.id,
			imageAlt: media.alt,
			imageMediaType: getMediaType( media ),
		} );
	};

	const onRemoveImage = () =>
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageID: 0,
			imageMediaType: undefined,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Wrapper Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-break-the-grid/wrapper-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( wrapperTagNames.length, ( index ) => {
								const onClickWrapperTagName = () =>
									setAttributes( {
										wrapperTagName:
											wrapperTagNames[ index ],
									} );

								return (
									<Button
										isDefault
										isPrimary={
											wrapperTagName ===
											wrapperTagNames[ index ]
										}
										onClick={ onClickWrapperTagName }
									>
										{ wrapperTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-break-the-grid/title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								const onClickTitleTagName = () =>
									setAttributes( {
										titleTagName: titleTagNames[ index ],
									} );

								return (
									<Button
										isDefault
										isPrimary={
											titleTagName ===
											titleTagNames[ index ]
										}
										onClick={ onClickTitleTagName }
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<SelectControl
						label={ __( 'Image position', 'snow-monkey-blocks' ) }
						value={ imagePosition }
						options={ [
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeImagePosition }
					/>

					<SelectControl
						label={ __(
							'image Size Adjustment',
							'snow-monkey-blocks'
						) }
						value={ imageSize }
						options={ [
							{
								value: 'm',
								label: __( '+-0%', 'snow-monkey-blocks' ),
							},
							{
								value: 'l',
								label: __( '+40%', 'snow-monkey-blocks' ),
							},
							{
								value: 'xl',
								label: __( '+80%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeImageSize }
					/>

					<SelectControl
						label={ __(
							'Vertical Alignment',
							'snow-monkey-blocks'
						) }
						value={ verticalAlignment }
						options={ [
							{
								value: 'top',
								label: __( 'Top', 'snow-monkey-blocks' ),
							},
							{
								value: 'middle',
								label: __( 'Middle', 'snow-monkey-blocks' ),
							},
							{
								value: 'bottom',
								label: __( 'Bottom', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeVerticalAlignment }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Contents Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __(
							'Content Size Adjustment',
							'snow-monkey-blocks'
						) }
						value={ contentSize }
						options={ [
							{
								value: 'xs',
								label: __( '-40%', 'snow-monkey-blocks' ),
							},
							{
								value: 's',
								label: __( '-20%', 'snow-monkey-blocks' ),
							},
							{
								value: 'm',
								label: __( '+-0%', 'snow-monkey-blocks' ),
							},
							{
								value: 'l',
								label: __( '+20%', 'snow-monkey-blocks' ),
							},
							{
								value: 'xl',
								label: __( '+40%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentSize }
					/>

					<SelectControl
						label={ __(
							'Degree of overlap of content to image',
							'snow-monkey-blocks'
						) }
						value={ contentHorizontalPosition }
						options={ [
							{
								value: '',
								label: __( '+-0%', 'snow-monkey-blocks' ),
							},
							{
								value: 'xs',
								label: __( '5%', 'snow-monkey-blocks' ),
							},
							{
								value: 's',
								label: __( '10%', 'snow-monkey-blocks' ),
							},
							{
								value: 'm',
								label: __( '15%', 'snow-monkey-blocks' ),
							},
							{
								value: 'l',
								label: __( '20%', 'snow-monkey-blocks' ),
							},
							{
								value: 'xl',
								label: __( '25%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentHorizontalPosition }
					/>

					{ verticalAlignment && 'middle' !== verticalAlignment && (
						<SelectControl
							label={ __(
								'Vertical position of content',
								'snow-monkey-blocks'
							) }
							value={ contentVerticalPosition }
							options={ [
								{
									value: '',
									label: __( '+-0%', 'snow-monkey-blocks' ),
								},
								{
									value: 'txl',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s up',
											'snow-monkey-blocks'
										),
										'100px'
									),
								},
								{
									value: 'tl',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s up',
											'snow-monkey-blocks'
										),
										'80px'
									),
								},
								{
									value: 'tm',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s up',
											'snow-monkey-blocks'
										),
										'60px'
									),
								},
								{
									value: 'ts',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s up',
											'snow-monkey-blocks'
										),
										'40px'
									),
								},
								{
									value: 'bs',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s down',
											'snow-monkey-blocks'
										),
										'40px'
									),
								},
								{
									value: 'bm',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s down',
											'snow-monkey-blocks'
										),
										'60px'
									),
								},
								{
									value: 'bl',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s down',
											'snow-monkey-blocks'
										),
										'80px'
									),
								},
								{
									value: 'bxl',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s down',
											'snow-monkey-blocks'
										),
										'100px'
									),
								},
							] }
							onChange={ onChangeContentVerticalPosition }
						/>
					) }

					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Background Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-break-the-grid/content-background-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ contentBackgroundColor }
							onChange={ onChangeContentBackgroundColor }
						/>
					</BaseControl>

					<SelectControl
						label={ __( 'Content Padding', 'snow-monkey-blocks' ) }
						value={ contentPadding }
						options={ [
							{
								value: '',
								label: __( 'None', 'snow-monkey-blocks' ),
							},
							{
								value: 's',
								label: __( 'S', 'snow-monkey-blocks' ),
							},
							{
								value: 'm',
								label: __( 'M', 'snow-monkey-blocks' ),
							},
							{
								value: 'l',
								label: __( 'L', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentPadding }
					/>

					{ contentPadding && (
						<ToggleControl
							label={ __(
								'Remove Outside Padding',
								'snow-monkey-blocks'
							) }
							checked={ removeContentOutsidePadding }
							onChange={ onChangeRemoveContentOutsidePadding }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Shadow Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-break-the-grid/shadow-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ shadowColor }
							onChange={ onChangeShadowColor }
						/>
					</BaseControl>

					{ shadowColor && (
						<RangeControl
							label={ __(
								'Horizontal Position',
								'snow-monkey-blocks'
							) }
							value={ shadowHorizontalPosition }
							onChange={ onChangeShadowHorizontalPosition }
							min="-120"
							max="120"
						/>
					) }

					{ shadowColor && (
						<RangeControl
							label={ __(
								'Vertical Position',
								'snow-monkey-blocks'
							) }
							value={ shadowVerticalPosition }
							onChange={ onChangeShadowVerticalPosition }
							min="-120"
							max="120"
						/>
					) }
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<Wrapper className={ classes } style={ sectionStyles }>
				<div className="c-container">
					<div className={ rowClasses }>
						<div className={ textColumnClasses }>
							<div
								className={ contentClasses }
								style={ contentStyles }
							>
								{ ( ! RichText.isEmpty( title ) ||
									isSelected ) &&
									'none' !== titleTagName && (
										<RichText
											className="smb-section__title smb-section-break-the-grid__title"
											tagName={ titleTagName }
											value={ title }
											onChange={ onChangeTitle }
											allowedFormats={ [] }
											placeholder={ __(
												'Write title…',
												'snow-monkey-blocks'
											) }
										/>
									) }

								<div className="smb-section__body smb-section-break-the-grid__body">
									<InnerBlocks />
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
								<Figure
									src={ imageURL }
									id={ imageID }
									alt={ imageAlt }
									onSelect={ onSelectImage }
									onRemove={ onRemoveImage }
									mediaType={ imageMediaType }
									allowedTypes={ [ 'image', 'video' ] }
								/>
							</div>
						</div>
					</div>
				</div>
			</Wrapper>
		</>
	);
}
