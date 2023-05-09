import { times } from 'lodash';

import {
	BaseControl,
	Button,
	SelectControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

import { Fragment, useState } from '@wordpress/element';
import { settings as settingsIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import WidthPicker from '@smb/component/width-picker';
import SpacingControl from '@smb/component/spacing-control';

export const PanelBasicSettings = ( {
	disableIsSlim,
	disableContentsMaxWidth,
	disableContainerAlign,
	disableDisableContainerPadding,
	disableCustomHeight,
	settings,
} ) => {
	const [ showCustomHeightControl, setShowCustomHeightControl ] = useState(
		! disableCustomHeight
	);
	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

	return (
		<ToolsPanel label={ __( 'Block settings', 'snow-monkey-blocks' ) }>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'wrapperTagNameValue' ) &&
					setting.hasOwnProperty( 'onWrapperTagNameChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.wrapperTagNameValue !==
								setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Wrapper tag', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onWrapperTagNameChange(
									setting.defaultValue
								)
							}
						>
							<BaseControl
								key={ index }
								label={ __(
									'Wrapper tag',
									'snow-monkey-blocks'
								) }
								id="snow-monkey-blocks/section/wrapper-tag-name"
							>
								<div className="smb-list-icon-selector">
									{ times(
										wrapperTagNames.length,
										( wrapperTagName ) => {
											const onClickButton = () => {
												setting.onWrapperTagNameChange(
													wrapperTagNames[
														wrapperTagName
													]
												);
											};

											return (
												<Button
													key={ wrapperTagName }
													variant={
														setting.wrapperTagNameValue ===
														wrapperTagNames[
															wrapperTagName
														]
															? 'primary'
															: 'secondary'
													}
													onClick={ onClickButton }
												>
													{
														wrapperTagNames[
															wrapperTagName
														]
													}
												</Button>
											);
										}
									) }
								</div>
							</BaseControl>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'titleTagNameValue' ) &&
					setting.hasOwnProperty( 'onTitleTagNameChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.titleTagNameValue !==
								setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Title tag', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onTitleTagNameChange(
									setting.defaultValue
								)
							}
						>
							<BaseControl
								label={ __(
									'Title tag',
									'snow-monkey-blocks'
								) }
								id="snow-monkey-blocks/section/title-tag-name"
							>
								<div className="smb-list-icon-selector">
									{ times(
										titleTagNames.length,
										( titleTagName ) => {
											const onClickButton = () => {
												setting.onTitleTagNameChange(
													titleTagNames[
														titleTagName
													]
												);
											};

											return (
												<Button
													variant={
														setting.titleTagNameValue ===
														titleTagNames[
															titleTagName
														]
															? 'primary'
															: 'secondary'
													}
													onClick={ onClickButton }
													key={ titleTagName }
												>
													{
														titleTagNames[
															titleTagName
														]
													}
												</Button>
											);
										}
									) }
								</div>
							</BaseControl>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'heightValue' ) &&
					setting.hasOwnProperty( 'onHeightChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.heightValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Height', 'snow-monkey-blocks' ) }
							onDeselect={ () => {
								setting.onHeightChange(
									setting.defaultValue,
									setting.defaultDisableCustomHeightValue
								);
								setShowCustomHeightControl(
									! setting.defaultDisableCustomHeightValue
								);
							} }
						>
							<div>
								<Spacer>
									<HStack>
										<span className="components-base-control__label">
											{ ! showCustomHeightControl
												? __(
														'Height',
														'snow-monkey-blocks'
												  )
												: __(
														'Min height',
														'snow-monkey-blocks'
												  ) }
										</span>

										<Button
											label={
												! showCustomHeightControl
													? __(
															'Use preset',
															'snow-monkey-blocks'
													  )
													: __( 'Set custom size' )
											}
											icon={ settingsIcon }
											onClick={ () => {
												setShowCustomHeightControl(
													! showCustomHeightControl
												);
											} }
											isPressed={
												showCustomHeightControl
											}
											isSmall
										/>
									</HStack>
								</Spacer>

								{ ! showCustomHeightControl ? (
									<SelectControl
										value={ setting.heightValue }
										options={ [
											{
												value: 'fit',
												label: __(
													'Fit',
													'snow-monkey-blocks'
												),
											},
											{
												value: 'wide',
												label: __(
													'Wide',
													'snow-monkey-blocks'
												),
											},
											{
												value: 'full',
												label: __(
													'Full',
													'snow-monkey-blocks'
												),
											},
										] }
										onChange={ ( value ) =>
											setting.onHeightChange(
												value,
												true
											)
										}
									/>
								) : (
									<UnitControl
										value={ setting.heightValue }
										onChange={ ( value ) =>
											setting.onHeightChange(
												value,
												false
											)
										}
									/>
								) }
							</div>
						</ToolsPanelItem>
					);
				}

				if (
					! disableContainerAlign &&
					setting.hasOwnProperty( 'containerAlignValue' ) &&
					setting.hasOwnProperty( 'onContainerAlignChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					let options = [
						{
							value: '',
							label: __( 'Default', 'snow-monkey-blocks' ),
						},
						{
							value: 'wide',
							label: __( 'Wide width', 'snow-monkey-blocks' ),
						},
						{
							value: 'full',
							label: __( 'Full width', 'snow-monkey-blocks' ),
						},
					];

					if (
						setting.hasOwnProperty( 'contentsContainerControl' )
					) {
						options = options.concat( [
							{
								value: 'contents-wide',
								label: __(
									'Wide width (Only contents)',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'contents-full',
								label: __(
									'Full width (Only contents)',
									'snow-monkey-blocks'
								),
							},
						] );
					}

					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.containerAlignValue !==
								setting.defaultValue
							}
							isShownByDefault
							label={ __(
								'Container alignment',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setting.onContainerAlignChange(
									setting.defaultValue
								)
							}
						>
							<SelectControl
								label={ __(
									'Container alignment',
									'snow-monkey-blocks'
								) }
								value={ setting.containerAlignValue }
								onChange={ setting.onContainerAlignChange }
								options={ options }
							/>
						</ToolsPanelItem>
					);
				}

				if (
					! disableDisableContainerPadding &&
					setting.hasOwnProperty( 'disableContainerPaddingValue' ) &&
					setting.hasOwnProperty(
						'onDisableContainerPaddingChange'
					) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.disableContainerPaddingValue !==
								setting.defaultValue
							}
							isShownByDefault
							label={ __(
								'Remove container padding of the contents',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setting.onDisableContainerPaddingChange(
									setting.defaultValue
								)
							}
						>
							<ToggleControl
								label={ __(
									'Remove container padding of the contents',
									'snow-monkey-blocks'
								) }
								checked={ setting.disableContainerPaddingValue }
								onChange={
									setting.onDisableContainerPaddingChange
								}
							/>
						</ToolsPanelItem>
					);
				}

				if (
					! disableContentsMaxWidth &&
					setting.hasOwnProperty( 'contentsMaxWidthValue' ) &&
					setting.hasOwnProperty( 'onContentsMaxWidthChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.contentsMaxWidthValue !==
								setting.defaultValue
							}
							isShownByDefault
							label={ __(
								'Max width of the contents',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setting.onContentsMaxWidthChange(
									setting.defaultValue
								)
							}
						>
							<BaseControl
								label={ __(
									'Max width of the contents',
									'snow-monkey-blocks'
								) }
								id="snow-monkey-blocks/section/contents-max-width"
							>
								<WidthPicker
									value={ setting.contentsMaxWidthValue }
									onChange={
										setting.onContentsMaxWidthChange
									}
								/>
							</BaseControl>
						</ToolsPanelItem>
					);
				}

				if (
					! disableIsSlim &&
					setting.hasOwnProperty( 'isSlimValue' ) &&
					setting.hasOwnProperty( 'onIsSlimChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.isSlimValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __(
								'Make the contents width slim',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setting.onIsSlimChange( setting.defaultValue )
							}
						>
							<ToggleControl
								label={ __(
									'Make the contents width slim',
									'snow-monkey-blocks'
								) }
								checked={ setting.isSlimValue }
								onChange={ setting.onIsSlimChange }
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'paddingValue' ) &&
					setting.hasOwnProperty( 'onPaddingChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.paddingValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Padding', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onPaddingChange( setting.defaultValue )
							}
						>
							<SpacingControl
								label={ __( 'Padding', 'snow-monkey-blocks' ) }
								sides={
									!! setting.sides ? setting.sides : undefined
								}
								values={ setting.paddingValue }
								onChange={ setting.onPaddingChange }
								allowReset={ false }
							/>
						</ToolsPanelItem>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</ToolsPanel>
	);
};
