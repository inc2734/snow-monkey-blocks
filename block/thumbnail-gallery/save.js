'use strict';

import classnames from 'classnames';
import { generateConfig } from './utils';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const { arrows, speed, autoplay, autoplaySpeed } = attributes;

	const config = generateConfig( {
		arrows: arrows,
		speed: speed,
		autoplay: autoplay,
		autoplaySpeed: autoplaySpeed * 1000,
	} );

	const classes = classnames( 'smb-thumbnail-gallery', className );

	return (
		<div className={ classes }>
			<div className="smb-thumbnail-gallery__canvas" data-smb-thumbnail-gallery={ JSON.stringify( config ) }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
