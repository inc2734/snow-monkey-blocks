import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	BlockControls,
	ContrastChecker,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	LinkControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	Popover,
	RangeControl,
	ToolbarButton,
	BorderBoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { useMergeRefs } from '@wordpress/compose';
import { useState, useMemo, useRef } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';
import { prependHTTP } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

import PanelBoxShadowSettings from '@smb/component/panel-box-shadow-settings';
import { toNumber } from '@smb/helper';

import metadata from './block.json';

const NEW_TAB_REL = 'noreferrer noopener';
const NEW_TAB_TARGET = '_blank';
const NOFOLLOW_REL = 'nofollow';

const LINK_SETTINGS = [
	...LinkControl.DEFAULT_LINK_SETTINGS,
	{
		id: 'nofollow',
		title: __( 'Mark as nofollow', 'snow-monkey-blocks' ),
	},
];

/**
 * Updates the link attributes.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/button/get-updated-link-attributes.js
 *
 * @param {Object}  attributes               The current block attributes.
 * @param {string}  attributes.rel           The current link rel attribute.
 * @param {string}  attributes.url           The current link url.
 * @param {string}  attributes.title         The current link text.
 * @param {boolean} attributes.opensInNewTab Whether the link should open in a new window.
 * @param {boolean} attributes.nofollow      Whether the link should be marked as nofollow.
 */
export function getUpdatedLinkAttributes( {
	rel = '',
	url = '',
	title,
	opensInNewTab,
	nofollow,
} ) {
	let newLinkTarget;
	// Since `rel` is editable attribute, we need to check for existing values and proceed accordingly.
	let updatedRel = rel;

	if ( opensInNewTab ) {
		newLinkTarget = NEW_TAB_TARGET;
		updatedRel = updatedRel?.includes( NEW_TAB_REL )
			? updatedRel
			: updatedRel + ` ${ NEW_TAB_REL }`;
	} else {
		const relRegex = new RegExp( `\\b${ NEW_TAB_REL }\\s*`, 'g' );
		updatedRel = updatedRel?.replace( relRegex, '' ).trim();
	}

	if ( nofollow ) {
		updatedRel = updatedRel?.includes( NOFOLLOW_REL )
			? updatedRel
			: ( updatedRel + ` ${ NOFOLLOW_REL }` ).trim();
	} else {
		const relRegex = new RegExp( `\\b${ NOFOLLOW_REL }\\s*`, 'g' );
		updatedRel = updatedRel?.replace( relRegex, '' ).trim();
	}

	return {
		href: prependHTTP( url ),
		linkText: title,
		linkTarget: newLinkTarget,
		rel: updatedRel || undefined,
	};
}

