import classnames from 'classnames';

import {
	FontSizePicker,
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	getFontSizeClass,
	getFontSizeObjectByValue,
	useSettings,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import {
	BaseControl,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		title,
		numberColor,
		titleColor,
		titleFontSizeSlug,
		titleFontSize,
		templateLock,
	} = attributes;

	const [ fontSizes ] = useSettings( 'typography.fontSizes' );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-step__item', className );

	const styles = {
		'--smb-step--number-background-color': numberColor || undefined,
		'--smb-step--title-color': titleColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-step__item__summary',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const selectedTitleFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! titleFontSizeSlug && fontSize.slug === titleFontSizeSlug
		)?.size || titleFontSize;

	const titleFontSizeClass = !! titleFontSizeSlug
		? getFontSizeClass( titleFontSizeSlug )
		: undefined;

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
						id="snow-monkey-blocks/step-item-free/title-font-size"
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
			</InspectorControls>

			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					panelId={ clientId }
					__experimentalIsRenderedInSidebar
					{ ...useMultipleOriginColorsAndGradients() }
					settings={ [
						{
							colorValue: numberColor,
							onColorChange: ( value ) =>
								setAttributes( {
									numberColor: value,
								} ),
							resetAllFilter: () => ( {
								numberColor: metadata.numberColor,
							} ),
							label: __( 'Number color', 'snow-monkey-blocks' ),
						},
						{
							colorValue: titleColor,
							onColorChange: ( value ) =>
								setAttributes( {
									titleColor: value,
								} ),
							resetAllFilter: () => ( {
								titleColor: metadata.titleColor,
							} ),
							label: __( 'Title color', 'snow-monkey-blocks' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ classnames(
						'smb-step__item__title',
						titleFontSizeClass
					) }
					style={ {
						fontSize: titleFontSize || undefined,
					} }
				>
					<div className="smb-step__item__number" />

					<RichText
						tagName="span"
						placeholder={ __(
							'Write title…',
							'snow-monkey-blocks'
						) }
						value={ title }
						multiline={ false }
						onChange={ ( value ) =>
							setAttributes( {
								title: value,
							} )
						}
					/>
				</div>

				<div className="smb-step__item__body">
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}
