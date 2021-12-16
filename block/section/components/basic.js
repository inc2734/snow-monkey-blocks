import { times } from 'lodash';

import {
	BaseControl,
	Button,
	CheckboxControl,
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import WidthPicker from '@smb/component/width-picker';
import SpacingControl from '@smb/component/spacing-control';

export const PanelBasicSettings = ( {
	disableIsSlim,
	disableContentsMaxWidth,
	disableContainerAlign,
	disableDisableContainerPadding,
	settings,
} ) => {
	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

	return (
		<PanelBody title={ __( 'Block settings', 'snow-monkey-blocks' ) }>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'wrapperTagNameValue' ) &&
					setting.hasOwnProperty( 'onWrapperTagNameChange' )
				) {
					return (
						<BaseControl
							key={ index }
							label={ __( 'Wrapper tag', 'snow-monkey-blocks' ) }
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

										const isPrimary =
											setting.wrapperTagNameValue ===
											wrapperTagNames[ wrapperTagName ];
										return (
											<Button
												key={ wrapperTagName }
												isPrimary={ isPrimary }
												isSecondary={ ! isPrimary }
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
					);
				}

				if (
					setting.hasOwnProperty( 'titleTagNameValue' ) &&
					setting.hasOwnProperty( 'onTitleTagNameChange' )
				) {
					return (
						<BaseControl
							key={ index }
							label={ __( 'Title tag', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/section/title-tag-name"
						>
							<div className="smb-list-icon-selector">
								{ times(
									titleTagNames.length,
									( titleTagName ) => {
										const onClickButton = () => {
											setting.onTitleTagNameChange(
												titleTagNames[ titleTagName ]
											);
										};

										const isPrimary =
											setting.titleTagNameValue ===
											titleTagNames[ titleTagName ];
										return (
											<Button
												isPrimary={ isPrimary }
												isSecondary={ ! isPrimary }
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
					);
				}

				if (
					setting.hasOwnProperty( 'heightValue' ) &&
					setting.hasOwnProperty( 'onHeightChange' )
				) {
					return (
						<SelectControl
							key={ index }
							label={ __( 'Height', 'snow-monkey-blocks' ) }
							value={ setting.heightValue }
							options={ [
								{
									value: 'fit',
									label: __( 'Fit', 'snow-monkey-blocks' ),
								},
								{
									value: 'wide',
									label: __( 'Wide', 'snow-monkey-blocks' ),
								},
								{
									value: 'full',
									label: __( 'Full', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ setting.onHeightChange }
						/>
					);
				}

				if (
					! disableContainerAlign &&
					setting.hasOwnProperty( 'containerAlignValue' ) &&
					setting.hasOwnProperty( 'onContainerAlignChange' )
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
						<SelectControl
							key={ index }
							label={ __(
								'Container alignment',
								'snow-monkey-blocks'
							) }
							value={ setting.containerAlignValue }
							onChange={ setting.onContainerAlignChange }
							options={ options }
						/>
					);
				}

				if (
					! disableDisableContainerPadding &&
					setting.hasOwnProperty( 'disableContainerPaddingValue' ) &&
					setting.hasOwnProperty( 'onDisableContainerPaddingChange' )
				) {
					return (
						<CheckboxControl
							key={ index }
							label={ __(
								'Remove container padding of the contents',
								'snow-monkey-blocks'
							) }
							checked={ setting.disableContainerPaddingValue }
							onChange={ setting.onDisableContainerPaddingChange }
						/>
					);
				}

				if (
					! disableContentsMaxWidth &&
					setting.hasOwnProperty( 'contentsMaxWidthValue' ) &&
					setting.hasOwnProperty( 'onContentsMaxWidthChange' )
				) {
					return (
						<BaseControl
							key={ index }
							label={ __(
								'Max width of the contents',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/section/contents-max-width"
						>
							<WidthPicker
								value={ setting.contentsMaxWidthValue }
								onChange={ setting.onContentsMaxWidthChange }
							/>
						</BaseControl>
					);
				}

				if (
					! disableIsSlim &&
					setting.hasOwnProperty( 'isSlimValue' ) &&
					setting.hasOwnProperty( 'onIsSlimChange' )
				) {
					return (
						<ToggleControl
							key={ index }
							label={ __(
								'Make the contents width slim',
								'snow-monkey-blocks'
							) }
							checked={ setting.isSlimValue }
							onChange={ setting.onIsSlimChange }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'paddingValue' ) &&
					setting.hasOwnProperty( 'onPaddingChange' )
				) {
					return (
						<SpacingControl
							key={ index }
							label={ __( 'Padding', 'snow-monkey-blocks' ) }
							sides={
								!! setting.sides ? setting.sides : undefined
							}
							values={ setting.paddingValue }
							onChange={ setting.onPaddingChange }
						/>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</PanelBody>
	);
};
