'use strict';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings, MediaPlaceholder } = wp.editor;
const { PanelBody, SelectControl, TextControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/step--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	icon: 'editor-ol',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/step' ],
	attributes: {
		title: {
			source: 'html',
			selector: '.smb-step__item__title > span',
		},
		summary: {
			source: 'html',
			selector: '.smb-step__item__summary',
		},
		numberColor: {
			type: 'string',
		},
		imagePosition: {
			type: 'string',
			default: 'center',
		},
		imageID: {
			type: 'number',
			default: 0,
		},
		imageURL: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-step__item__figure > img',
			attribute: 'src',
			default: '',
		},
		linkLabel: {
			source: 'html',
			selector: '.smb-step__item__link__label',
		},
		linkURL: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-step__item__link',
			attribute: 'href',
			default: '',
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-step__item__link',
			attribute: 'target',
			default: '_self',
		},
		linkColor: {
			type: 'string',
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { title, summary, numberColor, imagePosition, imageID, imageURL, linkLabel, linkURL, linkTarget, linkColor } = attributes;

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
					<PanelBody title={ __( 'Item Settings', 'snow-monkey-blocks' ) }>
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
						<TextControl
							label={ __( 'Link URL', 'snow-monkey-blocks' ) }
							value={ linkURL }
							onChange={ ( value ) => setAttributes( { linkURL: value } ) }
						/>

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

				<div className={ `smb-step__item smb-step__item--image-${ imagePosition }` }>
					<div className="smb-step__item__title">
						<div className="smb-step__item__number" style={ { backgroundColor: numberColor } }></div>
						<span>
							<RichText
								placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
								value={ title }
								formattingControls={ [] }
								multiline={ false }
								onChange={ ( value ) => setAttributes( { title: value } ) }
							/>
						</span>
					</div>

					{ ( !! imageID || isSelected ) &&
						<div className="smb-step__item__figure">
							{ renderMedia() }
						</div>
					}

					<div className="smb-step__item__body">
						<RichText
							className="smb-step__item__summary"
							placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
							value={ summary }
							multiline="p"
							onChange={ ( value ) => setAttributes( { summary: value } ) }
						/>

						{ ( ! RichText.isEmpty( linkLabel ) || isSelected ) &&
							<span
								className="smb-step__item__link"
								href={ linkURL }
								target={ linkTarget }
								style={ { color: linkColor } }
							>
								<i className="fas fa-arrow-circle-right" />
								<RichText
									className="smb-step__item__link__label"
									placeholder={ __( 'Link text', 'snow-monkey-blocks' ) }
									value={ linkLabel }
									formattingControls={ [] }
									multiline={ false }
									onChange={ ( value ) => setAttributes( { linkLabel: value } ) }
								/>
							</span>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { title, summary, numberColor, imagePosition, imageID, imageURL, linkLabel, linkURL, linkTarget, linkColor } = attributes;

		return (
			<div className={ `smb-step__item smb-step__item--image-${ imagePosition }` }>
				<div className="smb-step__item__title">
					<div className="smb-step__item__number" style={ { backgroundColor: numberColor } }></div>
					<span>
						<RichText.Content value={ title } />
					</span>
				</div>

				{ !! imageID &&
					<div className="smb-step__item__figure">
						<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
					</div>
				}

				<div className="smb-step__item__body">
					<div className="smb-step__item__summary">
						<RichText.Content value={ summary } />
					</div>

					{ ! RichText.isEmpty( linkLabel ) &&
						<a
							className="smb-step__item__link"
							href={ linkURL }
							target={ linkTarget }
							style={ { color: linkColor } }
						>
							<i className="fas fa-arrow-circle-right" />
							<span className="smb-step__item__link__label">
								<RichText.Content value={ linkLabel } />
							</span>
						</a>
					}
				</div>
			</div>
		);
	},
} );