export default function ( {
	attributes,
	setAttributes,
	clientId,
	isSelected,
} ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		borderColor,
		borderStyle,
		textColor,
		borderWidth,
		borderRadius,
		opacity,
		boxShadow,
		rel,
		href,
		linkText,
		linkTarget,
		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const ref = useRef();
	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const [ isEditingHref, setIsEditingHref ] = useState( false );
	const isHrefSet = !! href;
	const opensInNewTab = linkTarget === NEW_TAB_TARGET;
	const nofollow = !! rel?.includes( NOFOLLOW_REL );

	// Memoize link value to avoid overriding the LinkControl's internal state.
	// This is a temporary fix. See https://github.com/WordPress/gutenberg/issues/51256.
	const linkValue = useMemo(
		() => ( { url: href, title: linkText, opensInNewTab, nofollow } ),
		[ href, linkText, opensInNewTab, nofollow ]
	);

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingHref( true );
	}

	function unlink() {
		setAttributes( {
			href: undefined,
			linkTarget: undefined,
			rel: undefined,
		} );
		setIsEditingHref( false );
	}

	const styles = {
		'--smb-box--color': textColor || undefined,
		'--smb-box--border-radius': String( borderRadius ).match( /^\d+$/ )
			? `${ borderRadius }px`
			: borderRadius,
		'--smb-box--box-shadow': !! boxShadow.color
			? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
					boxShadow.blur
			  }px ${ boxShadow.spread }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
		'--smb-box--background-color': backgroundColor || undefined,
		'--smb-box--background-image': backgroundGradientColor || undefined,
		'--smb-box--background-opacity': String( opacity ),
		'--smb-box--border-color': borderColor || undefined,
		'--smb-box--border-style': borderStyle || undefined,
		'--smb-box--border-width': String( borderWidth ).match( /^\d+$/ )
			? `${ borderWidth }px`
			: borderWidth,
	};

	const classes = classnames( 'smb-box', { 'smb-box--has-link': isHrefSet } );

	const blockProps = useBlockProps( {
		ref: useMergeRefs( [ setPopoverAnchor, ref ] ),
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-box__body',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: textColor,
							onColorChange: ( value ) =>
								setAttributes( {
									textColor: value,
								} ),
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorGradientSettings>
			</InspectorControls>

			<InspectorControls group="border">
				<ToolsPanelItem
					hasValue={ () =>
						borderColor !==
							metadata.attributes.borderColor.default ||
						borderStyle !==
							metadata.attributes.borderStyle.default ||
						borderWidth !== metadata.attributes.borderWidth.default
					}
					isShownByDefault
					label={ __( 'Border', 'snow-monkey-blocks' ) }
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
					panelId={ clientId }
				>
					<BorderBoxControl
						{ ...useMultipleOriginColorsAndGradients() }
						__next40pxDefaultSize
						__experimentalIsRenderedInSidebar
						className="smb-border-box-control"
						enableAlpha={ true }
						enableStyle={ true }
						onChange={ ( value ) => {
							setAttributes( {
								borderColor: value?.color,
								borderWidth: value?.width,
								borderStyle: value?.style,
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

			<InspectorControls group="styles">
				<ToolsPanel label={ __( 'Background', 'snow-monkey-blocks' ) }>
					<div className="smb-color-gradient-settings-dropdown">
						<ColorGradientSettingsDropdown
							settings={ [
								{
									label: __( 'Color', 'snow-monkey-blocks' ),
									colorValue: backgroundColor,
									gradientValue: backgroundGradientColor,
									onColorChange: ( value ) =>
										setAttributes( {
											backgroundColor: value,
										} ),
									onGradientChange: ( value ) =>
										setAttributes( {
											backgroundGradientColor: value,
										} ),
								},
							] }
							__experimentalIsRenderedInSidebar
							{ ...useMultipleOriginColorsAndGradients() }
						/>
					</div>

					<ToolsPanelItem
						hasValue={ () =>
							opacity !== metadata.attributes.opacity.default
						}
						isShownByDefault
						label={ __( 'Opacity', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								opacity: metadata.attributes.opacity.default,
							} )
						}
					>
						<RangeControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __( 'Opacity', 'snow-monkey-blocks' ) }
							value={ opacity }
							onChange={ ( value ) =>
								setAttributes( {
									opacity: toNumber( value, 0, 1 ),
								} )
							}
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<PanelBoxShadowSettings
					settings={ [
						{
							colorValue: boxShadow.color,
							onColorChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										color: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.color,
						},
						{
							opacityValue: boxShadow.opacity,
							onOpacityChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										opacity: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.opacity,
						},
						{
							horizontalValue: boxShadow.horizontal,
							onHorizontalChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										horizontal: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default
									.horizontal,
						},
						{
							blurValue: boxShadow.blur,
							onBlurChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										blur: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.blur,
						},
						{
							spreadValue: boxShadow.spread,
							onSpreadChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										spread: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.spread,
						},
					] }
				/>
			</InspectorControls>

			<BlockControls group="block">
				{ ! isHrefSet && (
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ startEditing }
					/>
				) }
				{ isHrefSet && (
					<ToolbarButton
						name="link"
						icon={ linkOff }
						title={ __( 'Unlink' ) }
						shortcut={ displayShortcut.primaryShift( 'k' ) }
						onClick={ unlink }
						isActive={ true }
					/>
				) }
			</BlockControls>

			{ isSelected && ( isEditingHref || isHrefSet ) && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setIsEditingHref( false );
					} }
					anchor={ popoverAnchor }
					focusOnMount={ isEditingHref ? 'firstElement' : false }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ linkValue }
						onChange={ ( {
							url: newHref = '',
							title: newLinkText,
							opensInNewTab: newOpensInNewTab,
							nofollow: newNofollow,
						} ) => {
							setAttributes(
								getUpdatedLinkAttributes( {
									rel,
									url: newHref,
									title: newLinkText,
									opensInNewTab: newOpensInNewTab,
									nofollow: newNofollow,
								} )
							);
						} }
						onRemove={ () => {
							unlink();
						} }
						forceIsEditingLink={ isEditingHref }
						hasRichPreviews
						hasTextControl
						settings={ LINK_SETTINGS }
						showInitialSuggestions
						suggestionsQuery={ {
							// always show Pages as initial suggestions
							initialSuggestionsSearchOptions: {
								type: 'post',
								subtype: 'page',
								perPage: 20,
							},
						} }
					/>
				</Popover>
			) }

			<div { ...blockProps }>
				<div className="smb-box__background" />

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
