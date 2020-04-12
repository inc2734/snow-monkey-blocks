'use strict';

import {
	MediaPlaceholder,
	MediaUpload,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';

import { Button } from '@wordpress/components';
import { memo } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

export default function( props ) {
	const {
		src,
		id,
		alt,
		onSelect,
		onRemove,
		url,
		target,
		mediaType,
		allowedTypes = [ 'image' ],
	} = props;

	const accept = allowedTypes
		.map( ( type ) => {
			return `${ type }/*`;
		} )
		.join( ',' );

	if ( ! src ) {
		return (
			<MediaPlaceholder
				icon="format-image"
				labels={ { title: __( 'Image' ) } }
				onSelect={ onSelect }
				accept={ accept }
				allowedTypes={ allowedTypes }
			/>
		);
	}

	const ToolbarEditButton = memo( () => {
		return (
			<BlockControls>
				<MediaReplaceFlow
					mediaId={ id }
					mediaURL={ src }
					allowedTypes={ allowedTypes }
					accept={ accept }
					onSelect={ onSelect }
				/>
			</BlockControls>
		);
	} );

	const Image = memo( () => {
		return <img src={ src } alt={ alt } className={ `wp-image-${ id }` } />;
	} );

	const Video = memo( () => {
		return <video controls src={ src } />;
	} );

	const Figure = memo( () => {
		let media;
		if ( 'image' === mediaType ) {
			media = <Image />;
		} else if ( 'video' === mediaType ) {
			media = <Video />;
		}
		return (
			<>
				<ToolbarEditButton />
				{ media }
			</>
		);
	} );

	return !! url ? (
		<span
			href={ url }
			target={ '_self' === target ? undefined : target }
			rel={ '_self' === target ? undefined : 'noopener noreferrer' }
		>
			<Figure />
		</span>
	) : (
		<Figure />
	);
}
