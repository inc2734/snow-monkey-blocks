'use strict';

import classnames from 'classnames';

import {
	PanelBody,
	BaseControl,
	SelectControl,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	URLInput,
} from '@wordpress/editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const { content, url, target, modifier, backgroundColor, textColor } = attributes;

	const wrapperClasses = classnames( 'u-clearfix', 'smb-btn-wrapper', className );

	const classes = classnames(
		'smb-btn',
		{
			[ `smb-btn--${ modifier }` ]: !! modifier,
		}
	);

	const btnStyles = {
		backgroundColor: backgroundColor || undefined,
	};
	if ( 'is-style-ghost' === attributes.className ) {
		btnStyles.borderColor = backgroundColor || '#fff';
	}

	const btnLabelStyles = {
		color: textColor || undefined,
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) }>
						<URLInput
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>
					</BaseControl>
					<SelectControl
						label={ __( 'Target', 'snow-monkey-blocks' ) }
						value={ target }
						onChange={ ( value ) => setAttributes( { target: value } ) }
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
						value={ modifier }
						onChange={ ( value ) => setAttributes( { modifier: value } ) }
						options={ [
							{
								value: '',
								label: __( 'Normal size', 'snow-monkey-blocks' ),
							},
							{
								value: 'full',
								label: __( 'Full size', 'snow-monkey-blocks' ),
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
							onChange: ( value ) => setAttributes( { backgroundColor: value } ),
							label: __( 'Background Color', 'snow-monkey-blocks' ),
						},
						{
							value: textColor,
							onChange: ( value ) => setAttributes( { textColor: value } ),
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorSettings>
			</InspectorControls>

			<div className={ wrapperClasses }>
				<span
					className={ classes }
					href={ url }
					style={ btnStyles }
					target={ '_self' === target ? undefined : target }
					rel={ '_self' === target ? undefined : 'noopener noreferrer' }
				>
					<RichText
						className="smb-btn__label"
						value={ content }
						placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						style={ btnLabelStyles }
						formattingControls={ [] }
					/>
				</span>
			</div>
		</Fragment>
	);
}
