import classnames from 'classnames';

import { PanelBody, SelectControl, Popover } from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import LinkControl from '../../src/js/component/link-control';

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
	} = attributes;

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-btn-box', className );

	const btnClasses = classnames( 'smb-btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
	} );

	const btnBoxStyle = {
		backgroundColor: backgroundColor || undefined,
	};

	const btnBoxBtnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
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
									'Normal button',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'full',
								label: __(
									'Full button',
									'snow-monkey-blocks'
								),
							},
						] }
					/>
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
						{
							value: btnBackgroundColor,
							onChange: onChangeBtnBackgroundColor,
							label: __(
								'Background Color of Button',
								'snow-monkey-blocks'
							),
						},
						{
							value: btnTextColor,
							onChange: onChangeBtnTextcolor,
							label: __(
								'Text Color of Button',
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
							allowedFormats={ [] }
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
								allowedFormats={ [] }
							/>
						</span>
					</div>

					{ ( ! RichText.isEmpty( note ) || isSelected ) && (
						<RichText
							className="smb-btn-box__note"
							value={ note }
							onChange={ onChangeNote }
							allowedFormats={ [] }
							placeholder={ __(
								'Write note…',
								'snow-monkey-blocks'
							) }
						/>
					) }
				</div>

				{ isSelected && (
					<Popover position="bottom center">
						<LinkControl
							url={ btnURL }
							target={ btnTarget }
							onChange={ onChangeBtnUrl }
						/>
					</Popover>
				) }
			</BlockWrapper>
		</>
	);
}
