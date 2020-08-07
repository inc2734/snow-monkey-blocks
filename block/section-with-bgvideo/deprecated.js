import classnames from 'classnames';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import { getVideoId } from './utils';

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
				titleTagName,
				title,
				videoURL,
				videoWidth,
				videoHeight,
				height,
				contentsAlignment,
				maskColor,
				maskOpacity,
				textColor,
				isSlim,
			} = attributes;

			const classes = classnames(
				'smb-section',
				'smb-section-with-bgvideo',
				'smb-section-with-bgimage',
				`smb-section-with-bgimage--${ contentsAlignment }`,
				`smb-section-with-bgimage--${ height }`,
				className
			);

			const bgvideoClasses = classnames(
				'smb-section-with-bgimage__bgimage'
			);

			const containerClasses = classnames( 'c-container', {
				'u-slim-width': !! isSlim,
			} );

			const sectionStyles = {
				color: textColor || undefined,
			};

			const maskStyles = {
				backgroundColor: maskColor || undefined,
				opacity: 1 - maskOpacity,
			};

			return (
				<div className={ classes } style={ sectionStyles }>
					<div className={ bgvideoClasses }>
						{ videoURL && (
							<>
								<iframe
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									src={ `https://www.youtube.com/embed/${ getVideoId(
										videoURL
									) }?controls=0&autoplay=1&showinfo=0&rel=0&disablekb=1&iv_load_policy=3&loop=1&playlist=${ getVideoId(
										videoURL
									) }&playsinline=1&modestbranding=1` }
									width={ videoWidth }
									height={ videoHeight }
									frameBorder="0"
									title={ videoURL }
								/>
								<img
									src={ `https://i.ytimg.com/vi/${ getVideoId(
										videoURL
									) }/maxresdefault.jpg` }
									alt=""
								/>
							</>
						) }
					</div>
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
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

		migrate( attributes ) {
			const isSlim = !! attributes.contentsWidth;
			return { ...attributes, isSlim };
		},

		save( { attributes, className } ) {
			const {
				titleTagName,
				title,
				videoURL,
				videoWidth,
				videoHeight,
				height,
				contentsAlignment,
				maskColor,
				maskOpacity,
				textColor,
				contentsWidth,
			} = attributes;

			const classes = classnames(
				'smb-section',
				'smb-section-with-bgvideo',
				'smb-section-with-bgimage',
				`smb-section-with-bgimage--${ contentsAlignment }`,
				`smb-section-with-bgimage--${ height }`,
				className
			);

			const bgvideoClasses = classnames(
				'smb-section-with-bgimage__bgimage'
			);

			const containerClasses = classnames( 'c-container', {
				'u-slim-width': !! contentsWidth,
			} );

			const sectionStyles = {
				color: textColor || undefined,
			};

			const maskStyles = {
				backgroundColor: maskColor || undefined,
				opacity: 1 - maskOpacity,
			};

			return (
				<div className={ classes } style={ sectionStyles }>
					<div className={ bgvideoClasses }>
						{ videoURL && (
							<>
								<iframe
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									src={ `https://www.youtube.com/embed/${ getVideoId(
										videoURL
									) }?controls=0&autoplay=1&showinfo=0&rel=0&disablekb=1&iv_load_policy=3&loop=1&playlist=${ getVideoId(
										videoURL
									) }&playsinline=1&modestbranding=1` }
									width={ videoWidth }
									height={ videoHeight }
									frameBorder="0"
									title={ videoURL }
								/>
								<img
									src={ `http://i.ytimg.com/vi/${ getVideoId(
										videoURL
									) }/maxresdefault.jpg` }
									alt=""
								/>
							</>
						) }
					</div>
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
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

		save( { attributes, className } ) {
			const {
				title,
				videoURL,
				videoWidth,
				videoHeight,
				height,
				contentsAlignment,
				maskColor,
				maskOpacity,
				textColor,
			} = attributes;

			const classes = classnames(
				'smb-section',
				'smb-section-with-bgvideo',
				'smb-section-with-bgimage',
				`smb-section-with-bgimage--${ contentsAlignment }`,
				`smb-section-with-bgimage--${ height }`,
				className
			);

			const bgvideoClasses = classnames(
				'smb-section-with-bgimage__bgimage'
			);

			const sectionStyles = {
				color: textColor || undefined,
			};

			const maskStyles = {
				backgroundColor: maskColor || undefined,
				opacity: 1 - maskOpacity,
			};

			return (
				<div className={ classes } style={ sectionStyles }>
					<div className={ bgvideoClasses }>
						{ videoURL && (
							<iframe
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								src={ `https://www.youtube.com/embed/${ getVideoId(
									videoURL
								) }?controls=0&autoplay=1&showinfo=0&rel=0&disablekb=1&iv_load_policy=3&loop=1&playlist=${ getVideoId(
									videoURL
								) }&playsinline=1&modestbranding=1` }
								width={ videoWidth }
								height={ videoHeight }
								frameBorder="0"
								title={ videoURL }
							/>
						) }
					</div>
					<div
						className="smb-section-with-bgimage__mask"
						style={ maskStyles }
					/>
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
