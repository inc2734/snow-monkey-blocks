'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { get, times, merge } = lodash;
const { RichText, InnerBlocks } = wp.editor;
const { Fragment } = wp.element;
const { createBlock } = wp.blocks;

export const deprecated = [
	{
		attributes: schema,
		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes, className } ) {
			const { slidesToShow, slidesToScroll, dots, arrows, speed, autoplay, autoplaySpeed, fade, rtl } = attributes;

			const generateSliderConfig = ( _config ) => {
				return {
					slidesToShow: _config.slidesToShow,
					slidesToScroll: _config.slidesToScroll,
					dots: _config.dots,
					arrows: _config.arrows,
					speed: _config.speed,
					autoplay: _config.autoplay,
					autoplaySpeed: _config.autoplaySpeed,
					fade: fade,
					rtl: _config.rtl,
				};
			};

			const config = generateSliderConfig( {
				slidesToShow: slidesToShow,
				slidesToScroll: slidesToScroll,
				dots: dots,
				arrows: arrows,
				speed: speed,
				autoplay: autoplay,
				autoplaySpeed: autoplaySpeed * 1000,
				fade: fade,
				rtl: rtl,
			} );

			const classes = classnames( 'smb-slider', className );
			const dir = true === config.rtl ? 'rtl' : 'ltr';

			return (
				<div className={ classes }>
					<div className="smb-slider__canvas" dir={ dir } data-smb-slider={ JSON.stringify( config ) }>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: schema,
		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes, className } ) {
			const { slidesToShow, slidesToScroll, dots, arrows, speed, autoplay, autoplaySpeed, rtl } = attributes;

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
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: merge(
			schema,
			{
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
						caption: {
							source: 'html',
							selector: '.smb-slider__item__caption',
						},
					},
				},
				items: {
					type: 'number',
					default: 2,
				},
			}
		),

		supports: {
			align: [ 'wide', 'full' ],
		},

		migrate( attributes ) {
			const migratedInnerBlocks = () => {
				const length = ( 'undefined' === typeof attributes.content ) ? 0 : attributes.content.length;

				return times( length, ( index ) => {
					const imageID = get( attributes.content, [ index, 'imageID' ], 0 );
					const imageURL = get( attributes.content, [ index, 'imageURL' ], '' );
					const caption = get( attributes.content, [ index, 'caption' ], '' );

					return createBlock( 'snow-monkey-blocks/slider--item', {
						imageID: Number( imageID ),
						imageURL: imageURL,
						caption: caption,
					} );
				} );
			};

			return [
				{
					slidesToShow: attributes.slidesToShow,
					slidesToScroll: attributes.slidesToScroll,
					dots: attributes.dots,
					arrows: attributes.arrows,
					speed: attributes.speed,
					autoplay: attributes.autoplay,
					autoplaySpeed: attributes.autoplaySpeed,
					rtl: attributes.rtl,
				},
				migratedInnerBlocks(),
			];
		},

		save( { attributes, className } ) {
			const { slidesToShow, slidesToScroll, dots, arrows, content, speed, autoplay, autoplaySpeed, rtl } = attributes;
			const length = ( 'undefined' === typeof content ) ? 0 : content.length;

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
						{ times( length, ( index ) => {
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
	},
	{
		attributes: merge(
			schema,
			{
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
						caption: {
							source: 'html',
							selector: '.smb-slider__item__caption',
						},
					},
				},
				items: {
					type: 'number',
					default: 2,
				},
			}
		),

		save( { attributes } ) {
			const { slidesToShow, slidesToScroll, dots, arrows, items, content, speed, autoplay, autoplaySpeed, rtl } = attributes;

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

			return (
				<div className="smb-slider">
					<div className="smb-slider__canvas" dir={ true === config.rtl ? 'rtl' : 'ltr' } data-smb-slider={ JSON.stringify( config ) }>
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
	},
	{
		attributes: merge(
			schema,
			{
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
						caption: {
							source: 'html',
							selector: '.smb-slider__item__caption',
						},
					},
				},
				items: {
					type: 'number',
					default: 2,
				},
			}
		),

		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const { slidesToShow, slidesToScroll, dots, arrows, items, content, speed, autoplay, autoplaySpeed, rtl } = attributes;

			const _generateSliderConfig = ( _config ) => {
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

			const config = _generateSliderConfig( {
				slidesToShow: slidesToShow,
				slidesToScroll: slidesToScroll,
				dots: dots,
				arrows: arrows,
				speed: speed,
				autoplay: autoplay,
				autoplaySpeed: autoplaySpeed * 1000,
				rtl: rtl,
			} );

			return (
				<div className="smb-slider">
					<div className="smb-slider__canvas" dir={ true === config.rtl ? 'rtl' : 'ltr' } data-smb-slider={ JSON.stringify( config ) }>
						{ times( items, ( index ) => {
							const imageID = get( content, [ index, 'imageID' ], 0 );
							const imageURL = get( content, [ index, 'imageURL' ], '' );
							const caption = get( content, [ index, 'caption' ], '' );

							return (
								<Fragment>
									{ !! imageID &&
										<div className="smb-slider__item">
											<div className="smb-slider__item__figure">
												<img src={ imageURL } alt="" data-image-id={ imageID } />
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
	},
];
