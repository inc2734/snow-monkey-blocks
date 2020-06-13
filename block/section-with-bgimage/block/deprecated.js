'use strict';

import classnames from 'classnames';
import { omit } from 'lodash';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

import blockAttributes from './attributes.json';

export default [
	{
		attributes: {
			...blockAttributes,
			textColor: {
				type: 'string',
				default: '#fff',
			},
		},

		save( { attributes, className } ) {
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

			const bgimageClasses = classnames(
				'smb-section-with-bgimage__bgimage',
				{
					'js-bg-parallax__bgimage': !! parallax,
				}
			);

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

						{ ! RichText.isEmpty( title ) &&
							'none' !== titleTagName && (
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
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
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

			const bgimageClasses = classnames(
				'smb-section-with-bgimage__bgimage',
				{
					'js-bg-parallax__bgimage': !! parallax,
				}
			);

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
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
					{ lgImageURL && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--lg'
							) }
							style={ bgimageStyles }
						>
							{ ( 'image' === lgImageMediaType ||
								undefined === lgImageMediaType ) && (
								<img
									src={ lgImageURL }
									alt={ lgImageAlt }
									className={ `wp-image-${ lgImageID }` }
								/>
							) }
							{ 'video' === lgImageMediaType && (
								<video
									playsinline
									loop
									autoPlay
									muted
									src={ lgImageURL }
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
							style={ bgimageStyles }
						>
							{ ( 'image' === mdImageMediaType ||
								undefined === mdImageMediaType ) && (
								<img
									src={ mdImageURL }
									alt={ mdImageAlt }
									className={ `wp-image-${ mdImageID }` }
								/>
							) }
							{ 'video' === lgImageMediaType && (
								<video
									playsinline
									loop
									autoPlay
									muted
									src={ mdImageURL }
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
							style={ bgimageStyles }
						>
							{ ( 'image' === smImageMediaType ||
								undefined === smImageMediaType ) && (
								<img
									src={ smImageURL }
									alt={ smImageAlt }
									className={ `wp-image-${ smImageID }` }
								/>
							) }
							{ 'video' === lgImageMediaType && (
								<video
									playsinline
									loop
									autoPlay
									muted
									src={ smImageURL }
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

						{ ! RichText.isEmpty( title ) &&
							'none' !== titleTagName && (
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
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		migrate( attributes ) {
			const lgImageID = attributes.imageID;
			const lgImageURL = attributes.imageURL;
			const lgImageAlt = attributes.imageAlt;
			return { ...attributes, lgImageID, lgImageURL, lgImageAlt };
		},

		save( { attributes, className } ) {
			const {
				wrapperTagName,
				titleTagName,
				title,
				imageID,
				imageURL,
				imageAlt,
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

			const bgimageClasses = classnames(
				'smb-section-with-bgimage__bgimage',
				{
					'js-bg-parallax__bgimage': !! parallax,
				}
			);

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
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
					{ imageURL && (
						<div
							className={ bgimageClasses }
							style={ bgimageStyles }
						>
							<img
								src={ imageURL }
								alt={ imageAlt }
								className={ `wp-image-${ imageID }` }
							/>
						</div>
					) }
					<div className={ containerClasses }>
						{ ! RichText.isEmpty( title ) &&
							'none' !== titleTagName && (
								<RichText.Content
									tagName={ titleTagName }
									className="smb-section__title"
									value={ title }
								/>
							) }
						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</Wrapper>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
			const {
				titleTagName,
				title,
				imageID,
				imageURL,
				imageAlt,
				height,
				contentsAlignment,
				maskColor,
				maskOpacity,
				textColor,
				parallax,
				isSlim,
			} = attributes;

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

			const bgimageClasses = classnames(
				'smb-section-with-bgimage__bgimage',
				{
					'js-bg-parallax__bgimage': !! parallax,
				}
			);

			const containerClasses = classnames( 'c-container', {
				'u-slim-width': !! isSlim,
			} );

			const sectionStyles = {
				color: textColor || undefined,
			};

			const maskStyles = {
				backgroundColor: maskColor || undefined,
			};

			const bgimageStyles = {
				opacity: maskOpacity,
			};

			return (
				<div className={ classes } style={ sectionStyles }>
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
					<div className={ bgimageClasses } style={ bgimageStyles }>
						<img
							src={ imageURL }
							alt={ imageAlt }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
					<div className={ containerClasses }>
						{ ! RichText.isEmpty( title ) &&
							'none' !== titleTagName && (
								<RichText.Content
									tagName={ titleTagName }
									className="smb-section__title"
									value={ title }
								/>
							) }
						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		migrate( attributes ) {
			const isSlim = !! attributes.contentsWidth;
			return { ...attributes, isSlim };
		},

		save( { attributes, className } ) {
			const {
				titleTagName,
				title,
				imageID,
				imageURL,
				imageAlt,
				height,
				contentsAlignment,
				maskColor,
				maskOpacity,
				textColor,
				parallax,
				contentsWidth,
			} = attributes;

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

			const bgimageClasses = classnames(
				'smb-section-with-bgimage__bgimage',
				{
					'js-bg-parallax__bgimage': !! parallax,
				}
			);

			const containerClasses = classnames( 'c-container', {
				'u-slim-width': !! contentsWidth,
			} );

			const sectionStyles = {
				color: textColor || undefined,
			};

			const maskStyles = {
				backgroundColor: maskColor || undefined,
			};

			const bgimageStyles = {
				opacity: maskOpacity,
			};

			return (
				<div className={ classes } style={ sectionStyles }>
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
					<div className={ bgimageClasses } style={ bgimageStyles }>
						<img
							src={ imageURL }
							alt={ imageAlt }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
					<div className={ containerClasses }>
						{ ! RichText.isEmpty( title ) &&
							'none' !== titleTagName && (
								<RichText.Content
									tagName={ titleTagName }
									className="smb-section__title"
									value={ title }
								/>
							) }
						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const {
				title,
				imageID,
				imageURL,
				height,
				contentsAlignment,
				maskColor,
				maskOpacity,
				textColor,
				parallax,
			} = attributes;

			return (
				<div
					className={ classnames(
						`smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }`,
						{ 'js-bg-parallax': !! parallax }
					) }
					style={ { color: textColor } }
				>
					<div
						className="smb-section-with-bgimage__mask"
						style={ { backgroundColor: maskColor } }
					/>
					<div
						className={ classnames(
							'smb-section-with-bgimage__bgimage',
							{ 'js-bg-parallax__bgimage': !! parallax }
						) }
						style={ { opacity: maskOpacity } }
					>
						<img
							src={ imageURL }
							alt=""
							className={ `wp-image-${ imageID }` }
						/>
					</div>
					<div className="c-container">
						{ ! RichText.isEmpty( title ) && (
							<h2 className="smb-section__title">
								<RichText.Content value={ title } />
							</h2>
						) }
						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...omit( blockAttributes, [ 'textColor', 'parallax' ] ),
		},
		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const {
				title,
				imageID,
				imageURL,
				height,
				contentsAlignment,
				maskColor,
				maskOpacity,
			} = attributes;

			return (
				<div
					className={ `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }` }
				>
					<div
						className="smb-section-with-bgimage__mask"
						style={ { backgroundColor: maskColor } }
					/>
					<div
						className="smb-section-with-bgimage__bgimage"
						style={ { opacity: maskOpacity } }
					>
						<img
							src={ imageURL }
							alt=""
							className={ `wp-image-${ imageID }` }
						/>
					</div>
					<div className="c-container">
						{ ! RichText.isEmpty( title ) && (
							<h2 className="smb-section__title">
								<RichText.Content value={ title } />
							</h2>
						) }
						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...omit( blockAttributes, [ 'textColor', 'parallax' ] ),
		},
		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const {
				title,
				imageURL,
				height,
				contentsAlignment,
				maskColor,
				maskOpacity,
			} = attributes;

			return (
				<div
					className={ `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }` }
				>
					<div
						className="smb-section-with-bgimage__mask"
						style={ { backgroundColor: maskColor } }
					/>
					<div
						className="smb-section-with-bgimage__bgimage"
						style={ { opacity: maskOpacity } }
					>
						<img src={ imageURL } alt="" />
					</div>
					<div className="c-container">
						{ ! RichText.isEmpty( title ) && (
							<h2 className="smb-section__title">
								<RichText.Content value={ title } />
							</h2>
						) }
						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...omit( blockAttributes, [
				'maskColor',
				'maskOpacity',
				'textColor',
				'parallax',
			] ),
		},

		save( { attributes } ) {
			const { title, imageURL, height, contentsAlignment } = attributes;

			return (
				<div
					className={ `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }` }
				>
					<div className="smb-section-with-bgimage__bgimage">
						{ imageURL && <img src={ imageURL } alt="" /> }
					</div>
					<div className="c-container">
						{ ! RichText.isEmpty( title ) && (
							<h2 className="smb-section__title">
								<RichText.Content value={ title } />
							</h2>
						) }
						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
];
