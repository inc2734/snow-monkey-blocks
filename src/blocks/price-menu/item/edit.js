import classnames from 'classnames';

import {
	FontSizePicker,
	InspectorControls,
	RichText,
	useBlockProps,
	getFontSizeClass,
	getFontSizeObjectByValue,
	useSettings,
} from '@wordpress/block-editor';

import {
	BaseControl,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		title,
		price,
		titleFontSizeSlug,
		titleFontSize,
		priceFontSizeSlug,
		priceFontSize,
	} = attributes;

	const [ fontSizes ] = useSettings( 'typography.fontSizes' );

	const classes = classnames( 'smb-price-menu__item', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const selectedTitleFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! titleFontSizeSlug && fontSize.slug === titleFontSizeSlug
		)?.size || titleFontSize;

	const selectedPriceFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! priceFontSizeSlug && fontSize.slug === priceFontSizeSlug
		)?.size || priceFontSize;

	const titleFontSizeClass = !! titleFontSizeSlug
		? getFontSizeClass( titleFontSizeSlug )
		: undefined;

	const priceFontSizeClass = !! priceFontSizeSlug
		? getFontSizeClass( priceFontSizeSlug )
		: undefined;

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangePrice = ( value ) =>
		setAttributes( {
			price: value,
		} );

	return (
		<>
			<InspectorControls group="typography">
				<ToolsPanelItem
					panelId={ clientId }
					hasValue={ () =>
						titleFontSizeSlug !== metadata.titleFontSizeSlug ||
						titleFontSize !== metadata.titleFontSize
					}
					isShownByDefault
					label={ __( 'Title font size', 'snow-monkey-blocks' ) }
					resetAllFilter={ () => ( {
						titleFontSizeSlug: metadata.titleFontSizeSlug,
						titleFontSize: metadata.titleFontSize,
					} ) }
					onDeselect={ () => {
						setAttributes( {
							titleFontSizeSlug: metadata.titleFontSizeSlug,
							titleFontSize: metadata.titleFontSize,
						} );
					} }
				>
					<BaseControl
						label={ __( 'Title', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/price-menu-item/title-font-size"
					>
						<FontSizePicker
							value={ selectedTitleFontSize }
							onChange={ ( value ) => {
								const fontSizeSlug = getFontSizeObjectByValue(
									fontSizes,
									value
								).slug;

								setAttributes( {
									titleFontSizeSlug:
										fontSizeSlug || undefined,
									titleFontSize: ! fontSizeSlug
										? value
										: undefined,
								} );
							} }
							withReset={ false }
							withSlider
						/>
					</BaseControl>
				</ToolsPanelItem>

				<ToolsPanelItem
					panelId={ clientId }
					hasValue={ () =>
						priceFontSizeSlug !== metadata.priceFontSizeSlug ||
						priceFontSize !== metadata.priceFontSize
					}
					isShownByDefault
					label={ __( 'Price font size', 'snow-monkey-blocks' ) }
					resetAllFilter={ () => ( {
						priceFontSizeSlug: metadata.priceFontSizeSlug,
						priceFontSize: metadata.priceFontSize,
					} ) }
					onDeselect={ () => {
						setAttributes( {
							priceFontSizeSlug: metadata.priceFontSizeSlug,
							priceFontSize: metadata.priceFontSize,
						} );
					} }
				>
					<BaseControl
						label={ __( 'Price', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/price-menu-item/price-font-size"
					>
						<FontSizePicker
							value={ selectedPriceFontSize }
							onChange={ ( value ) => {
								const fontSizeSlug = getFontSizeObjectByValue(
									fontSizes,
									value
								).slug;

								setAttributes( {
									priceFontSizeSlug:
										fontSizeSlug || undefined,
									priceFontSize: ! fontSizeSlug
										? value
										: undefined,
								} );
							} }
							withReset={ false }
							withSlider
						/>
					</BaseControl>
				</ToolsPanelItem>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					className={ classnames(
						'smb-price-menu__item__title',
						titleFontSizeClass
					) }
					placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
					value={ title }
					onChange={ onChangeTitle }
					style={ {
						fontSize: titleFontSize || undefined,
					} }
				/>

				<RichText
					className={ classnames(
						'smb-price-menu__item__price',
						priceFontSizeClass
					) }
					placeholder={ __( 'Write price…', 'snow-monkey-blocks' ) }
					value={ price }
					onChange={ onChangePrice }
					style={ {
						fontSize: priceFontSize || undefined,
					} }
				/>
			</div>
		</>
	);
}
