import { groupBy, reduce, get } from 'lodash';
import { registerBlockType } from '@wordpress/blocks';
import { registerFormatType } from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';

export const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}

	const { metadata, settings, name } = block;
	if ( metadata ) {
		if ( !! metadata.title ) {
			/* eslint @wordpress/i18n-no-variables: 0 */
			metadata.title = __( metadata.title, 'snow-monkey-blocks' );
			settings.title = metadata.title;
		}
		if ( !! metadata.description ) {
			/* eslint @wordpress/i18n-no-variables: 0 */
			metadata.description = __(
				metadata.description,
				'snow-monkey-blocks'
			);
			settings.description = metadata.description;
		}
		if ( !! metadata.keywords ) {
			/* eslint @wordpress/i18n-no-variables: 0 */
			metadata.keywords = __( metadata.keywords, 'snow-monkey-blocks' );
			settings.keywords = metadata.keywords;
		}
	}
	registerBlockType( { name, ...metadata }, settings );
};

export const registerFormat = ( format ) => {
	if ( ! format ) {
		return;
	}

	const { name, settings } = format;
	registerFormatType( name, settings );
};

export const toNumber = ( value, min = 0, max = null ) => {
	value = Number( value );

	if ( isNaN( value ) || value < min ) {
		value = min;
	}

	if ( null !== max && value > max ) {
		value = max;
	}

	return value;
};

export const getColumnSize = ( imageColumnSize ) => {
	let textColumnWidth = '1-3';
	let imageColumnWidth = '2-3';

	if ( 75 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-4';
		imageColumnWidth = '3-4';
	} else if ( 66 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-3';
		imageColumnWidth = '2-3';
	} else if ( 50 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-2';
		imageColumnWidth = '1-2';
	} else if ( 33 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '2-3';
		imageColumnWidth = '1-3';
	} else if ( 25 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '3-4';
		imageColumnWidth = '1-4';
	}

	return {
		textColumnWidth,
		mediaColumnWidth: imageColumnWidth,
		imageColumnWidth, // deprecated
	};
};

