import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { generateConfig } from './utils';

export default function ( { attributes, className } ) {
	const { arrows, speed, autoplay, autoplaySpeed } = attributes;

	const config = generateConfig( {
		arrows,
		speed,
		autoplay,
		autoplaySpeed: autoplaySpeed * 1000,
	} );

	const classes = classnames( 'smb-thumbnail-gallery', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div
				className="smb-thumbnail-gallery__canvas"
				data-smb-thumbnail-gallery={ JSON.stringify( config ) }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
