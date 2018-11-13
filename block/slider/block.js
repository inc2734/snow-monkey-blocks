'use strict';

import generateUpdatedAttribute from '../../src/js/helper/generate-updated-attribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaPlaceholder } = wp.editor;
const { PanelBody, RangeControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const generateSliderConfig = ( _config ) => {
	return {
		slidesToShow: _config.slidesToShow,
		slidesToScroll: _config.slidesToScroll,
		dots: _config.dots,
		arrows: _config.arrows,
		speed: _config.speed,
		autoplay: _config.autoplay,
		autoplaySpeed: _config.autoplaySpeed,
	};
};

registerBlockType( 'snow-monkey-blocks/slider', {
	title: __( 'Slider', 'snow-monkey-blocks' ),
	icon: 'format-gallery',
	category: 'smb',
	attributes: {
		slidesToShow: {
			type: 'number',
			default: 1,
		},
		slidesToScroll: {
			type: 'number',
			default: 1,
		},
		dots: {
			type: 'boolean',
			default: false,
		},
		arrows: {
			type: 'boolean',
			default: true,
		},
		speed: {
			type: 'number',
			default: 300,
		},
		autoplay: {
			type: 'boolean',
			default: false,
		},
		autoplaySpeed: {
			type: 'number',
			default: 0,
		},
		content: {
			type: 'array',
			source: 'query',
			selector: '.smb-slider__item',
			default: [],
			query: {
				imageID: {
					type: 'number',
					source: 'attribute',
					selector: '.smb-slider__item__figure > img',
					attribute: 'data-image-id',
					default: 0,
				},
				imageURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-slider__item__figure > img',
					attribute: 'src',
					default: '',
				},
			},
		},
		items: {
			type: 'number',
			default: 2,
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { slidesToShow, slidesToScroll, dots, arrows, items, content, speed, autoplaySpeed } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Slider Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Number of items', 'snow-monkey-blocks' ) }
							value={ items }
							onChange={ ( value ) => setAttributes( { items: value } ) }
							min="1"
							max="20"
						/>
						<RangeControl
							label={ __( '# of slides to show', 'snow-monkey-blocks' ) }
							value={ slidesToShow }
							onChange={ ( value ) => setAttributes( { slidesToShow: value } ) }
							min="1"
							max="6"
						/>
						<RangeControl
							label={ __( '# of slides to scroll', 'snow-monkey-blocks' ) }
							value={ slidesToScroll }
							onChange={ ( value ) => setAttributes( { slidesToScroll: value } ) }
							min="1"
							max="6"
						/>
						<ToggleControl
							label={ __( 'Show dot indicators', 'snow-monkey-blocks' ) }
							checked={ dots }
							onChange={ ( value ) => setAttributes( { dots: value } ) }
						/>
						<ToggleControl
							label={ __( 'Prev/Next Arrows', 'snow-monkey-blocks' ) }
							checked={ arrows }
							onChange={ ( value ) => setAttributes( { arrows: value } ) }
						/>
						<RangeControl
							label={ __( 'Slide animation speed in milliseconds', 'snow-monkey-blocks' ) }
							value={ speed }
							onChange={ ( value ) => setAttributes( { speed: value } ) }
							min="100"
							max="1000"
							step="100"
						/>
						<RangeControl
							label={ __( 'Autoplay Speed in seconds', 'snow-monkey-blocks' ) }
							value={ autoplaySpeed }
							onChange={ ( value ) => {
								setAttributes( { autoplaySpeed: value } );
								if ( 0 < autoplaySpeed ) {
									setAttributes( { autoplay: true } );
								} else {
									setAttributes( { autoplay: false } );
								}
							} }
							min="0"
							max="10"
						/>
					</PanelBody>
				</InspectorControls>

				<div className="smb-slider">
					<div className="smb-slider__canvas">
						{ times( items, ( index ) => {
							if ( ! isSelected && 0 < index ) {
								return false;
							}

							const imageID = get( content, [ index, 'imageID' ], 0 );
							const imageURL = get( content, [ index, 'imageURL' ], '' );

							const renderMedia = () => {
								if ( ! imageURL ) {
									return (
										<MediaPlaceholder
											icon="format-image"
											labels={ { title: __( 'Image' ), instructions: ' ' } }
											onSelect={ ( media ) => {
												const newImageURL = !! media.sizes.large ? media.sizes.large.url : media.url;
												let newContent = content;
												newContent = generateUpdatedAttribute( newContent, index, 'imageURL', newImageURL );
												newContent = generateUpdatedAttribute( newContent, index, 'imageID', media.id );
												setAttributes( { content: newContent } );
											} }
											accept="image/*"
											allowedTypes={ [ 'image' ] }
										/>
									);
								}

								return (
									<Fragment>
										<img src={ imageURL } alt="" />
										<button
											className="smb-remove-button"
											onClick={ () => {
												setAttributes( { content: generateUpdatedAttribute( content, index, 'imageURL', '' ) } );
												setAttributes( { content: generateUpdatedAttribute( content, index, 'imageID', 0 ) } );
											} }
										>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
									</Fragment>
								);
							};

							return (
								<Fragment>
									{ ( !! imageID || isSelected ) &&
										<div className="smb-slider__item">
											<div className="smb-step__item__figure">
												{ renderMedia() }
											</div>
										</div>
									}
								</Fragment>
							);
						} ) }
					</div>

					{ isSelected &&
						<div className="smb-add-item-button-wrapper">
							{ items > 0 &&
								<button className="smb-remove-item-button" onClick={ () => setAttributes( { items: items - 1 } ) }>
									<FontAwesomeIcon icon="minus-circle" />
								</button>
							}

							<button className="smb-add-item-button" onClick={ () => setAttributes( { items: items + 1 } ) }>
								<FontAwesomeIcon icon="plus-circle" />
							</button>
						</div>
					}
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { slidesToShow, slidesToScroll, dots, arrows, items, content, speed, autoplay, autoplaySpeed } = attributes;

		const config = generateSliderConfig( {
			slidesToShow: slidesToShow,
			slidesToScroll: slidesToScroll,
			dots: dots,
			arrows: arrows,
			speed: speed,
			autoplay: autoplay,
			autoplaySpeed: autoplaySpeed * 1000,
		} );

		return (
			<div className="smb-slider">
				<div className="smb-slider__canvas" data-smb-slider={ JSON.stringify( config ) }>
					{ times( items, ( index ) => {
						const imageID = get( content, [ index, 'imageID' ], 0 );
						const imageURL = get( content, [ index, 'imageURL' ], '' );

						return (
							<Fragment>
								{ !! imageID &&
									<div className="smb-slider__item">
										<div className="smb-slider__item__figure">
											<img src={ imageURL } alt="" data-image-id={ imageID } />
										</div>
									</div>
								}
							</Fragment>
						);
					} ) }
				</div>
			</div>
		);
	},
} );
