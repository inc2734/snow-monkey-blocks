import classnames from 'classnames';

import {
	BlockControls,
	ContrastChecker,
	InspectorControls,
	MediaUpload,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import {
	Button,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
	SelectControl,
	BorderBoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { pullLeft, pullRight } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { useToolsPanelDropdownMenuProps } from '@smb/helper';

import metadata from './block.json';

const TEMPLATE = [ [ 'core/paragraph' ] ];

export default function ( { attributes, setAttributes, className } ) {
	const {
		showAvatar,
		avatarID,
		avatarAlt,
		avatarURL,
		avatarBorderColor,
		avatarBorderStyle,
		avatarBorderWidth,
		backgroundColor,
		borderColor,
		borderStyle,
		borderWidth,
		textColor,
		balloonName,
		modifier,
		templateLock,
	} = attributes;

	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	const renderAvatar = ( obj ) => {
		return (
			<Button
				className="image-button"
				onClick={ obj.open }
				style={ { padding: 0 } }
			>
				<img
					src={ avatarURL }
					alt={ avatarAlt }
					className={ `wp-image-${ avatarID }` }
				/>
			</Button>
		);
	};

	const styles = {
		'--smb-balloon--background-color': backgroundColor || undefined,
		'--smb-balloon--border-color':
			borderColor || backgroundColor || undefined,
		'--smb-balloon--border-style': borderStyle || undefined,
		'--smb-balloon--border-width': borderWidth || undefined,
		'--smb-balloon--color': textColor || undefined,
		'--smb-balloon--avatar-border-color': avatarBorderColor || undefined,
		'--smb-balloon--avatar-border-style': avatarBorderStyle || undefined,
		'--smb-balloon--avatar-border-width': avatarBorderWidth || undefined,
	};

	const classes = classnames( 'smb-balloon', {
		[ className ]: !! className,
		[ `smb-balloon--${ modifier }` ]: !! modifier,
	} );

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-balloon__body',
		},
		{
			// allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock,
		}
	);

	const dropdownMenuProps = useToolsPanelDropdownMenuProps();

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Balloon settings', 'snow-monkey-blocks' ) }
					dropdownMenuProps={ dropdownMenuProps }
				>
					<ToolsPanelItem
						hasValue={ () =>
							borderColor !==
								metadata.attributes.borderColor.default ||
							borderStyle !==
								metadata.attributes.borderStyle.default ||
							borderWidth !==
								metadata.attributes.borderWidth.default
						}
						isShownByDefault
						label={ __( 'Border', 'snow-monkey-blocks' ) }
						resetAllFilter={ () => ( {
							borderColor:
								metadata.attributes.borderColor.default,
							borderStyle:
								metadata.attributes.borderStyle.default,
							borderWidth:
								metadata.attributes.borderWidth.default,
						} ) }
						onDeselect={ () =>
							setAttributes( {
								borderColor:
									metadata.attributes.borderColor.default,
								borderStyle:
									metadata.attributes.borderStyle.default,
								borderWidth:
									metadata.attributes.borderWidth.default,
							} )
						}
					>
						<BorderBoxControl
							{ ...multipleOriginColorsAndGradients }
							__next40pxDefaultSize
							__experimentalIsRenderedInSidebar
							className="smb-border-box-control"
							label={ __( 'Border', 'snow-monkey-blocks' ) }
							enableAlpha={ true }
							enableStyle={ true }
							onChange={ ( value ) => {
								setAttributes( {
									borderColor: value?.color,
									borderStyle: value?.style,
									borderWidth: value?.width,
								} );
							} }
							popoverOffset={ 40 }
							popoverPlacement="left-start"
							value={ {
								color: borderColor,
								style: borderStyle,
								width: borderWidth,
							} }
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
									colorValue: backgroundColor,
									onColorChange: ( value ) =>
										setAttributes( {
											backgroundColor: value,
										} ),
								},
								{
									label: __(
										'Text color',
										'snow-monkey-blocks'
									),
									colorValue: textColor,
									onColorChange: ( value ) =>
										setAttributes( {
											textColor: value,
										} ),
								},
							] }
							__experimentalIsRenderedInSidebar
							{ ...multipleOriginColorsAndGradients }
						/>

						<ContrastChecker
							backgroundColor={ backgroundColor }
							textColor={ textColor }
						/>
					</div>
				</ToolsPanel>

				<ToolsPanel
					label={ __( 'Avatar settings', 'snow-monkey-blocks' ) }
					dropdownMenuProps={ dropdownMenuProps }
				>
					<ToolsPanelItem
						hasValue={ () =>
							showAvatar !==
							metadata.attributes.showAvatar.default
						}
						isShownByDefault
						label={ __( 'Show avatar', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								showAvatar:
									metadata.attributes.showAvatar.default,
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Show avatar', 'snow-monkey-blocks' ) }
							checked={ showAvatar }
							onChange={ ( value ) =>
								setAttributes( {
									showAvatar: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ showAvatar && (
						<>
							<ToolsPanelItem
								hasValue={ () =>
									modifier !==
									metadata.attributes.modifier.default
								}
								isShownByDefault
								label={ __(
									'Avatar position',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										modifier:
											metadata.attributes.modifier
												.default,
									} )
								}
							>
								<SelectControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									label={ __(
										'Avatar position',
										'snow-monkey-blocks'
									) }
									value={ modifier }
									onChange={ ( value ) =>
										setAttributes( {
											modifier:
												'reverse' === value
													? value
													: '',
										} )
									}
									options={ [
										{
											value: '',
											label: __(
												'Left',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'reverse',
											label: __(
												'Right',
												'snow-monkey-blocks'
											),
										},
									] }
								/>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () =>
									avatarBorderColor !==
										metadata.attributes.avatarBorderColor
											.default ||
									avatarBorderStyle !==
										metadata.attributes.avatarBorderStyle
											.default ||
									avatarBorderWidth !==
										metadata.attributes.avatarBorderWidth
											.default
								}
								isShownByDefault
								label={ __( 'Border', 'snow-monkey-blocks' ) }
								resetAllFilter={ () => ( {
									avatarBorderColor:
										metadata.attributes.avatarBorderColor
											.default,
									avatarBorderStyle:
										metadata.attributes.avatarBorderStyle
											.default,
									avatarBorderWidth:
										metadata.attributes.avatarBorderWidth
											.default,
								} ) }
								onDeselect={ () =>
									setAttributes( {
										avatarBorderColor:
											metadata.attributes
												.avatarBorderColor.default,
										avatarBorderStyle:
											metadata.attributes
												.avatarBorderStyle.default,
										avatarBorderWidth:
											metadata.attributes
												.avatarBorderWidth.default,
									} )
								}
							>
								<BorderBoxControl
									{ ...multipleOriginColorsAndGradients }
									__next40pxDefaultSize
									__experimentalIsRenderedInSidebar
									className="smb-border-box-control"
									label={ __(
										'Border',
										'snow-monkey-blocks'
									) }
									enableAlpha={ true }
									enableStyle={ true }
									onChange={ ( value ) => {
										setAttributes( {
											avatarBorderColor: value?.color,
											avatarBorderStyle: value?.style,
											avatarBorderWidth: value?.width,
										} );
									} }
									popoverOffset={ 40 }
									popoverPlacement="left-start"
									value={ {
										color: avatarBorderColor,
										style: avatarBorderStyle,
										width: avatarBorderWidth,
									} }
								/>
							</ToolsPanelItem>
						</>
					) }
				</ToolsPanel>
			</InspectorControls>

			{ showAvatar && (
				<BlockControls group="block">
					<ToolbarGroup>
						<ToolbarButton
							icon={ pullLeft }
							title={ __(
								'Show avatar on left',
								'snow-monkey-blocks'
							) }
							isActive={ '' === modifier }
							onClick={ () => setAttributes( { modifier: '' } ) }
						/>

						<ToolbarButton
							icon={ pullRight }
							title={ __(
								'Show avatar on right',
								'snow-monkey-blocks'
							) }
							isActive={ 'reverse' === modifier }
							onClick={ () =>
								setAttributes( { modifier: 'reverse' } )
							}
						/>
					</ToolbarGroup>
				</BlockControls>
			) }

			<div { ...blockProps }>
				{ showAvatar && (
					<div className="smb-balloon__person">
						<div className="smb-balloon__figure">
							<MediaUpload
								onSelect={ ( media ) => {
									const newAvatarURL = !! media.sizes
										.thumbnail
										? media.sizes.thumbnail.url
										: media.url;

									setAttributes( {
										avatarURL: newAvatarURL,
										avatarID: media.id,
										avatarAlt: media.alt,
									} );
								} }
								type="image"
								value={ avatarID }
								render={ renderAvatar }
							/>
						</div>

						<RichText
							className="smb-balloon__name"
							value={ balloonName }
							onChange={ ( value ) =>
								setAttributes( {
									balloonName: value,
								} )
							}
							placeholder={ __( 'Name', 'snow-monkey-blocks' ) }
						/>
					</div>
				) }

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
