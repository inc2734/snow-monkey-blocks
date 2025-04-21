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
	InspectorControls,
	RichText,
	useBlockProps,
	LinkControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import { useToolsPanelDropdownMenuProps } from '@smb/helper';

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
} ) {
	const {
		content,
		url,
		target,
		modifier,
		borderRadius,
		backgroundColor,
		backgroundGradientColor,
		textColor,
		wrap,
	} = attributes;

	const spacingProps = useSpacingProps( attributes );

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const opensInNewTab = target === '_blank';

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	// At old version, using .u-clearfix. but no need now.
	useEffect( () => {
		if ( !! attributes.className ) {
			setAttributes( {
				className: attributes.className.replace( 'u-clearfix', '' ),
			} );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	const wrapperClasses = classnames( 'smb-btn-wrapper', className, {
		[ `smb-btn-wrapper--${ modifier }` ]: !! modifier,
	} );

	const classes = classnames( 'smb-btn', {
		[ `smb-btn--${ modifier }` ]: !! modifier,
		'smb-btn--wrap': wrap,
	} );

	const styles = {
		'--smb-btn--background-color': backgroundColor || undefined,
		'--smb-btn--background-image': backgroundGradientColor || undefined,
		'--smb-btn--border-radius': String( borderRadius ).match( /^\d+$/ )
			? `${ borderRadius }px`
			: borderRadius,
		'--smb-btn--color': textColor || undefined,
		...spacingProps.style,
	};

	if (
		!! attributes.className &&
		attributes.className.split( ' ' ).includes( 'is-style-ghost' )
	) {
		styles[ '--smb-btn--style--ghost--border-color' ] =
			backgroundColor || undefined;
	}

	const ref = useRef();
	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: wrapperClasses,
		ref: useMergeRefs( [ setPopoverAnchor, ref ] ),
	} );

	const dropdownMenuProps = useToolsPanelDropdownMenuProps();

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
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
					dropdownMenuProps={ dropdownMenuProps }
				>
					<ToolsPanelItem
						hasValue={ () =>
							modifier !== metadata.attributes.modifier.default
						}
						isShownByDefault
						label={ __( 'Button size', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								modifier: metadata.attributes.modifier.default,
							} )
						}
					>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __( 'Button size', 'snow-monkey-blocks' ) }
							value={ modifier }
							onChange={ ( value ) =>
								setAttributes( {
									modifier: value,
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
							wrap !== metadata.attributes.wrap.default
						}
						isShownByDefault
						label={ __( 'Wrap', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								wrap: metadata.attributes.wrap.default,
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Wrap', 'snow-monkey-blocks' ) }
							checked={ wrap }
							onChange={ ( value ) =>
								setAttributes( {
									wrap: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					{ ...useMultipleOriginColorsAndGradients() }
					panelId={ clientId }
					__experimentalIsRenderedInSidebar
					settings={ [
						{
							colorValue: backgroundColor,
							onColorChange: ( value ) =>
								setAttributes( {
									backgroundColor: value,
								} ),
							gradientValue: backgroundGradientColor,
							onGradientChange: ( value ) =>
								setAttributes( {
									backgroundGradientColor: value,
								} ),
							label: __(
								'Background color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: textColor,
							onColorChange: ( value ) =>
								setAttributes( {
									textColor: value,
								} ),
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
				/>
			</InspectorControls>

			<InspectorControls group="border">
				<ToolsPanelItem
					hasValue={ () =>
						borderRadius !==
						metadata.attributes.borderRadius.default
					}
					isShownByDefault
					label={ __( 'Border radius', 'snow-monkey-blocks' ) }
					onDeselect={ () =>
						setAttributes( {
							borderRadius:
								metadata.attributes.borderRadius.default,
						} )
					}
					panelId={ clientId }
				>
					<div className="smb-border-radius-control">
						<BorderRadiusControl
							values={ borderRadius }
							onChange={ ( value ) => {
								setAttributes( { borderRadius: value } );
							} }
						/>
					</div>
				</ToolsPanelItem>
			</InspectorControls>

			<div { ...blockProps }>
				<span
					className={ classes }
					href={ url }
					style={ styles }
					target={ '_self' === target ? undefined : target }
					rel={
						'_self' === target ? undefined : 'noopener noreferrer'
					}
				>
					<RichText
						className="smb-btn__label"
						value={ content }
						placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( {
								content: value,
							} )
						}
						withoutInteractiveFormatting={ true }
						ref={ richTextRef }
					/>
				</span>
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
						onChange={ ( {
							url: newUrl,
							opensInNewTab: newOpensInNewTab,
						} ) => {
							setAttributes( {
								url: newUrl,
								target: ! newOpensInNewTab ? '_self' : '_blank',
							} );
						} }
						onRemove={ () => {
							unlink();
							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ isEditingURL }
					/>
				</Popover>
			) }
		</>
	);
}
