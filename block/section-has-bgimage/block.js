'use strict';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, MediaUpload } = wp.editor;
const { Button, PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/section-has-bgimage', {
	title: __( 'Section (has background image)', 'snow-monkey-blocks' ),
	icon: 'text',
	category: 'smb-section',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: '.smb-section__title',
			default: [],
		},
		imageID: {
			type: 'number',
			default: 0,
		},
		imageURL: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-section-has-bgimage__bgimage > img',
			attribute: 'src',
			default: smb.pluginURL + 'block/section-has-bgimage/image.png',
		},
		height: {
			type: 'string',
			default: 'fit',
		},
		contentsAlignment: {
			type: 'string',
			default: 'left',
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { title, imageID, imageURL, height, contentsAlignment } = attributes;

		const renderImage = ( obj ) => {
			return (
				<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
					<img src={ imageURL } alt="" />
				</Button>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Section Settings', 'snow-monkey-blocks' ) }>
						<SelectControl
							label={ __( 'Height', 'snow-monkey-blocks' ) }
							value={ height }
							options={ [
								{
									value: 'fit',
									label: __( 'Fit', 'snow-monkey-blocks' ),
								},
								{
									value: 'wide',
									label: __( 'Wide', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { height: value } ) }
						/>

						<SelectControl
							label={ __( 'Contents alignment', 'snow-monkey-blocks' ) }
							value={ contentsAlignment }
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
							onChange={ ( value ) => setAttributes( { contentsAlignment: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ `smb-section smb-section-has-bgimage smb-section-has-bgimage--${ contentsAlignment } smb-section-has-bgimage--${ height }` }>
					<div className="smb-section-has-bgimage__bgimage">
						<MediaUpload
							onSelect={ ( media ) => {
								const newImageURL = !! media.sizes.xlarge ? media.sizes.xlarge.url : media.url;
								setAttributes( { imageURL: newImageURL, imageID: media.id } );
							} }
							type="image"
							value={ imageID }
							render={ renderImage }
						/>
					</div>
					<div className="c-container">
						{ ( title.length > 0 || isSelected ) &&
							<RichText
								className="smb-section__title"
								tagName="h2"
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
							/>
						}

						<div className="smb-section__body">
							<InnerBlocks />
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { title, imageURL, height, contentsAlignment } = attributes;

		return (
			<div className={ `smb-section smb-section-has-bgimage smb-section-has-bgimage--${ contentsAlignment } smb-section-has-bgimage--${ height }` }>
				<div className="smb-section-has-bgimage__bgimage">
					<img src={ imageURL } alt="" />
				</div>
				<div className="c-container">
					{ title.length > 0 &&
						<h2 className="smb-section__title">
							{ title }
						</h2>
					}
					<div className="smb-section__body">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
