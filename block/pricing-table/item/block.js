'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaPlaceholder, MediaUpload, PanelColorSettings, ContrastChecker, URLInput } = wp.editor;
const { PanelBody, BaseControl, SelectControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/pricing-table--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the pricing table block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#bd3c4f',
		src: 'warning',
	},
	category: 'smb',
	parent: [ 'snow-monkey-blocks/pricing-table' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL, imageAlt } = attributes;

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
		};

		const PricingTableItemFigureImg = () => {
			return ! imageURL ? (
				<MediaPlaceholder
					icon="format-image"
					labels={ { title: __( 'Image' ) } }
					onSelect={ onSelectImage }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
				/>
			) : (
				<Fragment>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ imageID }
						render={ ( obj ) => {
							return (
								<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
									<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
								</Button>
							);
						} }
					/>
					{ isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => {
								setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } );
							} }
						>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
					}
				</Fragment>
			);
		};

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
						<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) }>
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
								<PricingTableItemFigureImg />
							</div>
						}

						<RichText
							className="smb-pricing-table__item__title"
							placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
							value={ title }
							formattingControls={ [] }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>

						{ ( ! RichText.isEmpty( price ) || isSelected ) &&
							<RichText
								className="smb-pricing-table__item__price"
								placeholder={ __( 'Write price...', 'snow-monkey-blocks' ) }
								value={ price }
								formattingControls={ [] }
								onChange={ ( value ) => setAttributes( { price: value } ) }
							/>
						}

						{ ( ! RichText.isEmpty( lede ) || isSelected ) &&
							<RichText
								className="smb-pricing-table__item__lede"
								placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
								value={ lede }
								formattingControls={ [] }
								onChange={ ( value ) => setAttributes( { lede: value } ) }
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
										formattingControls={ [] }
										onChange={ ( value ) => setAttributes( { btnLabel: value } ) }
									/>
								</span>
							</div>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL, imageAlt } = attributes;

		const classes = classnames( 'c-row__col', className );

		const btnStyles = {
			backgroundColor: btnBackgroundColor || undefined,
		};

		const btnLabelStyles = {
			color: btnTextColor || undefined,
		};

		return (
			<div className={ classes }>
				<div className="smb-pricing-table__item">
					{ !! imageID &&
						<div className="smb-pricing-table__item__figure">
							<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
						</div>
					}

					<div className="smb-pricing-table__item__title">
						<RichText.Content value={ title } />
					</div>

					{ ! RichText.isEmpty( price ) &&
						<div className="smb-pricing-table__item__price">
							<RichText.Content value={ price } />
						</div>
					}

					{ ! RichText.isEmpty( lede ) &&
						<div className="smb-pricing-table__item__lede">
							<RichText.Content value={ lede } />
						</div>
					}

					<ul>
						<RichText.Content value={ list } />
					</ul>

					{ ( ! RichText.isEmpty( btnLabel ) || !! btnURL ) &&
						<div className="smb-pricing-table__item__action">
							<a className="smb-pricing-table__item__btn smb-btn"
								href={ btnURL }
								style={ btnStyles }
								target={ '_self' === btnTarget ? undefined : btnTarget }
								rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
							>
								<span className="smb-btn__label" style={ btnLabelStyles }>
									<RichText.Content value={ btnLabel } />
								</span>
							</a>
						</div>
					}
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
