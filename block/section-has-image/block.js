'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, ColorPalette, MediaPlaceholder } = wp.editor;
const { PanelBody, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/section-has-image', {
	title: __( 'Section (has image)', 'snow-monkey-blocks' ),
	icon: 'text',
	category: 'smb-section',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: '.smb-section__title',
			default: [],
		},
		backgroundColor: {
			type: 'string',
			default: null,
		},
		imageID: {
			type: 'number',
			default: 0,
		},
		imageURL: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-section-has-image__figure > img',
			attribute: 'src',
			default: '',
		},
		imagePosition: {
			type: 'string',
			default: 'right',
		},
		imageColumnSize: {
			type: 'number',
			default: 2,
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { title, backgroundColor, imageURL, imagePosition, imageColumnSize } = attributes;

		const renderMedia = () => {
			if ( ! imageURL ) {
				return (
					<MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Image' ), name: __( 'an image' ) } }
						onSelect={ ( media ) => {
							const newImageURL = !! media.sizes.large ? media.sizes.large.url : media.url;
							setAttributes( { imageURL: newImageURL, imageID: media.id } );
						} }
						accept="image/*"
						type="image"
					/>
				);
			}

			return (
				<div style={ { position: 'relative' } }>
					<img src={ imageURL } alt="" />
					<button
						style={ { position: 'absolute', top: '5px', right: '5px' } }
						className="smb-remove-button"
						onClick={ () => {
							setAttributes( { imageURL: '', imageID: 0 } );
						} }
					>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
				</div>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Section Settings', 'snow-monkey-blocks' ) }>
						<SelectControl
							label={ __( 'Image Position', 'snow-monkey-blocks' ) }
							value={ imagePosition }
							options={ [
								{
									value: 'right',
									label: __( 'Right side', 'snow-monkey-blocks' ),
								},
								{
									value: 'left',
									label: __( 'Left side', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
						/>

						<SelectControl
							label={ __( 'Image Column Size', 'snow-monkey-blocks' ) }
							value={ imageColumnSize }
							options={ [
								{
									value: '2',
									label: __( '75%', 'snow-monkey-blocks' ),
								},
								{
									value: '1',
									label: __( '33%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imageColumnSize: value } ) }
						/>

						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="smb-section smb-section-has-image" style={ { backgroundColor: backgroundColor } }>
					<div className="c-container">
						<div className={ classnames( 'c-row', 'c-row--margin', 'c-row--middle', { 'c-row--reverse': 'left' === imagePosition } ) }>
							<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ 3 - imageColumnSize }-3` }>
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
							<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ imageColumnSize }-3` }>
								<div className="smb-section-has-image__figure">
									{ renderMedia() }
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { title, backgroundColor, imageURL, imagePosition, imageColumnSize } = attributes;

		return (
			<div className="smb-section smb-section-has-image" style={ { backgroundColor: backgroundColor } }>
				<div className="c-container">
					<div className={ classnames( 'c-row', 'c-row--margin', 'c-row--middle', { 'c-row--reverse': 'left' === imagePosition } ) }>
						<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ 3 - imageColumnSize }-3` }>
							{ title.length > 0 &&
								<h2 className="smb-section__title">
									{ title }
								</h2>
							}
							<div className="smb-section__body">
								<InnerBlocks.Content />
							</div>
						</div>
						<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ imageColumnSize }-3` }>
							<div className="smb-section-has-image__figure">
								{ imageURL &&
									<img src={ imageURL } alt="" />
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
