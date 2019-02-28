'use strict';

import { schema } from './_schema.js';

const { get, times } = lodash;
const { RichText } = wp.editor;
const { Fragment } = wp.element;

export const deprecated = [
	{
		attributes: schema,

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
		attributes: schema,

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
