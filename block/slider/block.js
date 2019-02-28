'use strict';

import classnames from 'classnames';
import toNumber from '../../src/js/helper/to-number';
import generateUpdatedAttribute from '../../src/js/helper/generate-updated-attribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaPlaceholder, MediaUpload, RichText } = wp.editor;
const { PanelBody, RangeControl, ToggleControl, Button } = wp.components;
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
		rtl: _config.rtl,
	};
};

registerBlockType( 'snow-monkey-blocks/slider', {
	title: __( 'Slider', 'snow-monkey-blocks' ),
	icon: 'format-gallery',
	category: 'smb',
	attributes: schema,
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { slidesToShow, slidesToScroll, dots, arrows, items, content, speed, autoplaySpeed, rtl } = attributes;

		const classes = classnames( 'smb-slider', className );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Slider Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Number of items', 'snow-monkey-blocks' ) }
							value={ items }
							onChange={ ( value ) => setAttributes( { items: toNumber( value, 1, 20 ) } ) }
							min="1"
							max="20"
						/>
						<RangeControl
							label={ __( '# of slides to show', 'snow-monkey-blocks' ) }
							value={ slidesToShow }
							onChange={ ( value ) => setAttributes( { slidesToShow: toNumber( value, 1, 6 ) } ) }
							min="1"
							max="6"
						/>
						<RangeControl
							label={ __( '# of slides to scroll', 'snow-monkey-blocks' ) }
							value={ slidesToScroll }
							onChange={ ( value ) => setAttributes( { slidesToScroll: toNumber( value, 1, 6 ) } ) }
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
							onChange={ ( value ) => setAttributes( { speed: toNumber( value, 100, 1000 ) } ) }
							min="100"
							max="1000"
							step="100"
						/>
						<RangeControl
							label={ __( 'Autoplay Speed in seconds', 'snow-monkey-blocks' ) }
							value={ autoplaySpeed }
							onChange={ ( value ) => {
								setAttributes( { autoplaySpeed: toNumber( value, 0, 10 ) } );
								if ( 0 < autoplaySpeed ) {
									setAttributes( { autoplay: true } );
								} else {
									setAttributes( { autoplay: false } );
								}
							} }
							min="0"
							max="10"
						/>
						<ToggleControl
							label={ __( 'Change the slider\'s direction to become right-to-left', 'snow-monkey-blocks' ) }
							checked={ rtl }
							onChange={ ( value ) => setAttributes( { rtl: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<div className="smb-slider__canvas">
						{ times( items, ( index ) => {
							if ( ! isSelected && 0 < index ) {
								return false;
							}

							const imageID = get( content, [ index, 'imageID' ], 0 );
							const imageURL = get( content, [ index, 'imageURL' ], '' );
							const caption = get( content, [ index, 'caption' ], '' );

							const onSelectImage = ( media ) => {
								const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
								let newContent = content;
								newContent = generateUpdatedAttribute( newContent, index, 'imageURL', newImageURL );
								newContent = generateUpdatedAttribute( newContent, index, 'imageID', media.id );
								setAttributes( { content: newContent } );
							};

							const SliderItemFigureImg = () => {
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
														<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
													</Button>
												);
											} }
										/>
										{ isSelected &&
											<button
												className="smb-remove-button"
												onClick={ () => {
													let newContent = content;
													newContent = generateUpdatedAttribute( content, index, 'imageURL', '' );
													newContent = generateUpdatedAttribute( content, index, 'imageID', 0 );
													setAttributes( { content: newContent } );
												} }
											>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
										}
									</Fragment>
								);
							};

							return (
								<Fragment>
									{ ( !! imageID || isSelected ) &&
										<div className="smb-slider__item">
											<div className="smb-slider__item__figure">
												<SliderItemFigureImg />
											</div>

											{ ( ! RichText.isEmpty( caption ) || isSelected ) &&
												<RichText
													className="smb-slider__item__caption"
													placeholder={ __( 'Write caption...', 'snow-monkey-blocks' ) }
													value={ caption }
													onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'caption', value ) } ) }
												/>
											}
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

	save( { attributes, className } ) {
		const { slidesToShow, slidesToScroll, dots, arrows, items, content, speed, autoplay, autoplaySpeed, rtl } = attributes;

		const config = generateSliderConfig( {
			slidesToShow: slidesToShow,
			slidesToScroll: slidesToScroll,
			dots: dots,
			arrows: arrows,
			speed: speed,
			autoplay: autoplay,
			autoplaySpeed: autoplaySpeed * 1000,
			rtl: rtl,
		} );

		const classes = classnames( 'smb-slider', className );
		const dir = true === config.rtl ? 'rtl' : 'ltr';

		return (
			<div className={ classes }>
				<div className="smb-slider__canvas" dir={ dir } data-smb-slider={ JSON.stringify( config ) }>
					{ times( items, ( index ) => {
						const imageID = get( content, [ index, 'imageID' ], 0 );
						const imageURL = get( content, [ index, 'imageURL' ], '' );
						const caption = get( content, [ index, 'caption' ], '' );

						return (
							<Fragment>
								{ !! imageID &&
									<div className="smb-slider__item">
										<div className="smb-slider__item__figure">
											<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } data-image-id={ imageID } />
										</div>

										{ ! RichText.isEmpty( caption ) &&
											<div className="smb-slider__item__caption">
												<RichText.Content value={ caption } />
											</div>
										}
									</div>
								}
							</Fragment>
						);
					} ) }
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
