import classnames from 'classnames';

import {
	PanelBody,
	SelectControl,
	Popover,
	ToolbarGroup,
	Button,
	CheckboxControl,
	RangeControl,
	BaseControl,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	BlockControls,
	ColorPalette,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import LinkControl from '@smb/component/link-control';

export default function( {
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
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
	} = attributes;

	const [ isLinkUIOpen, setIsLinkUIOpen ] = useState( false );
	const toggleLinkUIOpen = () => setIsLinkUIOpen( ! isLinkUIOpen );
	const closeLinkUIOpen = () => setIsLinkUIOpen( false );
	useEffect( () => {
		if ( ! isSelected ) {
			closeLinkUIOpen();
		}
	}, [ isSelected ] );

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-btn-box', className );

	const btnClasses = classnames( 'smb-btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
		'smb-btn--wrap': btnWrap,
	} );

	const btnBoxStyle = {
		backgroundColor: backgroundColor || undefined,
	};

	const btnBoxBtnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
		borderRadius:
			'undefined' !== typeof btnBorderRadius
				? `${ btnBorderRadius }px`
				: undefined,
	};
	if ( 'is-style-ghost' === attributes.className ) {
		btnBoxBtnStyles.borderColor = btnBackgroundColor || undefined;
	}

	const onChangeBtnSize = ( value ) =>
		setAttributes( {
			btnSize: value,
		} );

	const onChangeBackgroundColor = ( value ) =>
		setAttributes( {
			backgroundColor: value,
		} );

	const onChangeBtnBackgroundColor = ( value ) =>
		setAttributes( {
			btnBackgroundColor: value,
		} );

	const onChangeBtnTextcolor = ( value ) =>
		setAttributes( {
			btnTextColor: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
		} );

	const onChangeBtnLabel = ( value ) =>
		setAttributes( {
			btnLabel: value,
		} );

	const onChangeNote = ( value ) =>
		setAttributes( {
			note: value,
		} );

	const onChangeBtnUrl = ( { url: newUrl, opensInNewTab } ) => {
		setAttributes( {
			btnURL: newUrl,
			btnTarget: ! opensInNewTab ? '_self' : '_blank',
		} );
	};

	const onChangeBtnBorderRadius = ( value ) =>
		setAttributes( {
			btnBorderRadius: value,
		} );

	const onChangeBtnWrap = ( value ) =>
		setAttributes( {
			btnWrap: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Button Settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __( 'Button size', 'snow-monkey-blocks' ) }
						value={ btnSize }
						onChange={ onChangeBtnSize }
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
						value={ btnBorderRadius }
						onChange={ onChangeBtnBorderRadius }
						min="0"
						max="50"
						initialPosition="6"
						allowReset
					/>

					<CheckboxControl
						label={ __( 'Wrap', 'snow-monkey-blocks' ) }
						checked={ btnWrap }
						onChange={ onChangeBtnWrap }
					/>

					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Background Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/btn-box/background-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ btnBackgroundColor }
							onChange={ onChangeBtnBackgroundColor }
						/>
					</BaseControl>

					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Text Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/btn-box/text-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ btnTextColor }
							onChange={ onChangeBtnTextcolor }
						/>
					</BaseControl>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __(
								'Background Color',
								'snow-monkey-blocks'
							),
						},
					] }
				>
					<ContrastChecker
						backgroundColor={ btnBackgroundColor }
						textColor={ btnTextColor }
					/>
				</PanelColorSettings>
			</InspectorControls>

			<BlockWrapper className={ classes } style={ btnBoxStyle }>
				<div className="c-container">
					{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
						<RichText
							className="smb-btn-box__lede"
							value={ lede }
							onChange={ onChangeLede }
							placeholder={ __(
								'Write lede…',
								'snow-monkey-blocks'
							) }
						/>
					) }

					<div className="smb-btn-box__btn-wrapper">
						<span
							className={ btnClasses }
							href={ btnURL }
							style={ btnBoxBtnStyles }
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
								keepPlaceholderOnFocus={ true }
								placeholder={ __(
									'Button',
									'snow-monkey-blocks'
								) }
								onChange={ onChangeBtnLabel }
								style={ { color: btnTextColor } }
							/>
						</span>
					</div>

					{ ( ! RichText.isEmpty( note ) || isSelected ) && (
						<RichText
							className="smb-btn-box__note"
							value={ note }
							onChange={ onChangeNote }
							placeholder={ __(
								'Write note…',
								'snow-monkey-blocks'
							) }
						/>
					) }
				</div>
			</BlockWrapper>

			<BlockControls>
				<ToolbarGroup>
					<Button
						icon="admin-links"
						className="components-toolbar__control"
						label={ __( 'Link', 'snow-monkey-blocks' ) }
						aria-expanded={ isLinkUIOpen }
						onClick={ toggleLinkUIOpen }
					/>

					{ !! btnURL && (
						<Button
							isPressed
							icon="editor-unlink"
							className="components-toolbar__control"
							label={ __( 'Unlink', 'snow-monkey-blocks' ) }
							onClick={ () => onChangeBtnUrl( '', false ) }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>

			{ isLinkUIOpen && (
				<Popover position="bottom center">
					<LinkControl
						url={ btnURL }
						target={ btnTarget }
						onChange={ onChangeBtnUrl }
					/>
				</Popover>
			) }
		</>
	);
}
