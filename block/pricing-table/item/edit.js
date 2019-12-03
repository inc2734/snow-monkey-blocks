'use strict';

import classnames from 'classnames';
import Figure from '../../../src/js/component/figure';

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
} from '@wordpress/block-editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, isSelected, className } ) {
	const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL, imageAlt } = attributes;

	const classes = classnames( 'c-row__col', className );

	const btnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
	};

	const btnLabelStyles = {
		color: btnTextColor || undefined,
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Button Settings', 'snow-monkey-blocks' ) }>
					<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) } id="snow-monkey-blocks/pricing-table--item/btn-url">
						<URLInput
							value={ btnURL }
							onChange={ ( value ) => setAttributes( { btnURL: value } ) }
						/>
					</BaseControl>

					<SelectControl
						label={ __( 'Target', 'snow-monkey-blocks' ) }
						value={ btnTarget }
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
						onChange={ ( value ) => setAttributes( { btnTarget: value } ) }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: btnBackgroundColor,
							onChange: ( value ) => setAttributes( { btnBackgroundColor: value } ),
							label: __( 'Background Color', 'snow-monkey-blocks' ),
						},
						{
							value: btnTextColor,
							onChange: ( value ) => setAttributes( { btnTextColor: value } ),
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				>
					<ContrastChecker
						backgroundColor={ btnBackgroundColor }
						textColor={ btnTextColor }
					/>
				</PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-pricing-table__item">
					{ ( !! imageID || isSelected ) &&
						<div className="smb-pricing-table__item__figure">
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

					<RichText
						className="smb-pricing-table__item__title"
						placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
						value={ title }
						allowedFormats={ [] }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						keepPlaceholderOnFocus={ true }
					/>

					{ ( ! RichText.isEmpty( price ) || isSelected ) &&
						<RichText
							className="smb-pricing-table__item__price"
							placeholder={ __( 'Write price...', 'snow-monkey-blocks' ) }
							value={ price }
							allowedFormats={ [] }
							onChange={ ( value ) => setAttributes( { price: value } ) }
							keepPlaceholderOnFocus={ true }
						/>
					}

					{ ( ! RichText.isEmpty( lede ) || isSelected ) &&
						<RichText
							className="smb-pricing-table__item__lede"
							placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
							value={ lede }
							allowedFormats={ [] }
							onChange={ ( value ) => setAttributes( { lede: value } ) }
							keepPlaceholderOnFocus={ true }
						/>
					}

					<RichText
						tagName="ul"
						multiline="li"
						value={ list }
						onChange={ ( value ) => setAttributes( { list: value } ) }
					/>

					{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) &&
						<div className="smb-pricing-table__item__action">
							<span className="smb-pricing-table__item__btn smb-btn"
								href={ btnURL }
								style={ btnStyles }
								target={ '_self' === btnTarget ? undefined : btnTarget }
								rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
							>
								<RichText
									className="smb-btn__label"
									style={ btnLabelStyles }
									value={ btnLabel }
									placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
									allowedFormats={ [] }
									onChange={ ( value ) => setAttributes( { btnLabel: value } ) }
								/>
							</span>
						</div>
					}
				</div>
			</div>
		</Fragment>
	);
}
