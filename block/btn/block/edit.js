'use strict';

import classnames from 'classnames';

import {
	PanelBody,
	BaseControl,
	SelectControl,
	Popover,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

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

	const linkControlTarget = () => {
		if ( '_self' === target ) {
			return false;
		}

		if ( '_blank' === target ) {
			return true;
		}
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
						className="wp-block-navigation-link__inline-link-input"
						value={ { url, opensInNewTab: linkControlTarget() } }
						onChange={ ( { url: newUrl, opensInNewTab } ) => {
							setAttributes( {
								url: newUrl,
								target: ! opensInNewTab ? '_self' : '_blank',
							} );
						} }
					/>
				</Popover>
			) }
		</>
	);
}
