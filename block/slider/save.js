import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { generateConfig } from './utils';

export default function ( { attributes, className } ) {
	const {
		slidesToShow,
		slidesToScroll,
		mdSlidesToShow,
		mdSlidesToScroll,
		smSlidesToShow,
		smSlidesToScroll,
		dots,
		arrows,
		speed,
		autoplay,
		autoplaySpeed,
		fade,
		rtl,
		aspectRatio,
	} = attributes;

	const config = generateConfig( {
		slidesToShow,
		slidesToScroll,
		mdSlidesToShow,
		mdSlidesToScroll,
		smSlidesToShow,
		smSlidesToScroll,
		dots,
		arrows,
		speed,
		autoplay,
		autoplaySpeed: autoplaySpeed * 1000,
		fade,
		rtl,
	} );

	const classes = classnames( 'smb-slider', className, {
		[ `smb-slider--${ aspectRatio }` ]: !! aspectRatio,
	} );

	const dir = true === config.rtl ? 'rtl' : 'ltr';

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div
				className="smb-slider__canvas"
				dir={ dir }
				data-smb-slider={ JSON.stringify( config ) }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
