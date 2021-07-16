import { isEmpty } from 'lodash';

import {
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';

import { Button, ToolbarItem } from '@wordpress/components';

import { memo, useMemo } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

const ToolbarEditButton = ( {
	id,
	src,
	allowedTypes,
	accept,
	onSelect,
	onSelectURL,
	onRemove,
} ) => (
	<BlockControls group="inline">
		<MediaReplaceFlow
			mediaId={ id }
			mediaURL={ src }
			allowedTypes={ allowedTypes }
			accept={ accept }
			onSelect={ onSelect }
			onSelectURL={ onSelectURL }
		/>

		{ !! src && !! onRemove && (
			<ToolbarItem as={ Button } onClick={ onRemove }>
				{ __( 'Release', 'snow-monkey-blocks' ) }
			</ToolbarItem>
		) }
	</BlockControls>
);

const Image = ( { src, alt, id, style } ) => (
	<img
		src={ src }
		alt={ alt }
		className={ `wp-image-${ id }` }
		style={ style }
	/>
);

const Video = ( { src, style } ) => (
	<video controls src={ src } style={ style } />
);

const Figure = memo(
	( {
		id,
		src,
		alt,
		url,
		target,
		allowedTypes,
		accept,
		onSelect,
		onSelectURL,
		onRemove,
		mediaType,
		style,
		rel,
		linkClass,
	} ) => {
		let media;
		if ( 'image' === mediaType ) {
			media = <Image src={ src } alt={ alt } id={ id } style={ style } />;

			let newRel;
			if ( !! rel ) {
				newRel = isEmpty( rel ) ? undefined : rel;
			} else {
				newRel =
					'_self' === target || ! target
						? undefined
						: 'noopener noreferrer';
			}

			if ( !! url ) {
				media = (
					<span
						href={ url }
						target={ '_self' === target ? undefined : target }
						rel={ newRel }
						className={ linkClass }
					>
						{ media }
					</span>
				);
			}
		} else if ( 'video' === mediaType ) {
			media = <Video src={ src } style={ style } />;
		}

		return (
			<>
				<ToolbarEditButton
					id={ id }
					src={ src }
					allowedTypes={ allowedTypes }
					accept={ accept }
					onSelect={ onSelect }
					onSelectURL={ onSelectURL }
					onRemove={ onRemove }
				/>
				{ media }
			</>
		);
	},
	( p, n ) => {
		const keys = Object.keys( p );
		for ( const key of keys ) {
			if ( p[ key ] !== n[ key ] ) {
				return false;
			}
		}

		return true;
	}
);

export default function ( props ) {
	const {
		src,
		onSelect,
		onSelectURL,
		mediaType,
		allowedTypes = [ 'image' ],
	} = props;

	const mediaTypeFallback = ! mediaType && src ? 'image' : mediaType;

	let title = __( 'Media', 'snow-monkey-blocks' );
	if ( allowedTypes.length === 1 ) {
		if ( 'image' === allowedTypes[ 0 ] ) {
			title = __( 'Image', 'snow-monkey-blocks' );
		} else if ( 'video' === allowedTypes[ 0 ] ) {
			title = __( 'Video', 'snow-monkey-blocks' );
		}
	}

	const accept = useMemo( () => {
		return allowedTypes
			.map( ( type ) => {
				return `${ type }/*`;
			} )
			.join( ',' );
	}, [ allowedTypes ] );

	if ( ! src ) {
		return (
			<MediaPlaceholder
				icon="format-image"
				labels={ { title } }
				onSelect={ onSelect }
				onSelectURL={ onSelectURL }
				accept={ accept }
				allowedTypes={ allowedTypes }
			/>
		);
	}

	return (
		<Figure
			{ ...props }
			accept={ accept }
			mediaType={ mediaTypeFallback }
		/>
	);
}
