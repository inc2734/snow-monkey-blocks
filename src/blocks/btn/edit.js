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
	RichText,
	useBlockProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

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
		backgroundGradientColor,
		textColor,
		wrap,
	} = attributes;

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
		'--smb-btn--border-radius':
			!! borderRadius || 0 <= borderRadius
				? `${ borderRadius }px`
				: undefined,
		'--smb-btn--color': textColor || undefined,
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

	const onChangeBackgroundGradientColor = ( value ) =>
		setAttributes( {
			backgroundGradientColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeContent = ( value ) =>
		setAttributes( {
			content: value,
		} );

	const onChangeUrl = ( {
		url: newUrl,
		opensInNewTab: newOpensInNewTab,
	} ) => {
		setAttributes( {
			url: newUrl,
			target: ! newOpensInNewTab ? '_self' : '_blank',
		} );
	};

	const onChangeWrap = ( value ) =>
		setAttributes( {
			wrap: value,
		} );

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
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: backgroundColor,
							onColorChange: onChangeBackgroundColor,
							gradientValue: backgroundGradientColor,
							onGradientChange: onChangeBackgroundGradientColor,
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
						onChange={ onChangeContent }
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
						onChange={ onChangeUrl }
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
