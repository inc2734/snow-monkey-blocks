'use strict';

const { get, times } = lodash;
const { RichText } = wp.editor;
const { Fragment } = wp.element;

export const deprecated = [
	{
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
			rtl: {
				type: 'boolean',
				default: false,
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
