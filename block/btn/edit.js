import classnames from 'classnames';

import {
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
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

import { useState, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import LinkControl from '@smb/component/link-control';

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
} ) {
	const {
		content,
		url,
		target,
		modifier,
		borderRadius,
		backgroundColor,
		textColor,
		wrap,
	} = attributes;

	const [ isLinkUIOpen, setIsLinkUIOpen ] = useState( false );
	const urlIsSet = !! url;
	const urlIsSetandSelected = urlIsSet && isSelected;
	const toggleLinkUI = () => setIsLinkUIOpen( ! isLinkUIOpen );
	const closeLinkUI = () => setIsLinkUIOpen( false );

	// At old version, using .u-clearfix. but no need now.
	useEffect( () => {
		if ( !! attributes.className ) {
			setAttributes( {
				className: attributes.className.replace( 'u-clearfix', '' ),
			} );
		}
	}, [] );

	const wrapperClasses = classnames( 'smb-btn-wrapper', className, {
		[ `smb-btn-wrapper--${ modifier }` ]: !! modifier,
	} );

	const classes = classnames( 'smb-btn', {
		[ `smb-btn--${ modifier }` ]: !! modifier,
		'smb-btn--wrap': wrap,
	} );

	const btnStyles = {
		backgroundColor: backgroundColor || undefined,
		borderRadius:
			!! borderRadius || 0 <= borderRadius
				? `${ borderRadius }px`
				: undefined,
	};
	if (
		!! attributes.className &&
		attributes.className.split( ' ' ).includes( 'is-style-ghost' )
	) {
		btnStyles.borderColor = backgroundColor || undefined;
	}

	const btnLabelStyles = {
		color: textColor || undefined,
	};

	const ref = useRef();

	const blockProps = useBlockProps( {
		className: wrapperClasses,
		ref,
	} );

	const onChangeModifier = ( value ) =>
		setAttributes( {
			modifier: value,
		} );

	const onChangeBorderRadius = ( value ) =>
		setAttributes( {
			borderRadius: !! value || 0 <= value ? value : undefined,
		} );

	const onChangeBackgroundColor = ( value ) =>
		setAttributes( {
			backgroundColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeContent = ( value ) =>
		setAttributes( {
			content: value,
		} );

	const onChangeUrl = ( { url: newUrl, opensInNewTab } ) => {
		setAttributes( {
			url: newUrl,
			target: ! opensInNewTab ? '_self' : '_blank',
		} );
	};

	const onChangeWrap = ( value ) =>
		setAttributes( {
			wrap: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: backgroundColor,
							onColorChange: onChangeBackgroundColor,
							label: __(
								'Background color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: textColor,
							onColorChange: onChangeTextColor,
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorGradientSettings>

				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __( 'Button size', 'snow-monkey-blocks' ) }
						value={ modifier }
						onChange={ onChangeModifier }
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
						help={ __(
							'-If set to -1, the default border radius will be applied.',
							'snow-monkey-blocks'
						) }
						value={ borderRadius }
						onChange={ onChangeBorderRadius }
						min="-1"
						max="50"
						initialPosition="-1"
						allowReset
					/>

					<CheckboxControl
						label={ __( 'Wrap', 'snow-monkey-blocks' ) }
						checked={ wrap }
						onChange={ onChangeWrap }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<span
					className={ classes }
					href={ url }
					style={ btnStyles }
					target={ '_self' === target ? undefined : target }
					rel={
						'_self' === target ? undefined : 'noopener noreferrer'
					}
				>
					<RichText
						className="smb-btn__label"
						value={ content }
						placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
						onChange={ onChangeContent }
						style={ btnLabelStyles }
						withoutInteractiveFormatting={ true }
					/>
				</span>
			</div>

			<BlockControls group="block">
				{ ! urlIsSet && (
					<ToolbarButton
						icon={ linkIcon }
						label={ __( 'Link', 'snow-monkey-blocks' ) }
						aria-expanded={ isLinkUIOpen }
						onClick={ toggleLinkUI }
					/>
				) }
				{ urlIsSetandSelected && (
					<ToolbarButton
						isPressed
						icon={ linkOffIcon }
						label={ __( 'Unlink', 'snow-monkey-blocks' ) }
						onClick={ () => onChangeUrl( '', false ) }
					/>
				) }
			</BlockControls>

			{ ( isLinkUIOpen || urlIsSetandSelected ) && (
				<Popover
					position="bottom center"
					anchorRef={ ref.current }
					onClose={ closeLinkUI }
				>
					<LinkControl
						url={ url }
						target={ target }
						onChange={ onChangeUrl }
					/>
				</Popover>
			) }
		</>
	);
}
