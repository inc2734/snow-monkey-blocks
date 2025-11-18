import { groupBy } from 'lodash';

import { useViewportMatch } from '@wordpress/compose';

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

export const getColumnSize = ( imageColumnSize, textColumnSize = null ) => {
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

	if (
		!! textColumnSize &&
		100 - parseInt( imageColumnSize ) >= parseInt( textColumnSize )
	) {
		if ( 75 === parseInt( textColumnSize ) ) {
			textColumnWidth = '3-4';
		} else if ( 66 === parseInt( textColumnSize ) ) {
			textColumnWidth = '2-3';
		} else if ( 50 === parseInt( textColumnSize ) ) {
			textColumnWidth = '1-2';
		} else if ( 33 === parseInt( textColumnSize ) ) {
			textColumnWidth = '1-3';
		} else if ( 25 === parseInt( textColumnSize ) ) {
			textColumnWidth = '1-4';
		}
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

	const renderTriangleLargeDivider = () => {
		level = Math.abs( level );
		return (
			<path
				d={ `m0,100 l100,0 l-50,${ -1 * level } z` }
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
			case 'triangle-large':
				return renderTriangleLargeDivider();
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
	return ! filename
		? false
		: VIDEO_EXTENSIONS.includes( getExtension( filename ) );
}

/**
 * Generate CSS spacing properties.
 *
 * @param {Object} values
 * @return {Object} js padding value.
 */
export function generateSpacingProperties( values ) {
	if ( null == values ) {
		return {};
	}

	Object.keys( values ).forEach( ( key ) => {
		const value = values?.[ key ];
		if ( null === value || '' === value ) {
			values[ key ] = undefined;
		}
	} );

	const top = 0 === parseFloat( values?.top ) ? 0 : values?.top;
	const right = 0 === parseFloat( values?.right ) ? 0 : values?.right;
	const bottom = 0 === parseFloat( values?.bottom ) ? 0 : values?.bottom;
	const left = 0 === parseFloat( values?.left ) ? 0 : values?.left;

	if (
		( ( top === right ) === bottom ) === left &&
		'undefined' !== typeof top
	) {
		return {
			padding: top,
		};
	} else if (
		top === bottom &&
		right === left &&
		'undefined' !== typeof top &&
		'undefined' !== typeof right
	) {
		return {
			padding: `${ top } ${ right }`,
		};
	} else if (
		top !== bottom &&
		right === left &&
		'undefined' !== typeof top &&
		'undefined' !== typeof bottom &&
		'undefined' !== typeof right
	) {
		return {
			padding: `${ top } ${ right } ${ bottom }`,
		};
	}

	return {
		paddingTop: top,
		paddingRight: right,
		paddingBottom: bottom,
		paddingLeft: left,
	};
}

/**
 * Removed falsy values from nested object.
 *
 * @see https://github.com/WordPress/gutenberg/blob/857356c1602a42f342a61976ba67eb41284050ca/packages/block-editor/src/hooks/utils.js
 *
 * @param {*} object
 * @return {*} Object cleaned from falsy values
 */
export const cleanEmptyObject = ( object ) => {
	if (
		object === null ||
		typeof object !== 'object' ||
		Array.isArray( object )
	) {
		return object;
	}

	const cleanedNestedObjects = Object.entries( object )
		.map( ( [ key, value ] ) => [ key, cleanEmptyObject( value ) ] )
		.filter(
			( [ , value ] ) =>
				value !== undefined && value !== null && value !== ''
		);
	return ! cleanedNestedObjects.length
		? undefined
		: Object.fromEntries( cleanedNestedObjects );
};

export function boxLink( target, link ) {
	let down, up;

	if ( ! link ) {
		return;
	}

	target.addEventListener( 'pointerdown', ( event ) => {
		event.stopPropagation();
		down = +new Date();
	} );

	target.addEventListener( 'pointerup', ( event ) => {
		event.stopPropagation();

		if ( 0 !== event.button ) {
			return false;
		}

		if (
			[ 'A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA' ].includes(
				event.target?.tagName
			)
		) {
			return false;
		}

		up = +new Date();
		if ( up - down < 200 ) {
			const pressedKeys =
				event.shiftKey || event.ctrlKey || event.metaKey;
			if ( pressedKeys ) {
				const originalTarget = link.getAttribute( 'target' );
				const originalRel = link.getAttribute( 'rel' );
				link.setAttribute( 'target', '_blank' );
				link.setAttribute( 'rel', 'noopener noreferrer' );

				link.click();

				link.setAttribute( 'target', originalTarget || '' );
				link.setAttribute( 'rel', originalRel || '' );
			} else {
				link.click();
			}
		}
	} );
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/9122cc34fb1d972cdfc59614bf6f140a9b6f7d94/packages/block-library/src/utils/hooks.js
 */
export function useToolsPanelDropdownMenuProps() {
	const isMobile = useViewportMatch( 'medium', '<' );
	return ! isMobile
		? {
				popoverProps: {
					placement: 'left-start',
					// For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
					offset: 259,
				},
		  }
		: {};
}

/**
 * BorderRadiusControl が返す値を CSS で使える文字列へ変換する。
 *
 * - 数値なら px を付与
 * - 文字列ならそのまま
 * - オブジェクトの場合は各辺を並べて shorthand にする
 *
 * @param {number|string|Object} value
 * @return {string|undefined}
 */
export const toBorderRadiusValue = ( value ) => {
	if ( null == value ) {
		return undefined;
	}

	// BorderRadiusControl returns an object when per-corner values are used.
	if ( 'object' === typeof value && ! Array.isArray( value ) ) {
		const corners = [
			value.topLeft,
			value.topRight,
			value.bottomRight,
			value.bottomLeft,
		].map( ( v ) => {
			if ( null == v || '' === v ) {
				return '';
			}

			return /^\d+$/.test( String( v ) ) ? `${ v }px` : String( v );
		} );

		const nonEmptyCorners = corners.filter( Boolean );
		if ( 0 === nonEmptyCorners.length ) {
			return undefined;
		}

		// 4値すべて揃っている場合のみ CSS shorthand 最適化を行う。
		if ( 4 === nonEmptyCorners.length ) {
			const [ top, right, bottom, left ] = corners;

			if ( top === right && right === bottom && bottom === left ) {
				return top;
			}

			if ( top === bottom && right === left ) {
				return `${ top } ${ right }`;
			}

			if ( right === left ) {
				return `${ top } ${ right } ${ bottom }`;
			}
		}

		return nonEmptyCorners.join( ' ' );
	}

	return /^\d+$/.test( String( value ) ) ? `${ value }px` : value;
};
