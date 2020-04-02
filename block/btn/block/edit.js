'use strict';

import classnames from 'classnames';

import { PanelBody, SelectControl, Popover } from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import LinkControl from '../../../src/js/component/link-control';

export default function( {
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
		backgroundColor,
		textColor,
		align,
	} = attributes;

	const wrapperClasses = classnames(
		'u-clearfix',
		'smb-btn-wrapper',
		className
	);

	const classes = classnames( 'smb-btn', {
		[ `smb-btn--${ modifier }` ]: !! modifier,
	} );

	const btnStyles = {
		backgroundColor: backgroundColor || undefined,
	};
	if ( 'is-style-ghost' === attributes.className ) {
		btnStyles.borderColor = backgroundColor || undefined;
	}

	const btnLabelStyles = {
		color: textColor || undefined,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __( 'Button size', 'snow-monkey-blocks' ) }
						value={ modifier }
						onChange={ ( value ) =>
							setAttributes( { modifier: value } )
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
							onChange: ( value ) =>
								setAttributes( { backgroundColor: value } ),
							label: __(
								'Background Color',
								'snow-monkey-blocks'
							),
						},
						{
							value: textColor,
							onChange: ( value ) =>
								setAttributes( { textColor: value } ),
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
					rel={
						'_self' === target ? undefined : 'noopener noreferrer'
					}
				>
					<RichText
						className="smb-btn__label"
						value={ content }
						keepPlaceholderOnFocus={ true }
						placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { content: value } )
						}
						style={ btnLabelStyles }
						allowedFormats={ [] }
					/>
				</span>
			</div>

			{ isSelected && (
				<Popover position={ ! align ? 'bottom left' : 'bottom center' }>
					<LinkControl
						url={ url }
						target={ target }
						onChange={ ( { url, opensInNewTab } ) => {
							setAttributes( {
								url,
								target: ! opensInNewTab ? '_self' : '_blank',
							} );
						} }
					/>
				</Popover>
			) }
		</>
	);
}
