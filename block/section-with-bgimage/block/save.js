'use strict';

import classnames from 'classnames';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
		lgImageID,
		lgImageURL,
		lgImageAlt,
		lgImageMediaType,
		mdImageID,
		mdImageURL,
		mdImageAlt,
		mdImageMediaType,
		smImageID,
		smImageURL,
		smImageAlt,
		smImageMediaType,
		height,
		contentsAlignment,
		maskColor,
		maskColor2,
		maskColorAngle,
		maskOpacity,
		textColor,
		parallax,
		isSlim,
	} = attributes;

	const Wrapper = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		`smb-section-with-bgimage--${ contentsAlignment }`,
		`smb-section-with-bgimage--${ height }`,
		className,
		{
			'js-bg-parallax': !! parallax,
		}
	);

	const bgimageClasses = classnames( 'smb-section-with-bgimage__bgimage', {
		'js-bg-parallax__bgimage': !! parallax,
	} );

	const containerClasses = classnames( 'c-container', {
		'u-slim-width': !! isSlim,
	} );

	const sectionStyles = {
		color: textColor || undefined,
	};

	const maskStyles = {};
	if ( maskColor ) {
		maskStyles.backgroundColor = maskColor;
		if ( maskColor2 ) {
			maskStyles.backgroundImage = `linear-gradient(${ maskColorAngle }deg, ${ maskColor } 0%, ${ maskColor2 } 100%)`;
		}
	}

	const bgimageStyles = {
		opacity: maskOpacity,
	};

	return (
		<Wrapper className={ classes } style={ sectionStyles }>
			{ lgImageURL && (
				<div
					className={ classnames(
						bgimageClasses,
						'smb-section-with-bgimage__bgimage--lg'
					) }
				>
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
					{ ( 'image' === lgImageMediaType ||
						undefined === lgImageMediaType ) && (
						<img
							src={ lgImageURL }
							alt={ lgImageAlt }
							className={ `wp-image-${ lgImageID }` }
							style={ bgimageStyles }
						/>
					) }
					{ 'video' === lgImageMediaType && (
						<video
							playsinline
							loop
							autoPlay
							muted
							src={ lgImageURL }
							style={ bgimageStyles }
						/>
					) }
				</div>
			) }
			{ mdImageURL && (
				<div
					className={ classnames(
						bgimageClasses,
						'smb-section-with-bgimage__bgimage--md'
					) }
				>
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
					{ ( 'image' === mdImageMediaType ||
						undefined === mdImageMediaType ) && (
						<img
							src={ mdImageURL }
							alt={ mdImageAlt }
							className={ `wp-image-${ mdImageID }` }
							style={ bgimageStyles }
						/>
					) }
					{ 'video' === mdImageMediaType && (
						<video
							playsinline
							loop
							autoPlay
							muted
							src={ mdImageURL }
							style={ bgimageStyles }
						/>
					) }
				</div>
			) }
			{ smImageURL && (
				<div
					className={ classnames(
						bgimageClasses,
						'smb-section-with-bgimage__bgimage--sm'
					) }
				>
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
					{ ( 'image' === smImageMediaType ||
						undefined === smImageMediaType ) && (
						<img
							src={ smImageURL }
							alt={ smImageAlt }
							className={ `wp-image-${ smImageID }` }
							style={ bgimageStyles }
						/>
					) }
					{ 'video' === smImageMediaType && (
						<video
							playsinline
							loop
							autoPlay
							muted
							src={ smImageURL }
							style={ bgimageStyles }
						/>
					) }
				</div>
			) }
			<div className={ containerClasses }>
				{ ! RichText.isEmpty( title ) &&
					! RichText.isEmpty( subtitle ) &&
					'none' !== titleTagName && (
						<RichText.Content
							tagName="div"
							className="smb-section__subtitle"
							value={ subtitle }
						/>
					) }

				{ ! RichText.isEmpty( title ) && 'none' !== titleTagName && (
					<RichText.Content
						tagName={ titleTagName }
						className="smb-section__title"
						value={ title }
					/>
				) }

				{ ! RichText.isEmpty( title ) &&
					! RichText.isEmpty( lede ) &&
					'none' !== titleTagName && (
						<RichText.Content
							tagName="div"
							className="smb-section__lede"
							value={ lede }
						/>
					) }

				<div className="smb-section__body">
					<InnerBlocks.Content />
				</div>
			</div>
		</Wrapper>
	);
}
