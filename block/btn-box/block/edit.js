'use strict';

import classnames from 'classnames';

import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	URLInput,
} from '@wordpress/block-editor';

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

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Button Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'URL', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/btn-box/btn-url"
					>
						<URLInput
							value={ btnURL }
							onChange={ ( value ) =>
								setAttributes( { btnURL: value } )
							}
						/>
					</BaseControl>

					<SelectControl
						label={ __( 'Target', 'snow-monkey-blocks' ) }
						value={ btnTarget }
						onChange={ ( value ) =>
							setAttributes( { btnTarget: value } )
						}
						options={ [
							{
								value: '_self',
								label: __( '_self', 'snow-monkey-blocks' ),
							},
							{
								value: '_blank',
								label: __( '_blank', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<SelectControl
						label={ __( 'Button size', 'snow-monkey-blocks' ) }
						value={ btnSize }
						onChange={ ( value ) =>
							setAttributes( { btnSize: value } )
						}
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
							onChange: ( value ) =>
								setAttributes( { backgroundColor: value } ),
							label: __(
								'Background Color',
								'snow-monkey-blocks'
							),
						},
						{
							value: btnBackgroundColor,
							onChange: ( value ) =>
								setAttributes( { btnBackgroundColor: value } ),
							label: __(
								'Background Color of Button',
								'snow-monkey-blocks'
							),
						},
						{
							value: btnTextColor,
							onChange: ( value ) =>
								setAttributes( { btnTextColor: value } ),
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

			<div className={ classes } style={ btnBoxStyle }>
				<div className="c-container">
					{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
						<RichText
							className="smb-btn-box__lede"
							value={ lede }
							onChange={ ( value ) =>
								setAttributes( { lede: value } )
							}
							allowedFormats={ [] }
							placeholder={ __(
								'Write lede...',
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
								onChange={ ( value ) =>
									setAttributes( { btnLabel: value } )
								}
								style={ { color: btnTextColor } }
								allowedFormats={ [] }
							/>
						</span>
					</div>

					{ ( ! RichText.isEmpty( note ) || isSelected ) && (
						<RichText
							className="smb-btn-box__note"
							value={ note }
							onChange={ ( value ) =>
								setAttributes( { note: value } )
							}
							allowedFormats={ [] }
							placeholder={ __(
								'Write note...',
								'snow-monkey-blocks'
							) }
						/>
					) }
				</div>
			</div>
		</>
	);
}
