'use strict';

import classnames from 'classnames';
import Figure from '../../../../../src/js/component/figure';

import {
	PanelBody,
	BaseControl,
	SelectControl,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	InnerBlocks,
	URLInput,
} from '@wordpress/block-editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, isSelected, className } ) {
	const { title, numberColor, imagePosition, imageID, imageURL, imageAlt, linkLabel, linkURL, linkTarget, linkColor } = attributes;

	const classes = classnames(
		'smb-step__item',
		`smb-step__item--image-${ imagePosition }`,
		className
	);

	const itemNumberStyles = {
		backgroundColor: numberColor || undefined,
	};

	const itemLinkStyles = {
		color: linkColor || undefined,
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<SelectControl
						label={ __( 'Image Position', 'snow-monkey-blocks' ) }
						value={ imagePosition }
						options={ [
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
							{
								value: 'center',
								label: __( 'Center', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Link Settings', 'snow-monkey-blocks' ) }>
					<BaseControl label={ __( 'Link URL', 'snow-monkey-blocks' ) } id="snow-monkey-blocks/step--item/link-url">
						<URLInput
							value={ linkURL }
							onChange={ ( value ) => setAttributes( { linkURL: value } ) }
						/>
					</BaseControl>

					<SelectControl
						label={ __( 'Link Target', 'snow-monkey-blocks' ) }
						value={ linkTarget }
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
						onChange={ ( value ) => setAttributes( { linkTarget: value } ) }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: numberColor,
							onChange: ( value ) => setAttributes( { numberColor: value } ),
							label: __( 'Number Color', 'snow-monkey-blocks' ),
						},
						{
							value: linkColor,
							onChange: ( value ) => setAttributes( { linkColor: value } ),
							label: __( 'Link Color', 'snow-monkey-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-step__item__title">
					<div className="smb-step__item__number" style={ itemNumberStyles } />
					<span>
						<RichText
							placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
							value={ title }
							multiline={ false }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</span>
				</div>

				<div className="smb-step__item__body">
					{ ( !! imageID || isSelected ) &&
						<div className="smb-step__item__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								selectHandler={ ( media ) => {
									const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
									setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
								} }
								removeHandler={ () => setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } ) }
								isSelected={ isSelected }
							/>
						</div>
					}

					<div className="smb-step__item__summary">
						<InnerBlocks />

						{ ( ! RichText.isEmpty( linkLabel ) || isSelected ) &&
							<span
								className="smb-step__item__link"
								href={ linkURL }
								style={ itemLinkStyles }
								target={ '_self' === linkTarget ? undefined : linkTarget }
								rel={ '_self' === linkTarget ? undefined : 'noopener noreferrer' }
							>
								<i className="fas fa-arrow-circle-right" />
								<RichText
									className="smb-step__item__link__label"
									placeholder={ __( 'Link text', 'snow-monkey-blocks' ) }
									value={ linkLabel }
									allowedFormats={ [] }
									multiline={ false }
									onChange={ ( value ) => setAttributes( { linkLabel: value } ) }
								/>
							</span>
						}
					</div>
				</div>
			</div>
		</Fragment>
	);
}
