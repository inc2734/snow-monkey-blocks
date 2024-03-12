import classnames from 'classnames';

import {
	Popover,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import {
	BlockControls,
	ContrastChecker,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalLinkControl as LinkControl,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon } from '@wordpress/icons';

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		lede,
		note,
		backgroundColor,
		btnLabel,
		btnURL,
		btnTarget,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
	} = attributes;

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! btnURL;
	const opensInNewTab = btnTarget === '_blank';

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const classes = classnames( 'smb-btn-box', className );

	const btnClasses = classnames( 'smb-btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
		'smb-btn--wrap': btnWrap,
	} );

	const styles = {
		'--smb-btn-box--background-color': backgroundColor || undefined,
	};

	const btnStyles = {
		'--smb-btn--background-color': btnBackgroundColor || undefined,
		'--smb-btn--background-image': btnBackgroundGradientColor || undefined,
		'--smb-btn--border-radius': String( btnBorderRadius ).match( /^\d+$/ )
			? `${ btnBorderRadius }px`
			: btnBorderRadius,
		'--smb-btn--color': btnTextColor || undefined,
	};
	if (
		!! attributes.className &&
		attributes.className.split( ' ' ).includes( 'is-style-ghost' )
	) {
		btnStyles[ '--smb-btn--style--ghost--border-color' ] =
			btnBackgroundColor || undefined;
	}

	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const unlink = () => {
		setAttributes( {
			btnURL: undefined,
			btnTarget: undefined,
		} );
		setIsEditingURL( false );
	};

	return (
		<>
			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: backgroundColor,
							onColorChange: ( value ) =>
								setAttributes( {
									backgroundColor: value,
								} ),
							label: __(
								'Background color',
								'snow-monkey-blocks'
							),
						},
					] }
					__experimentalIsRenderedInSidebar
				></PanelColorGradientSettings>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Button settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							btnSize !== metadata.attributes.btnSize.default
						}
						isShownByDefault
						label={ __( 'Button size', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								btnSize: metadata.attributes.btnSize.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Button size', 'snow-monkey-blocks' ) }
							value={ btnSize }
							onChange={ ( value ) =>
								setAttributes( {
									btnSize: value,
								} )
							}
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
									label: __(
										'More wider',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'full',
									label: __(
										'Full size',
										'snow-monkey-blocks'
									),
								},
							] }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							btnBorderRadius !==
							metadata.attributes.btnBorderRadius.default
						}
						isShownByDefault
						label={ __( 'Border radius', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								btnBorderRadius:
									metadata.attributes.btnBorderRadius.default,
							} )
						}
					>
						<div className="smb-border-radius-control">
							<BorderRadiusControl
								values={ btnBorderRadius }
								onChange={ ( value ) => {
									setAttributes( { btnBorderRadius: value } );
								} }
							/>
						</div>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							btnWrap !== metadata.attributes.btnWrap.default
						}
						isShownByDefault
						label={ __( 'Wrap', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								btnWrap: metadata.attributes.btnWrap.default,
							} )
						}
					>
						<ToggleControl
							label={ __( 'Wrap', 'snow-monkey-blocks' ) }
							checked={ btnWrap }
							onChange={ ( value ) =>
								setAttributes( {
									btnWrap: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<div className="smb-color-gradient-settings-dropdown">
						<ColorGradientSettingsDropdown
							settings={ [
								{
									label: __(
										'Background color',
										'snow-monkey-blocks'
									),
									colorValue: btnBackgroundColor,
									gradientValue: btnBackgroundGradientColor,
									onColorChange: ( value ) =>
										setAttributes( {
											btnBackgroundColor: value,
										} ),
									onGradientChange: ( value ) =>
										setAttributes( {
											btnBackgroundGradientColor: value,
										} ),
								},
							] }
							__experimentalIsRenderedInSidebar
							{ ...useMultipleOriginColorsAndGradients() }
						/>

						<ColorGradientSettingsDropdown
							settings={ [
								{
									label: __(
										'Text color',
										'snow-monkey-blocks'
									),
									colorValue: btnTextColor,
									onColorChange: ( value ) =>
										setAttributes( {
											btnTextColor: value,
										} ),
								},
							] }
							__experimentalIsRenderedInSidebar
							{ ...useMultipleOriginColorsAndGradients() }
						/>

						<ContrastChecker
							backgroundColor={ btnBackgroundColor }
							textColor={ btnTextColor }
						/>
					</div>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="c-container">
					{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
						<RichText
							className="smb-btn-box__lede"
							value={ lede }
							onChange={ ( value ) =>
								setAttributes( {
									lede: value,
								} )
							}
							placeholder={ __(
								'Write lede…',
								'snow-monkey-blocks'
							) }
						/>
					) }

					<div className="smb-btn-box__btn-wrapper">
						<span
							ref={ setPopoverAnchor }
							className={ btnClasses }
							href={ btnURL }
							style={ btnStyles }
							target={
								'_self' === btnTarget ? undefined : btnTarget
							}
							rel={
								'_self' === btnTarget
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
								onChange={ ( value ) =>
									setAttributes( {
										btnLabel: value,
									} )
								}
								withoutInteractiveFormatting={ true }
								ref={ richTextRef }
							/>
						</span>
					</div>

					{ ( ! RichText.isEmpty( note ) || isSelected ) && (
						<RichText
							className="smb-btn-box__note"
							value={ note }
							onChange={ ( value ) =>
								setAttributes( {
									note: value,
								} )
							}
							placeholder={ __(
								'Write note…',
								'snow-monkey-blocks'
							) }
						/>
					) }
				</div>
			</div>

			<BlockControls group="block">
				<ToolbarButton
					name="link"
					icon={ linkIcon }
					title={ __( 'Link', 'snow-monkey-blocks' ) }
					onClick={ ( event ) => {
						event.preventDefault();
						setIsEditingURL( true );
					} }
					isActive={ isURLSet }
				/>
			</BlockControls>

			{ isSelected && isEditingURL && (
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
						value={ { url: btnURL, opensInNewTab } }
						onChange={ ( {
							url: newUrl,
							opensInNewTab: newOpensInNewTab,
						} ) => {
							setAttributes( {
								btnURL: newUrl,
								btnTarget: ! newOpensInNewTab
									? '_self'
									: '_blank',
							} );
						} }
						onRemove={ () => {
							unlink();
							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ ! isURLSet }
					/>
				</Popover>
			) }
		</>
	);
}
