import classnames from 'classnames';

import { startsWith } from 'lodash';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const VARIABLE_REFERENCE_PREFIX = 'var:';
const VARIABLE_PATH_SEPARATOR_TOKEN_ATTRIBUTE = '|';
const VARIABLE_PATH_SEPARATOR_TOKEN_STYLE = '--';
function compileStyleValue( uncompiledValue ) {
	if ( startsWith( uncompiledValue, VARIABLE_REFERENCE_PREFIX ) ) {
		const variable = uncompiledValue
			.slice( VARIABLE_REFERENCE_PREFIX.length )
			.split( VARIABLE_PATH_SEPARATOR_TOKEN_ATTRIBUTE )
			.join( VARIABLE_PATH_SEPARATOR_TOKEN_STYLE );
		return `var(--wp--${ variable })`;
	}
	return uncompiledValue;
}

function compileGridStyleValue( uncompiledValue, max ) {
	if ( null == uncompiledValue ) {
		return undefined;
	}

	uncompiledValue = Number( uncompiledValue );

	if ( 0 === uncompiledValue ) {
		return undefined;
	}

	if ( max * -1 > uncompiledValue ) {
		return undefined;
	}

	if ( max < uncompiledValue ) {
		return undefined;
	}

	return String( uncompiledValue );
}

export default function ( { attributes, className } ) {
	const {
		mediaId,
		mediaUrl,
		mediaAlt,
		mediaWidth,
		mediaHeight,
		mediaType,
		focalPoint,
		columns,
		rows,
		maxWidth,
		fit,
		figureGridColumnStart,
		figureGridColumnEnd,
		figureGridRowStart,
		figureGridRowEnd,
		figureAspectRatio,
		maskColor,
		maskGradientColor,
		maskOpacity,
		bodyAlignSelf,
		bodyJustifySelf,
		bodyGridColumnStart,
		bodyGridColumnEnd,
		bodyGridRowStart,
		bodyGridRowEnd,
		bodyMaxWidth,
		bodyPadding,
		style,
	} = attributes;

	const isVideo = 'video' === mediaType;
	const isImage = 'image' === mediaType || undefined === mediaType;

	const classes = classnames( 'smb-hero-header', className, {
		'smb-hero-header--fit': fit,
	} );

	const styles = {
		'--smb-hero-header--columns': String( columns ) || undefined,
		'--smb-hero-header--rows': String( rows ) || undefined,
		'--smb-hero-header--max-gap': style?.spacing?.blockGap || undefined,
		'--smb-hero-header--object-position-x': !! focalPoint?.x
			? `${ focalPoint?.x * 100 }%`
			: undefined,
		'--smb-hero-header--object-position-y': !! focalPoint?.y
			? `${ focalPoint?.y * 100 }%`
			: undefined,
		'--smb-hero-header--max-width': maxWidth || undefined,
		'--smb-hero-header--figure-grid-column-start':
			( ! fit &&
				compileGridStyleValue( figureGridColumnStart, columns + 1 ) ) ||
			undefined,
		'--smb-hero-header--figure-grid-column-end':
			( ! fit &&
				compileGridStyleValue( figureGridColumnEnd, columns + 1 ) ) ||
			undefined,
		'--smb-hero-header--figure-grid-row-start':
			( ! fit &&
				compileGridStyleValue( figureGridRowStart, rows + 1 ) ) ||
			undefined,
		'--smb-hero-header--figure-grid-row-end':
			( ! fit && compileGridStyleValue( figureGridRowEnd, rows + 1 ) ) ||
			undefined,
		'--smb-hero-header--figure-aspect-ratio':
			( ! fit && figureAspectRatio ) || undefined,
		'--smb-hero-header--mask-color': maskColor || undefined,
		'--smb-hero-header--mask-image': maskGradientColor || undefined,
		'--smb-hero-header--mask-opacity':
			!! maskColor || !! maskGradientColor ? maskOpacity : undefined,
		'--smb-hero-header--body-align-self': bodyAlignSelf || undefined,
		'--smb-hero-header--body-justify-self': bodyJustifySelf || undefined,
		'--smb-hero-header--body-grid-column-start':
			compileGridStyleValue( bodyGridColumnStart, columns + 1 ) ||
			undefined,
		'--smb-hero-header--body-grid-column-end':
			compileGridStyleValue( bodyGridColumnEnd, columns + 1 ) ||
			undefined,
		'--smb-hero-header--body-grid-row-start':
			compileGridStyleValue( bodyGridRowStart, rows + 1 ) || undefined,
		'--smb-hero-header--body-grid-row-end':
			compileGridStyleValue( bodyGridRowEnd, rows + 1 ) || undefined,
		'--smb-hero-header--body-max-width': bodyMaxWidth || undefined,
		'--smb-hero-header--body-padding-top':
			compileStyleValue( bodyPadding?.top ) || undefined,
		'--smb-hero-header--body-padding-right':
			compileStyleValue( bodyPadding?.right ) || undefined,
		'--smb-hero-header--body-padding-bottom':
			compileStyleValue( bodyPadding?.bottom ) || undefined,
		'--smb-hero-header--body-padding-left':
			compileStyleValue( bodyPadding?.left ) || undefined,
	};

	const blockProps = useBlockProps.save( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'smb-hero-header__body',
	} );

	return (
		<div { ...blockProps }>
			{ !! mediaUrl && (
				<div className="smb-hero-header__figure">
					{ 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) ) && (
						<div className="smb-hero-header__mask" />
					) }

					{ isImage && (
						<img
							src={ mediaUrl }
							alt={ mediaAlt }
							width={ mediaWidth }
							height={ mediaHeight }
							className={ `wp-image-${ mediaId }` }
						/>
					) }

					{ isVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ mediaUrl }
							width={ mediaWidth }
							height={ mediaHeight }
						/>
					) }
				</div>
			) }

			<div { ...innerBlocksProps } />
		</div>
	);
}
