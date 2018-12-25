'use strict';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText, ColorPalette, MediaPlaceholder } = wp.editor;
const { PanelBody, SelectControl, TextControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/items--item', {
	title: __( 'Items item', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/items' ],
	attributes: {
		titleTagName: {
			type: 'string',
			default: 'div',
		},
		title: {
			source: 'html',
			selector: '.smb-items__item__title',
		},
		lede: {
			source: 'html',
			selector: '.smb-items__item__lede',
		},
		summary: {
			source: 'html',
			selector: '.smb-items__item__content',
		},
		btnLabel: {
			source: 'html',
			selector: '.smb-items__item__btn > .smb-btn__label',
		},
		btnURL: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-items__item__btn',
			attribute: 'href',
			default: '',
		},
		btnTarget: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-items__item__btn',
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
			selector: '.smb-items__item__figure > img',
			attribute: 'src',
			default: '',
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { titleTagName, title, lede, summary, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL } = attributes;

		const titleTagNames = [ 'div', 'h2', 'h3' ];

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
					<PanelBody title={ __( 'Items Item Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Title Tag', 'snow-monkey-blocks' ) }>
							<div className="smb-list-icon-selector">
								{ times( titleTagNames.length, ( index ) => {
									return (
										<Button
											isDefault
											isPrimary={ titleTagName === titleTagNames[ index ] }
											onClick={ () => setAttributes( { titleTagName: titleTagNames[ index ] } ) }
										>
											{ titleTagNames[ index ] }
										</Button>
									);
								} ) }
							</div>
						</BaseControl>

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
					<div className="smb-items__item">
						{ ( !! imageID || isSelected ) &&
							<div className="smb-items__item__figure">
								{ renderMedia() }
							</div>
						}

						<RichText
							tagName={ titleTagName }
							className="smb-items__item__title"
							placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>

						{ ( ! RichText.isEmpty( lede ) || isSelected ) &&
							<RichText
								className="smb-items__item__lede"
								placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
								value={ lede }
								onChange={ ( value ) => setAttributes( { lede: value } ) }
							/>
						}

						{ ( ! RichText.isEmpty( summary ) || isSelected ) &&
							<RichText
								className="smb-items__item__content"
								placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
								value={ summary }
								onChange={ ( value ) => setAttributes( { summary: value } ) }
							/>
						}

						{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) &&
							<div className="smb-items__item__action">
								<span className="smb-items__item__btn smb-btn"
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
		const { titleTagName, title, lede, summary, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL } = attributes;

		return (
			<div className="c-row__col">
				<div className="smb-items__item">
					{ !! imageID &&
						<div className="smb-items__item__figure">
							<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
						</div>
					}

					<RichText.Content
						tagName={ titleTagName }
						className="smb-items__item__title"
						value={ title }
					/>

					{ ! RichText.isEmpty( lede ) &&
						<div className="smb-items__item__lede">
							<RichText.Content value={ lede } />
						</div>
					}

					{ ! RichText.isEmpty( summary ) &&
						<div className="smb-items__item__content">
							<RichText.Content value={ summary } />
						</div>
					}

					{ ( ! RichText.isEmpty( btnLabel ) && !! btnURL ) &&
						<div className="smb-items__item__action">
							<a className="smb-items__item__btn smb-btn"
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
