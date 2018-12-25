'use strict';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette, MediaPlaceholder } = wp.editor;
const { PanelBody, SelectControl, TextControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/pricing-table--item', {
	title: __( 'Pricing table item', 'snow-monkey-blocks' ),
	icon: 'warning',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/pricing-table' ],
	attributes: {
		title: {
			source: 'html',
			selector: '.smb-pricing-table__item__title',
		},
		price: {
			source: 'html',
			selector: '.smb-pricing-table__item__price',
		},
		lede: {
			source: 'html',
			selector: '.smb-pricing-table__item__lede',
		},
		list: {
			source: 'html',
			selector: 'ul',
		},
		btnLabel: {
			source: 'html',
			selector: '.smb-pricing-table__item__btn > .smb-btn__label',
		},
		btnURL: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-pricing-table__item__btn',
			attribute: 'href',
			default: '',
		},
		btnTarget: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-pricing-table__item__btn',
			attribute: 'target',
			default: '_self',
		},
		btnBackgroundColor: {
			type: 'string',
		},
		btnTextColor: {
			type: 'string',
		},
		imageID: {
			type: 'number',
			default: 0,
		},
		imageURL: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-pricing-table__item__figure > img',
			attribute: 'src',
			default: '',
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL } = attributes;

		const renderMedia = () => {
			if ( ! imageURL ) {
				return (
					<MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Image' ) } }
						onSelect={ ( media ) => {
							const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
							setAttributes( { imageURL: newImageURL } );
							setAttributes( { imageID: media.id } );
						} }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				);
			}

			return (
				<Fragment>
					<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
					<button
						className="smb-remove-button"
						onClick={ () => {
							setAttributes( { imageURL: '' } );
							setAttributes( { imageID: 0 } );
						} }
					>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
				</Fragment>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Pricing Table Item Settings', 'snow-monkey-blocks' ) }>
						<TextControl
							label={ __( 'URL', 'snow-monkey-blocks' ) }
							value={ btnURL }
							onChange={ ( value ) => setAttributes( { btnURL: value } ) }
						/>

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

						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ btnBackgroundColor }
								onChange={ ( value ) => setAttributes( { btnBackgroundColor: value } ) }
							/>
						</BaseControl>

						<BaseControl label={ __( 'Text Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ btnTextColor }
								onChange={ ( value ) => setAttributes( { btnTextColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="c-row__col">
					<div className="smb-pricing-table__item">
						{ ( !! imageID || isSelected ) &&
							<div className="smb-pricing-table__item__figure">
								{ renderMedia() }
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
									target={ btnTarget }
									style={ { backgroundColor: btnBackgroundColor } }
								>
									<RichText
										className="smb-btn__label"
										style={ { color: btnTextColor } }
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

	save( { attributes } ) {
		const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL } = attributes;

		return (
			<div className="c-row__col">
				<div className="smb-pricing-table__item">
					{ !! imageID &&
						<div className="smb-pricing-table__item__figure">
							<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
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
								target={ btnTarget }
								style={ { backgroundColor: btnBackgroundColor } }
							>
								<span className="smb-btn__label" style={ { color: btnTextColor } }>
									<RichText.Content value={ btnLabel } />
								</span>
							</a>
						</div>
					}
				</div>
			</div>
		);
	},
} );
