'use strict';

import classnames from 'classnames';
import { generateConfig } from './utils';

import {
	InnerBlocks,
} from '@wordpress/editor';

export default function( { attributes, className } ) {
	const { slidesToShow, slidesToScroll, mdSlidesToShow, mdSlidesToScroll, smSlidesToShow, smSlidesToScroll, dots, arrows, speed, autoplay, autoplaySpeed, fade, rtl } = attributes;

	const config = generateConfig( {
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToScroll,
		mdSlidesToShow: mdSlidesToShow,
		mdSlidesToScroll: mdSlidesToScroll,
		smSlidesToShow: smSlidesToShow,
		smSlidesToScroll: smSlidesToScroll,
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
}
