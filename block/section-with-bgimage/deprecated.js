import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import { omit } from 'lodash';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'wide', 'full' ],
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
				lgImageRepeat,
				lgFocalPoint,
				mdImageID,
				mdImageURL,
				mdImageAlt,
				mdImageMediaType,
				mdImageRepeat,
				mdFocalPoint,
				smImageID,
				smImageURL,
				smImageAlt,
				smImageMediaType,
				smImageRepeat,
				smFocalPoint,
				height,
				contentsAlignment,
				maskColor,
				maskGradientColor,
				maskOpacity,
				textColor,
				parallax,
				isSlim,
			} = attributes;

			const TagName = wrapperTagName;

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

			const hasTitle =
				! RichText.isEmpty( title ) && 'none' !== titleTagName;
			const hasSubTitle = ! RichText.isEmpty( subtitle );
			const hasLede = ! RichText.isEmpty( lede );
			const hasMask = 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) );

			const isLgVideo = 'video' === lgImageMediaType;
			const isLgImage =
				'image' === lgImageMediaType || undefined === lgImageMediaType;
			const hasLgBackground = !! lgImageURL;
			const lgPointValue =
				lgFocalPoint && ! parallax
					? `${ lgFocalPoint.x * 100 }% ${ lgFocalPoint.y * 100 }%`
					: undefined;

			const isMdVideo = 'video' === mdImageMediaType;
			const isMdImage =
				'image' === mdImageMediaType || undefined === mdImageMediaType;
			const hasMdBackground = !! mdImageURL;
			const mdPointValue =
				mdFocalPoint && ! parallax
					? `${ mdFocalPoint.x * 100 }% ${ mdFocalPoint.y * 100 }%`
					: undefined;

			const isSmVideo = 'video' === smImageMediaType;
			const isSmImage =
				'image' === smImageMediaType || undefined === smImageMediaType;
			const hasSmBackground = !! smImageURL;
			const smPointValue =
				smFocalPoint && ! parallax
					? `${ smFocalPoint.x * 100 }% ${ smFocalPoint.y * 100 }%`
					: undefined;

			const sectionStyles = {
				color: textColor || undefined,
			};

			const maskStyles = {};
			if ( maskColor || maskGradientColor ) {
				maskStyles.backgroundColor = maskColor;
				maskStyles.backgroundImage = maskGradientColor;
			}

			const lgVideoStyles = {
				opacity: maskOpacity,
				objectPosition: lgPointValue,
			};

			const norepeatableLgImageStyles = {
				opacity: maskOpacity,
				objectPosition: lgPointValue,
			};

			const repeatableLgImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ lgImageURL } )`,
				backgroundPosition: lgPointValue,
			};

			const mdVideoStyles = {
				opacity: maskOpacity,
				objectPosition: mdPointValue,
			};

			const norepeatableMdImageStyles = {
				opacity: maskOpacity,
				objectPosition: mdPointValue,
			};

			const repeatableMdImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ mdImageURL } )`,
				backgroundPosition: mdPointValue,
			};

			const smVideoStyles = {
				opacity: maskOpacity,
				objectPosition: smPointValue,
			};

			const norepeatableSmImageStyles = {
				opacity: maskOpacity,
				objectPosition: smPointValue,
			};

			const repeatableSmImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ smImageURL } )`,
				backgroundPosition: smPointValue,
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					{ hasLgBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--lg'
							) }
						>
							{ hasMask && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isLgImage &&
								( lgImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableLgImageStyles }
									>
										<img
											src={ lgImageURL }
											alt={ lgImageAlt }
											className={ `wp-image-${ lgImageID }` }
											style={ norepeatableLgImageStyles }
										/>
									</div>
								) : (
									<img
										src={ lgImageURL }
										alt={ lgImageAlt }
										className={ `wp-image-${ lgImageID }` }
										style={ norepeatableLgImageStyles }
									/>
								) ) }

							{ isLgVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ lgImageURL }
									style={ lgVideoStyles }
								/>
							) }
						</div>
					) }

					{ hasMdBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--md'
							) }
						>
							{ hasMask && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isMdImage &&
								( mdImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableMdImageStyles }
									>
										<img
											src={ mdImageURL }
											alt={ mdImageAlt }
											className={ `wp-image-${ mdImageID }` }
											style={ norepeatableMdImageStyles }
										/>
									</div>
								) : (
									<img
										src={ mdImageURL }
										alt={ mdImageAlt }
										className={ `wp-image-${ mdImageID }` }
										style={ norepeatableMdImageStyles }
									/>
								) ) }

							{ isMdVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ mdImageURL }
									style={ mdVideoStyles }
								/>
							) }
						</div>
					) }

					{ hasSmBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--sm'
							) }
						>
							{ hasMask && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isSmImage &&
								( smImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableSmImageStyles }
									>
										<img
											src={ smImageURL }
											alt={ smImageAlt }
											className={ `wp-image-${ smImageID }` }
											style={ norepeatableSmImageStyles }
										/>
									</div>
								) : (
									<img
										src={ smImageURL }
										alt={ smImageAlt }
										className={ `wp-image-${ smImageID }` }
										style={ norepeatableSmImageStyles }
									/>
								) ) }

							{ isSmVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ smImageURL }
									style={ smVideoStyles }
								/>
							) }
						</div>
					) }

					<div className={ containerClasses }>
						{ hasTitle && hasSubTitle && (
							<RichText.Content
								tagName="div"
								className="smb-section__subtitle"
								value={ subtitle }
							/>
						) }

						{ hasTitle && (
							<RichText.Content
								tagName={ titleTagName }
								className="smb-section__title"
								value={ title }
							/>
						) }

						{ hasTitle && hasLede && (
							<div className="smb-section__lede-wrapper">
								<RichText.Content
									tagName="div"
									className="smb-section__lede"
									value={ lede }
								/>
							</div>
						) }

						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</TagName>
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
				lgImageRepeat,
				lgFocalPoint,
				mdImageID,
				mdImageURL,
				mdImageAlt,
				mdImageMediaType,
				mdImageRepeat,
				mdFocalPoint,
				smImageID,
				smImageURL,
				smImageAlt,
				smImageMediaType,
				smImageRepeat,
				smFocalPoint,
				height,
				contentsAlignment,
				maskColor,
				maskGradientColor,
				maskOpacity,
				textColor,
				parallax,
				isSlim,
			} = attributes;

			const TagName = wrapperTagName;

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

			const hasTitle =
				! RichText.isEmpty( title ) && 'none' !== titleTagName;
			const hasSubTitle = ! RichText.isEmpty( subtitle );
			const hasLede = ! RichText.isEmpty( lede );
			const hasMask = 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) );

			const isLgVideo = 'video' === lgImageMediaType;
			const isLgImage =
				'image' === lgImageMediaType || undefined === lgImageMediaType;
			const hasLgBackground = !! lgImageURL;
			const lgPointValue =
				lgFocalPoint && ! parallax
					? `${ lgFocalPoint.x * 100 }% ${ lgFocalPoint.y * 100 }%`
					: undefined;

			const isMdVideo = 'video' === mdImageMediaType;
			const isMdImage =
				'image' === mdImageMediaType || undefined === mdImageMediaType;
			const hasMdBackground = !! mdImageURL;
			const mdPointValue =
				mdFocalPoint && ! parallax
					? `${ mdFocalPoint.x * 100 }% ${ mdFocalPoint.y * 100 }%`
					: undefined;

			const isSmVideo = 'video' === smImageMediaType;
			const isSmImage =
				'image' === smImageMediaType || undefined === smImageMediaType;
			const hasSmBackground = !! smImageURL;
			const smPointValue =
				smFocalPoint && ! parallax
					? `${ smFocalPoint.x * 100 }% ${ smFocalPoint.y * 100 }%`
					: undefined;

			const sectionStyles = {
				color: textColor || undefined,
			};

			const maskStyles = {};
			if ( maskColor || maskGradientColor ) {
				maskStyles.backgroundColor = maskColor;
				maskStyles.backgroundImage = maskGradientColor;
			}

			const lgVideoStyles = {
				opacity: maskOpacity,
				objectPosition: lgPointValue,
			};

			const norepeatableLgImageStyles = {
				opacity: maskOpacity,
				objectPosition: lgPointValue,
			};

			const repeatableLgImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ lgImageURL } )`,
				backgroundPosition: lgPointValue,
			};

			const mdVideoStyles = {
				opacity: maskOpacity,
				objectPosition: mdPointValue,
			};

			const norepeatableMdImageStyles = {
				opacity: maskOpacity,
				objectPosition: mdPointValue,
			};

			const repeatableMdImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ mdImageURL } )`,
				backgroundPosition: mdPointValue,
			};

			const smVideoStyles = {
				opacity: maskOpacity,
				objectPosition: smPointValue,
			};

			const norepeatableSmImageStyles = {
				opacity: maskOpacity,
				objectPosition: smPointValue,
			};

			const repeatableSmImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ smImageURL } )`,
				backgroundPosition: smPointValue,
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					{ hasLgBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--lg'
							) }
						>
							{ hasMask && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isLgImage &&
								( lgImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableLgImageStyles }
									>
										<img
											src={ lgImageURL }
											alt={ lgImageAlt }
											className={ `wp-image-${ lgImageID }` }
											style={ norepeatableLgImageStyles }
										/>
									</div>
								) : (
									<img
										src={ lgImageURL }
										alt={ lgImageAlt }
										className={ `wp-image-${ lgImageID }` }
										style={ norepeatableLgImageStyles }
									/>
								) ) }

							{ isLgVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ lgImageURL }
									style={ lgVideoStyles }
								/>
							) }
						</div>
					) }

					{ hasMdBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--md'
							) }
						>
							{ hasMask && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isMdImage &&
								( mdImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableMdImageStyles }
									>
										<img
											src={ mdImageURL }
											alt={ mdImageAlt }
											className={ `wp-image-${ mdImageID }` }
											style={ norepeatableMdImageStyles }
										/>
									</div>
								) : (
									<img
										src={ mdImageURL }
										alt={ mdImageAlt }
										className={ `wp-image-${ mdImageID }` }
										style={ norepeatableMdImageStyles }
									/>
								) ) }

							{ isMdVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ mdImageURL }
									style={ mdVideoStyles }
								/>
							) }
						</div>
					) }

					{ hasSmBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--sm'
							) }
						>
							{ hasMask && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isSmImage &&
								( smImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableSmImageStyles }
									>
										<img
											src={ smImageURL }
											alt={ smImageAlt }
											className={ `wp-image-${ smImageID }` }
											style={ norepeatableSmImageStyles }
										/>
									</div>
								) : (
									<img
										src={ smImageURL }
										alt={ smImageAlt }
										className={ `wp-image-${ smImageID }` }
										style={ norepeatableSmImageStyles }
									/>
								) ) }

							{ isSmVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ smImageURL }
									style={ smVideoStyles }
								/>
							) }
						</div>
					) }

					<div className={ containerClasses }>
						{ hasTitle && hasSubTitle && (
							<RichText.Content
								tagName="div"
								className="smb-section__subtitle"
								value={ subtitle }
							/>
						) }

						{ hasTitle && (
							<RichText.Content
								tagName={ titleTagName }
								className="smb-section__title"
								value={ title }
							/>
						) }

						{ hasTitle && hasLede && (
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
				</TagName>
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
				lgImageRepeat,
				lgFocalPoint,
				mdImageID,
				mdImageURL,
				mdImageAlt,
				mdImageMediaType,
				mdImageRepeat,
				mdFocalPoint,
				smImageID,
				smImageURL,
				smImageAlt,
				smImageMediaType,
				smImageRepeat,
				smFocalPoint,
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

			const TagName = wrapperTagName;

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

			const isLgVideo = 'video' === lgImageMediaType;
			const isLgImage =
				'image' === lgImageMediaType || undefined === lgImageMediaType;
			const hasLgBackground = !! lgImageURL;
			const lgPointValue =
				lgFocalPoint && ! parallax
					? `${ lgFocalPoint.x * 100 }% ${ lgFocalPoint.y * 100 }%`
					: undefined;

			const isMdVideo = 'video' === mdImageMediaType;
			const isMdImage =
				'image' === mdImageMediaType || undefined === mdImageMediaType;
			const hasMdBackground = !! mdImageURL;
			const mdPointValue =
				mdFocalPoint && ! parallax
					? `${ mdFocalPoint.x * 100 }% ${ mdFocalPoint.y * 100 }%`
					: undefined;

			const isSmVideo = 'video' === smImageMediaType;
			const isSmImage =
				'image' === smImageMediaType || undefined === smImageMediaType;
			const hasSmBackground = !! smImageURL;
			const smPointValue =
				smFocalPoint && ! parallax
					? `${ smFocalPoint.x * 100 }% ${ smFocalPoint.y * 100 }%`
					: undefined;

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

			const lgVideoStyles = {
				opacity: maskOpacity,
				objectPosition: lgPointValue,
			};

			const norepeatableLgImageStyles = {
				opacity: maskOpacity,
				objectPosition: lgPointValue,
			};

			const repeatableLgImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ lgImageURL } )`,
				backgroundPosition: lgPointValue,
			};

			const mdVideoStyles = {
				opacity: maskOpacity,
				objectPosition: mdPointValue,
			};

			const norepeatableMdImageStyles = {
				opacity: maskOpacity,
				objectPosition: mdPointValue,
			};

			const repeatableMdImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ mdImageURL } )`,
				backgroundPosition: mdPointValue,
			};

			const smVideoStyles = {
				opacity: maskOpacity,
				objectPosition: smPointValue,
			};

			const norepeatableSmImageStyles = {
				opacity: maskOpacity,
				objectPosition: smPointValue,
			};

			const repeatableSmImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ smImageURL } )`,
				backgroundPosition: smPointValue,
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					{ hasLgBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--lg'
							) }
						>
							{ 0 < Math.abs( 1 - maskOpacity ) && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isLgImage &&
								( lgImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableLgImageStyles }
									>
										<img
											src={ lgImageURL }
											alt={ lgImageAlt }
											className={ `wp-image-${ lgImageID }` }
											style={ norepeatableLgImageStyles }
										/>
									</div>
								) : (
									<img
										src={ lgImageURL }
										alt={ lgImageAlt }
										className={ `wp-image-${ lgImageID }` }
										style={ norepeatableLgImageStyles }
									/>
								) ) }

							{ isLgVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ lgImageURL }
									style={ lgVideoStyles }
								/>
							) }
						</div>
					) }

					{ hasMdBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--md'
							) }
						>
							{ 0 < Math.abs( 1 - maskOpacity ) && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isMdImage &&
								( mdImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableMdImageStyles }
									>
										<img
											src={ mdImageURL }
											alt={ mdImageAlt }
											className={ `wp-image-${ mdImageID }` }
											style={ norepeatableMdImageStyles }
										/>
									</div>
								) : (
									<img
										src={ mdImageURL }
										alt={ mdImageAlt }
										className={ `wp-image-${ mdImageID }` }
										style={ norepeatableMdImageStyles }
									/>
								) ) }

							{ isMdVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ mdImageURL }
									style={ mdVideoStyles }
								/>
							) }
						</div>
					) }

					{ hasSmBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--sm'
							) }
						>
							{ 0 < Math.abs( 1 - maskOpacity ) && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isSmImage &&
								( smImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableSmImageStyles }
									>
										<img
											src={ smImageURL }
											alt={ smImageAlt }
											className={ `wp-image-${ smImageID }` }
											style={ norepeatableSmImageStyles }
										/>
									</div>
								) : (
									<img
										src={ smImageURL }
										alt={ smImageAlt }
										className={ `wp-image-${ smImageID }` }
										style={ norepeatableSmImageStyles }
									/>
								) ) }

							{ isSmVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ smImageURL }
									style={ smVideoStyles }
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
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			maskColor2: {
				type: 'string',
			},
			maskColorAngle: {
				type: 'number',
				default: 0,
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
		},

		migrate( attributes ) {
			let maskGradientColor;
			if ( attributes.maskColor2 ) {
				maskGradientColor = `linear-gradient(${
					attributes.maskColorAngle
				}deg, ${ hexToRgba( attributes.maskColor ) } 0%, ${ hexToRgba(
					attributes.maskColor2
				) } 100%)`;
				attributes.maskColor = undefined;
			}

			return {
				...attributes,
				maskGradientColor,
			};
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
				lgImageRepeat,
				lgFocalPoint,
				mdImageID,
				mdImageURL,
				mdImageAlt,
				mdImageMediaType,
				mdImageRepeat,
				mdFocalPoint,
				smImageID,
				smImageURL,
				smImageAlt,
				smImageMediaType,
				smImageRepeat,
				smFocalPoint,
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

			const TagName = wrapperTagName;

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

			const isLgVideo = 'video' === lgImageMediaType;
			const isLgImage =
				'image' === lgImageMediaType || undefined === lgImageMediaType;
			const hasLgBackground = !! lgImageURL;
			const lgPointValue =
				lgFocalPoint && ! parallax
					? `${ lgFocalPoint.x * 100 }% ${ lgFocalPoint.y * 100 }%`
					: undefined;

			const isMdVideo = 'video' === mdImageMediaType;
			const isMdImage =
				'image' === mdImageMediaType || undefined === mdImageMediaType;
			const hasMdBackground = !! mdImageURL;
			const mdPointValue =
				mdFocalPoint && ! parallax
					? `${ mdFocalPoint.x * 100 }% ${ mdFocalPoint.y * 100 }%`
					: undefined;

			const isSmVideo = 'video' === smImageMediaType;
			const isSmImage =
				'image' === smImageMediaType || undefined === smImageMediaType;
			const hasSmBackground = !! smImageURL;
			const smPointValue =
				smFocalPoint && ! parallax
					? `${ smFocalPoint.x * 100 }% ${ smFocalPoint.y * 100 }%`
					: undefined;

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

			const lgVideoStyles = {
				opacity: maskOpacity,
				objectPosition: lgPointValue,
			};

			const norepeatableLgImageStyles = {
				opacity: maskOpacity,
				objectPosition: lgPointValue,
			};

			const repeatableLgImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ lgImageURL } )`,
				backgroundPosition: lgPointValue,
			};

			const mdVideoStyles = {
				opacity: maskOpacity,
				objectPosition: mdPointValue,
			};

			const norepeatableMdImageStyles = {
				opacity: maskOpacity,
				objectPosition: mdPointValue,
			};

			const repeatableMdImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ mdImageURL } )`,
				backgroundPosition: mdPointValue,
			};

			const smVideoStyles = {
				opacity: maskOpacity,
				objectPosition: smPointValue,
			};

			const norepeatableSmImageStyles = {
				opacity: maskOpacity,
				objectPosition: smPointValue,
			};

			const repeatableSmImageStyles = {
				opacity: maskOpacity,
				backgroundImage: `url( ${ smImageURL } )`,
				backgroundPosition: smPointValue,
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					{ hasLgBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--lg'
							) }
						>
							{ 0 < Math.abs( 1 - maskOpacity ) && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isLgImage &&
								( lgImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableLgImageStyles }
									>
										<img
											src={ lgImageURL }
											alt={ lgImageAlt }
											className={ `wp-image-${ lgImageID }` }
											style={ norepeatableLgImageStyles }
										/>
									</div>
								) : (
									<img
										src={ lgImageURL }
										alt={ lgImageAlt }
										className={ `wp-image-${ lgImageID }` }
										style={ norepeatableLgImageStyles }
									/>
								) ) }

							{ isLgVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ lgImageURL }
									style={ lgVideoStyles }
								/>
							) }
						</div>
					) }

					{ hasMdBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--md'
							) }
						>
							{ 0 < Math.abs( 1 - maskOpacity ) && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isMdImage &&
								( mdImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableMdImageStyles }
									>
										<img
											src={ mdImageURL }
											alt={ mdImageAlt }
											className={ `wp-image-${ mdImageID }` }
											style={ norepeatableMdImageStyles }
										/>
									</div>
								) : (
									<img
										src={ mdImageURL }
										alt={ mdImageAlt }
										className={ `wp-image-${ mdImageID }` }
										style={ norepeatableMdImageStyles }
									/>
								) ) }

							{ isMdVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ mdImageURL }
									style={ mdVideoStyles }
								/>
							) }
						</div>
					) }

					{ hasSmBackground && (
						<div
							className={ classnames(
								bgimageClasses,
								'smb-section-with-bgimage__bgimage--sm'
							) }
						>
							{ 0 < Math.abs( 1 - maskOpacity ) && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ isSmImage &&
								( smImageRepeat ? (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ repeatableSmImageStyles }
									>
										<img
											src={ smImageURL }
											alt={ smImageAlt }
											className={ `wp-image-${ smImageID }` }
											style={ norepeatableSmImageStyles }
										/>
									</div>
								) : (
									<img
										src={ smImageURL }
										alt={ smImageAlt }
										className={ `wp-image-${ smImageID }` }
										style={ norepeatableSmImageStyles }
									/>
								) ) }

							{ isSmVideo && (
								<video
									playsInline
									loop
									autoPlay
									muted
									src={ smImageURL }
									style={ smVideoStyles }
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
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			maskColor2: {
				type: 'string',
			},
			maskColorAngle: {
				type: 'number',
				default: 0,
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
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
				lgImageRepeat,
				mdImageID,
				mdImageURL,
				mdImageAlt,
				mdImageMediaType,
				mdImageRepeat,
				smImageID,
				smImageURL,
				smImageAlt,
				smImageMediaType,
				smImageRepeat,
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
							{ 0 < Math.abs( 1 - maskOpacity ) && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ ( 'image' === lgImageMediaType ||
								undefined === lgImageMediaType ) &&
								lgImageRepeat && (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ {
											backgroundImage: `url( ${ lgImageURL } )`,
										} }
									>
										<img
											src={ lgImageURL }
											alt={ lgImageAlt }
											className={ `wp-image-${ lgImageID }` }
											style={ bgimageStyles }
										/>
									</div>
								) }

							{ ( 'image' === lgImageMediaType ||
								undefined === lgImageMediaType ) &&
								! lgImageRepeat && (
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
							{ 0 < Math.abs( 1 - maskOpacity ) && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ ( 'image' === mdImageMediaType ||
								undefined === mdImageMediaType ) &&
								mdImageRepeat && (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ {
											backgroundImage: `url( ${ mdImageURL } )`,
										} }
									>
										<img
											src={ mdImageURL }
											alt={ mdImageAlt }
											className={ `wp-image-${ mdImageID }` }
											style={ bgimageStyles }
										/>
									</div>
								) }

							{ ( 'image' === mdImageMediaType ||
								undefined === mdImageMediaType ) &&
								! mdImageRepeat && (
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
							{ 0 < Math.abs( 1 - maskOpacity ) && (
								<div
									className="smb-section-with-bgimage__mask"
									style={ maskStyles }
								/>
							) }

							{ ( 'image' === smImageMediaType ||
								undefined === smImageMediaType ) &&
								smImageRepeat && (
									<div
										className="smb-section-with-bgimage__repeatable-image"
										style={ {
											backgroundImage: `url( ${ smImageURL } )`,
										} }
									>
										<img
											src={ smImageURL }
											alt={ smImageAlt }
											className={ `wp-image-${ smImageID }` }
											style={ bgimageStyles }
										/>
									</div>
								) }

							{ ( 'image' === smImageMediaType ||
								undefined === smImageMediaType ) &&
								! smImageRepeat && (
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
			maskColor2: {
				type: 'string',
			},
			maskColorAngle: {
				type: 'number',
				default: 0,
			},
			textColor: {
				type: 'string',
				default: '#fff',
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
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
			maskColor2: {
				type: 'string',
			},
			maskColorAngle: {
				type: 'number',
				default: 0,
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
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
			maskColor2: {
				type: 'string',
			},
			maskColorAngle: {
				type: 'number',
				default: 0,
			},
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

		supports: {
			align: [ 'wide', 'full' ],
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

		supports: {
			align: [ 'wide', 'full' ],
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

		supports: {
			align: [ 'wide', 'full' ],
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