export const divider = ( type, level, color ) => {
	color = color ? color : '#fff';

	if ( 0 === level ) {
		return;
	}

	const renderTiltDivider = () => {
		return 0 > level ? (
			<path
				d={ `m100,${ 100 + level } L100,100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		) : (
			<path
				d={ `m0,${ 100 - level } L100,100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		);
	};

	const renderCurveDivider = () => {
		return 0 > level ? (
			<path
				d={ `m0,100 L100,100 Q50,${ level * 2 + 100 },0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		) : (
			<path
				d={ `m0,${ 100 - level } q50,${
					level * 2
				},100,0 V100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		);
	};

	const renderWaveDivider = () => {
		return 0 > level ? (
			<path
				d={ `m0,${
					100 + level / 2
				} q20,${ level },40,0 t40,0 t40,0 V100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		) : (
			<path
				d={ `m0,${
					100 - level / 2
				} q20,${ level },40,0 t40,0 t40,0 V100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		);
	};

	const renderTriangleDivider = () => {
		level = Math.abs( level );
		return (
			<path
				d={ `m${ ( 100 - level ) / 2 },100 l${ level },0 l${
					( -1 * level ) / 2
				},${ -1 * level } z` }
				strokeWidth="0"
				fill={ color }
			/>
		);
	};

	const renderPath = () => {
		switch ( type ) {
			case 'tilt':
				return renderTiltDivider();
			case 'curve':
				return renderCurveDivider();
			case 'wave':
				return renderWaveDivider();
			case 'triangle':
				return renderTriangleDivider();
		}
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			{ renderPath( type, level, color ) }
		</svg>
	);
};

/**
 * Returns terms in a tree form.
 *
 * @copyright torounit
 * @see https://github.com/torounit/advanced-posts-blocks/blob/master/src/util/terms.js
 * @param {Array} flatTerms Array of terms in flat format.
 * @return {Array} Array of terms in tree format.
 */
export const buildTermsTree = ( flatTerms ) => {
	const flatTermsWithParentAndChildren = flatTerms.map( ( term ) => {
		return {
			children: [],
			parent: null,
			...term,
		};
	} );

	const termsByParent = groupBy( flatTermsWithParentAndChildren, 'parent' );
	if ( termsByParent.null && termsByParent.null.length ) {
		return flatTermsWithParentAndChildren;
	}

	const fillWithChildren = ( terms ) => {
		return terms.map( ( term ) => {
			const children = termsByParent[ term.id ];
			return {
				...term,
				children:
					children && children.length
						? fillWithChildren( children )
						: [],
			};
		} );
	};

	return fillWithChildren( termsByParent[ '0' ] || [] );
};

/**
 * @see https://github.com/WordPress/gutenberg/blob/ddd3fffdd327d2f9c5202481345fb7427d4a822b/packages/block-library/src/media-text/edit.native.js#L69-L83
 * @param {Object} media
 * @return {string} image or video
 */
export const getMediaType = ( media ) => {
	if ( media.media_type ) {
		if ( media.media_type === 'image' ) {
			return 'image';
		}

		return 'video';
	}

	return media.type;
};

/**
 * Return resized image list
 *
 * @param {Array}  imageSizes
 * @param {Object} media      from getMedia()
 * @return {Object} list of url, width, height
 */
export const getResizedImages = ( imageSizes, media ) => {
	if ( ! media ) {
		return {};
	}

	return reduce(
		imageSizes,
		( currentSizes, size ) => {
			const defaultUrl = get( media, [ 'sizes', size.slug, 'url' ] );
			const mediaDetailsUrl = get( media, [
				'media_details',
				'sizes',
				size.slug,
				'source_url',
			] );

			const defaultWidth = get( media, [ 'sizes', size.slug, 'width' ] );
			const mediaDetailsWidth = get( media, [
				'media_details',
				'sizes',
				size.slug,
				'width',
			] );

			const defaultHeight = get( media, [
				'sizes',
				size.slug,
				'height',
			] );
			const mediaDetailsHeight = get( media, [
				'media_details',
				'sizes',
				size.slug,
				'height',
			] );

			return {
				...currentSizes,
				[ size.slug ]: {
					url: defaultUrl || mediaDetailsUrl,
					width: defaultWidth || mediaDetailsWidth,
					height: defaultHeight || mediaDetailsHeight,
				},
			};
		},
		{}
	);
};

/**
 * Return innerText from HTMLstring
 *
 * @param {string} text
 * @return {string} innerText
 */
export const stringToInnerText = ( text ) => {
	const wrapper = document.createElement( 'div' );
	wrapper.style.display = 'none';
	wrapper.innerHTML = text;
	return wrapper.innerText;
};

/**
 * @see https://github.com/WordPress/gutenberg/blob/3da717b8d0ac7d7821fc6d0475695ccf3ae2829f/packages/components/src/focal-point-picker/utils.js
 */
const VIDEO_EXTENSIONS = [
	'avi',
	'mpg',
	'mpeg',
	'mov',
	'mp4',
	'm4v',
	'ogg',
	'ogv',
	'webm',
	'wmv',
];

/**
 * Gets the extension of a file name.
 *
 * @see https://github.com/WordPress/gutenberg/blob/3da717b8d0ac7d7821fc6d0475695ccf3ae2829f/packages/components/src/focal-point-picker/utils.js
 * @param {string} filename The file name.
 * @return {string} The extension of the file name.
 */
export function getExtension( filename = '' ) {
	const parts = filename.split( '.' );
	return parts[ parts.length - 1 ];
}

/**
 * Checks if a file is a video.
 *
 * @see https://github.com/WordPress/gutenberg/blob/3da717b8d0ac7d7821fc6d0475695ccf3ae2829f/packages/components/src/focal-point-picker/utils.js
 * @param {string} filename The file name.
 * @return {boolean} Whether the file is a video.
 */
export function isVideoType( filename = '' ) {
	if ( ! filename ) return false;
	return VIDEO_EXTENSIONS.includes( getExtension( filename ) );
}
