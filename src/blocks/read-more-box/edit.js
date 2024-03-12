import classnames from 'classnames';

import {
	ContrastChecker,
	InspectorControls,
	InnerBlocks,
	JustifyContentControl,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	BaseControl,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';

const HORIZONTAL_JUSTIFY_CONTROLS = [ 'left', 'center', 'right' ];

export default function ( { attributes, setAttributes, clientId, className } ) {
	const {
		label,
		closeLabel,
		btnJustification,
		contenHeight,
		mask,
		maskColor,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
		templateLock,
	} = attributes;

	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	useEffect( () => {
		setAttributes( {
			label: label || __( 'Read more', 'snow-monkey-blocks' ),
			closeLabel: closeLabel || __( 'Close', 'snow-monkey-blocks' ),
			clientId,
		} );
	}, [ clientId ] );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-read-more-box', className, {
		'smb-read-more-box--has-mask': mask,
	} );

	const innerClasses = classnames( 'smb-read-more-box__content' );

	const actionClasses = classnames( 'smb-read-more-box__action', {
		[ `is-content-justification-${ btnJustification }` ]: btnJustification,
	} );

	const styles = {
		'--smb-read-more-box--content-height': contenHeight || undefined,
		'--smb-read-more-box--mask-color': ( mask && maskColor ) || undefined,
	};

	const btnWrapperClasses = classnames(
		'smb-read-more-box__btn-wrapper',
		'smb-btn-wrapper',
		{
			[ `smb-btn-wrapper--${ btnSize }` ]: !! btnSize,
		}
	);

	const btnClasses = classnames( 'smb-read-more-box__button', 'smb-btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
		'smb-btn--wrap': btnWrap,
	} );

	const btnStyles = {
		'--smb-btn--background-color': btnBackgroundColor || undefined,
		'--smb-btn--background-image': btnBackgroundGradientColor || undefined,
		'--smb-btn--border-radius': String( btnBorderRadius ).match( /^\d+$/ )
			? `${ btnBorderRadius }px`
			: btnBorderRadius || undefined,
		'--smb-btn--color': btnTextColor || undefined,
	};
	if (
		!! attributes.className &&
		attributes.className.split( ' ' ).includes( 'is-style-ghost' )
	) {
		btnStyles[ '--smb-btn--style--ghost--border-color' ] =
			btnBackgroundColor || undefined;
	}

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			'aria-hidden': 'false',
			className: innerClasses,
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							label !== metadata.attributes.label.default
						}
						isShownByDefault
						label={ __( 'Label', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								label: metadata.attributes.label.default,
							} )
						}
					>
						<TextControl
							label={ __( 'Label', 'snow-monkey-blocks' ) }
							value={
								label || __( 'Read more', 'snow-monkey-blocks' )
							}
							onChange={ ( newValue ) => {
								setAttributes( { label: newValue } );
							} }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							closeLabel !==
							metadata.attributes.closeLabel.default
						}
						isShownByDefault
						label={ __(
							'Label (for Close)',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								closeLabel:
									metadata.attributes.closeLabel.default,
							} )
						}
					>
						<TextControl
							label={ __(
								'Label (for Close)',
								'snow-monkey-blocks'
							) }
							value={
								closeLabel ||
								__( 'Close', 'snow-monkey-blocks' )
							}
							onChange={ ( newValue ) => {
								setAttributes( { closeLabel: newValue } );
							} }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							btnJustification !==
							metadata.attributes.btnJustification.default
						}
						isShownByDefault
						label={ __(
							'Button justification',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								btnJustification:
									metadata.attributes.btnJustification
										.default,
							} )
						}
					>
						<BaseControl
							label={ __(
								'Button justification',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/read-more-box/btn-justification"
						>
							<div>
								<JustifyContentControl
									allowedControls={
										HORIZONTAL_JUSTIFY_CONTROLS
									}
									value={ btnJustification }
									onChange={ ( newValue ) =>
										setAttributes( {
											btnJustification: newValue,
										} )
									}
								/>
							</div>
						</BaseControl>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							contenHeight !==
							metadata.attributes.contenHeight.default
						}
						isShownByDefault
						label={ __(
							'Height of contents when closed',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								contenHeight:
									metadata.attributes.contenHeight.default,
							} )
						}
					>
						<TextControl
							label={ __(
								'Height of contents when closed',
								'snow-monkey-blocks'
							) }
							value={ contenHeight }
							onChange={ ( newValue ) => {
								setAttributes( { contenHeight: newValue } );
							} }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							mask !== metadata.attributes.mask.default
						}
						isShownByDefault
						label={ __(
							'Masks the lower part when closed',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								mask: metadata.attributes.mask.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Masks the lower part when closed',
								'snow-monkey-blocks'
							) }
							checked={ mask }
							onChange={ ( newValue ) => {
								setAttributes( { mask: newValue } );
							} }
						/>
					</ToolsPanelItem>

					{ mask && (
						<ToolsPanelItem
							hasValue={ () =>
								maskColor !==
								metadata.attributes.maskColor.default
							}
							isShownByDefault
							label={ __( 'Mask Color', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setAttributes( {
									maskColor:
										metadata.attributes.maskColor.default,
								} )
							}
						>
							<div className="smb-color-gradient-settings-dropdown">
								<ColorGradientSettingsDropdown
									settings={ [
										{
											label: __(
												'Mask Color',
												'snow-monkey-blocks'
											),
											colorValue: maskColor,
											onColorChange: ( value ) =>
												setAttributes( {
													maskColor: value,
												} ),
										},
									] }
									__experimentalIsRenderedInSidebar
									{ ...multipleOriginColorsAndGradients }
								/>
							</div>
						</ToolsPanelItem>
					) }
				</ToolsPanel>
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
							{ ...multipleOriginColorsAndGradients }
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
							{ ...multipleOriginColorsAndGradients }
						/>

						<ContrastChecker
							backgroundColor={ btnBackgroundColor }
							textColor={ btnTextColor }
						/>
					</div>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } id={ clientId } />
				<div className={ actionClasses }>
					<div className={ btnWrapperClasses }>
						<button
							className={ btnClasses }
							style={ btnStyles }
							aria-expanded="false"
							aria-controls={ clientId }
							data-label={ label }
							data-close-label={ closeLabel }
						>
							<span className="smb-read-more-box__label smb-btn__label">
								{ closeLabel }
							</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
