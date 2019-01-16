'use strict';

import { deprecated } from './_deprecated.js';
import { schema } from './_schema.js';

const { registerBlockType, createBlock } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings, MediaPlaceholder, MediaUpload, InnerBlocks, BlockControls } = wp.editor;
const { PanelBody, SelectControl, TextControl, Button, Toolbar, ToolbarButton } = wp.components;
const { Fragment } = wp.element;
const { select, dispatch } = wp.data;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/step--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	icon: 'editor-ol',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/step' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, clientId } ) {
		const onAddRow = () => {
			const block = createBlock( 'snow-monkey-blocks/step--item' );
			const rootClientId = select( 'core/editor' ).getBlockRootClientId( clientId );
			const clientOrder = select( 'core/editor' ).getBlockIndex( clientId, rootClientId );
			dispatch( 'core/editor' ).insertBlock( block, clientOrder + 1, rootClientId );
		};

		const { title, numberColor, imagePosition, imageID, imageURL, linkLabel, linkURL, linkTarget, linkColor } = attributes;

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id } );
		};

		const renderMedia = () => {
			if ( ! imageURL ) {
				return (
					<MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Image' ) } }
						onSelect={ onSelectImage }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				);
			}

			return (
				<Fragment>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ imageID }
						render={ ( obj ) => {
							return (
								<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
									<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
								</Button>
							);
						} }
					/>
					{ isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => {
								setAttributes( { imageURL: '', imageID: 0 } );
							} }
						>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
					}
				</Fragment>
			);
		};

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<ToolbarButton
							className="components-toolbar__control"
							label={ __( 'Add row', 'snow-monkey-blocks' ) }
							title={ __( 'Add row', 'snow-monkey-blocks' ) }
							icon="plus"
							onClick={ onAddRow }
						/>
					</Toolbar>
				</BlockControls>
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

					<div className="smb-step__item__body">
						{ ( !! imageID || isSelected ) &&
							<div className="smb-step__item__figure">
								{ renderMedia() }
							</div>
						}

						<div className="smb-step__item__summary">
							<InnerBlocks
								allowedBlocks={ [ 'core/paragraph', 'core/list' ] }
								templateLock={ false }
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
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { title, numberColor, imagePosition, imageID, imageURL, linkLabel, linkURL, linkTarget, linkColor } = attributes;

		return (
			<div className={ `smb-step__item smb-step__item--image-${ imagePosition }` }>
				<div className="smb-step__item__title">
					<div className="smb-step__item__number" style={ { backgroundColor: numberColor } }></div>
					<span>
						<RichText.Content value={ title } />
					</span>
				</div>

				<div className="smb-step__item__body">
					{ !! imageID &&
						<div className="smb-step__item__figure">
							<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
						</div>
					}

					<div className="smb-step__item__summary">
						<InnerBlocks.Content />

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
			</div>
		);
	},

	deprecated: deprecated,
} );
