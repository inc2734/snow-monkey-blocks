import classnames from 'classnames';
import { times } from 'lodash';

import {
	BaseControl,
	Button,
	CheckboxControl,
	PanelBody,
	Popover,
	RangeControl,
	SelectControl,
	ToolbarButton,
} from '@wordpress/components';

import {
	BlockControls,
	ContrastChecker,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';
import ImageSizeSelectControl from '@smb/component/image-size-select-control';
import { getResizedImages } from '@smb/helper';

// @todo For WordPress 6.0
import { useMultipleOriginColorsAndGradientsFallback } from '@smb/hooks';

// @todo For WordPress 6.0
if ( undefined === useMultipleOriginColorsAndGradients ) {
	useMultipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradientsFallback;
}

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		titleTagName,
		title,
		lede,
		summary,
		url,
		target,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		btnLabel,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
	} = attributes;

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const opensInNewTab = target === '_blank';

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const { resizedImages } = useSelect(
		( select ) => {
			if ( ! imageID ) {
				return {
					resizedImages: {},
				};
			}

			const { getMedia } = select( 'core' );
			const media = getMedia( imageID );
			if ( ! media ) {
				return {
					resizedImages: {},
				};
			}

			const { getSettings } = select( 'core/block-editor' );
			const { imageSizes } = getSettings();

			return {
				resizedImages: getResizedImages( imageSizes, media ),
			};
		},
		[ imageID ]
	);

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = classnames( 'c-row__col', className );

	const btnClasses = classnames( 'smb-items__item__btn', 'smb-btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
		'smb-btn--wrap': btnWrap,
	} );

	const btnStyles = {
		'--smb-btn--background-color': btnBackgroundColor || undefined,
		'--smb-btn--background-image': btnBackgroundGradientColor || undefined,
		'--smb-btn--border-radius':
			'undefined' !== typeof btnBorderRadius
				? `${ btnBorderRadius }px`
				: undefined,
		'--smb-btn--color': btnTextColor || undefined,
	};

	const ref = useRef();
	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const onSelectImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes[ imageSizeSlug ]
				? media.sizes[ imageSizeSlug ].url
				: media.url;

		const newImageWidth =
			!! media.sizes && !! media.sizes[ imageSizeSlug ]
				? media.sizes[ imageSizeSlug ].width
				: media.width;

		const newImageHeight =
			!! media.sizes && !! media.sizes[ imageSizeSlug ]
				? media.sizes[ imageSizeSlug ].height
				: media.height;

		setAttributes( {
			imageURL: newImageURL,
			imageID: media.id,
			imageAlt: media.alt,
			imageWidth: newImageWidth,
			imageHeight: newImageHeight,
		} );
	};

	const onSelectImageURL = ( newURL ) => {
		if ( newURL !== imageURL ) {
			setAttributes( {
				imageURL: newURL,
				imageID: 0,
				imageSizeSlug: 'large',
			} );
		}
	};

	const onRemoveImage = () =>
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageWidth: '',
			imageHeight: '',
			imageID: 0,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
		} );

	const onChangeSummary = ( value ) =>
		setAttributes( {
			summary: value,
		} );

	const onChangeUrl = ( { url: newUrl, opensInNewTab: newOpensInNewTab } ) =>
		setAttributes( {
			url: newUrl,
			target: ! newOpensInNewTab ? '_self' : '_blank',
		} );

	const onChangeBtnSize = ( value ) =>
		setAttributes( {
			btnSize: value,
		} );

	const onChangeBtnLabel = ( value ) =>
		setAttributes( {
			btnLabel: value,
		} );

	const onChangeBtnBackgroundColor = ( value ) =>
		setAttributes( {
			btnBackgroundColor: value,
		} );

	const onChangeBtnBackgroundGradientColor = ( value ) =>
		setAttributes( {
			btnBackgroundGradientColor: value,
		} );

	const onChangeBtnTextColor = ( value ) =>
		setAttributes( {
			btnTextColor: value,
		} );

	const onChangeBtnBorderRadius = ( value ) =>
		setAttributes( {
			btnBorderRadius: value,
		} );

	const onChangeBtnWrap = ( value ) =>
		setAttributes( {
			btnWrap: value,
		} );

	const onChangeImageSizeSlug = ( value ) => {
		let newImageURL = imageURL;
		if ( !! resizedImages[ value ] && !! resizedImages[ value ].url ) {
			newImageURL = resizedImages[ value ].url;
		}

		let newImageWidth = imageWidth;
		if ( !! resizedImages[ value ] && !! resizedImages[ value ].width ) {
			newImageWidth = resizedImages[ value ].width;
		}

		let newImageHeight = imageHeight;
		if ( !! resizedImages[ value ] && !! resizedImages[ value ].height ) {
			newImageHeight = resizedImages[ value ].height;
		}

		setAttributes( {
			imageURL: newImageURL,
			imageWidth: newImageWidth,
			imageHeight: newImageHeight,
			imageSizeSlug: value,
		} );
	};

	const unlink = () => {
		setAttributes( {
			url: undefined,
			target: undefined,
		} );
		setIsEditingURL( false );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Title tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/items-item-standard/title-tag-name"
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

					<ImageSizeSelectControl
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						id={ imageID }
						slug={ imageSizeSlug }
						onChange={ onChangeImageSizeSlug }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Button settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __( 'Button size', 'snow-monkey-blocks' ) }
						value={ btnSize }
						onChange={ onChangeBtnSize }
						options={ [
							{
								value: '',
								label: __(
									'Normal size',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'little-wider',
								label: __(
									'Litle wider',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'wider',
								label: __( 'Wider', 'snow-monkey-blocks' ),
							},
							{
								value: 'more-wider',
								label: __( 'More wider', 'snow-monkey-blocks' ),
							},
							{
								value: 'full',
								label: __( 'Full size', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<RangeControl
						label={ __( 'Border radius', 'snow-monkey-blocks' ) }
						value={ btnBorderRadius }
						onChange={ onChangeBtnBorderRadius }
						min="0"
						max="50"
						initialPosition="6"
						allowReset
					/>

					<CheckboxControl
						label={ __( 'Wrap', 'snow-monkey-blocks' ) }
						checked={ btnWrap }
						onChange={ onChangeBtnWrap }
					/>

					<ColorGradientControl
						className="smb-inpanel-color-gradient-control"
						label={ __( 'Background color', 'snow-monkey-blocks' ) }
						colorValue={ btnBackgroundColor }
						onColorChange={ onChangeBtnBackgroundColor }
						gradientValue={ btnBackgroundGradientColor }
						onGradientChange={ onChangeBtnBackgroundGradientColor }
						{ ...useMultipleOriginColorsAndGradients() }
						__experimentalHasMultipleOrigins={ true }
						__experimentalIsRenderedInSidebar={ true }
					/>

					<ColorGradientControl
						className="smb-inpanel-color-gradient-control"
						label={ __( 'Text color', 'snow-monkey-blocks' ) }
						colorValue={ btnTextColor }
						onColorChange={ onChangeBtnTextColor }
						{ ...useMultipleOriginColorsAndGradients() }
						__experimentalHasMultipleOrigins={ true }
						__experimentalIsRenderedInSidebar={ true }
					/>

					<ContrastChecker
						backgroundColor={ btnBackgroundColor }
						textColor={ btnTextColor }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-items__item">
					{ ( !! imageURL || isSelected ) && (
						<div className="smb-items__item__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								onSelect={ onSelectImage }
								onSelectURL={ onSelectImageURL }
								onRemove={ onRemoveImage }
								isSelected={ isSelected }
							/>
						</div>
					) }

					<div className="smb-items__item__body">
						{ 'none' !== titleTagName && (
							<RichText
								tagName={ titleTagName }
								className="smb-items__item__title"
								placeholder={ __(
									'Write title…',
									'snow-monkey-blocks'
								) }
								value={ title }
								onChange={ onChangeTitle }
							/>
						) }

						{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
							<RichText
								className="smb-items__item__lede"
								placeholder={ __(
									'Write lede…',
									'snow-monkey-blocks'
								) }
								value={ lede }
								onChange={ onChangeLede }
							/>
						) }

						{ ( ! RichText.isEmpty( summary ) || isSelected ) && (
							<RichText
								className="smb-items__item__content"
								placeholder={ __(
									'Write content…',
									'snow-monkey-blocks'
								) }
								value={ summary }
								onChange={ onChangeSummary }
							/>
						) }

						{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) && (
							<div className="smb-items__item__action">
								<span
									ref={ useMergeRefs( [
										setPopoverAnchor,
										ref,
									] ) }
									className={ btnClasses }
									href={ url }
									style={ btnStyles }
									target={
										'_self' === target ? undefined : target
									}
									rel={
										'_self' === target
											? undefined
											: 'noopener noreferrer'
									}
								>
									<RichText
										className="smb-btn__label"
										value={ btnLabel }
										placeholder={ __(
											'Button',
											'snow-monkey-blocks'
										) }
										onChange={ onChangeBtnLabel }
										withoutInteractiveFormatting={ true }
										ref={ richTextRef }
									/>
								</span>

								{ isSelected && ( isEditingURL || isURLSet ) && (
									<Popover
										placement="bottom"
										anchor={ popoverAnchor }
										onClose={ () => {
											setIsEditingURL( false );
											richTextRef.current?.focus();
										} }
									>
										<LinkControl
											className="wp-block-navigation-link__inline-link-input"
											value={ { url, opensInNewTab } }
											onChange={ onChangeUrl }
											onRemove={ () => {
												unlink();
												richTextRef.current?.focus();
											} }
											forceIsEditingLink={ isEditingURL }
										/>
									</Popover>
								) }
							</div>
						) }
					</div>
				</div>
			</div>

			<BlockControls group="block">
				{ ! isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkIcon }
						title={ __( 'Link', 'snow-monkey-blocks' ) }
						onClick={ ( event ) => {
							event.preventDefault();
							setIsEditingURL( true );
						} }
					/>
				) }
				{ isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkOffIcon }
						title={ __( 'Unlink', 'snow-monkey-blocks' ) }
						onClick={ unlink }
						isActive={ true }
					/>
				) }
			</BlockControls>
		</>
	);
}
