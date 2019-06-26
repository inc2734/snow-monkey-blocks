'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { RichText, InnerBlocks } = wp.editor;
const { Fragment } = wp.element;

export const deprecated = [
	{
		attributes: schema,

		migrate( attributes ) {
			const isSlim = !! attributes.contentsWidth;
			return { ...attributes, isSlim: isSlim };
		},

		save( { attributes, className } ) {
			const { titleTagName, title, videoURL, videoWidth, videoHeight, height, contentsAlignment, maskColor, maskOpacity, textColor, contentsWidth } = attributes;

			const classes = classnames(
				{
					'smb-section': true,
					'smb-section-with-bgvideo': true,
					'smb-section-with-bgimage': true,
					[ `smb-section-with-bgimage--${ contentsAlignment }` ]: true,
					[ `smb-section-with-bgimage--${ height }` ]: true,
					[ className ]: !! className,
				}
			);

			const bgvideoClasses = classnames(
				{
					'smb-section-with-bgimage__bgimage': true,
				}
			);

			const containerClasses = classnames(
				{
					'c-container': true,
					'u-slim-width': !! contentsWidth,
				}
			);

			const sectionStyles = {
				color: textColor || undefined,
			};

			const maskStyles = {
				backgroundColor: maskColor || undefined,
				opacity: 1 - maskOpacity,
			};

			const getVideoId = ( _videoURL ) => {
				const VIDEO_ID_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
				const matches = _videoURL.match( VIDEO_ID_REGEX );
				if ( !! matches ) {
					return matches[ 1 ];
				}
			};

			return (
				<div className={ classes } style={ sectionStyles }>
					<div className={ bgvideoClasses }>
						{ videoURL &&
							<Fragment>
								<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" src={ `https://www.youtube.com/embed/${ getVideoId( videoURL ) }?controls=0&autoplay=1&showinfo=0&rel=0&disablekb=1&iv_load_policy=3&loop=1&playlist=${ getVideoId( videoURL ) }&playsinline=1&modestbranding=1` } width={ videoWidth } height={ videoHeight } frameBorder="0" title={ videoURL } />
								<img src={ `http://i.ytimg.com/vi/${ getVideoId( videoURL ) }/maxresdefault.jpg` } alt="" />
							</Fragment>
						}
					</div>
					<div className="smb-section-with-bgimage__mask" style={ maskStyles }></div>
					<div className={ containerClasses }>
						{ ! RichText.isEmpty( title ) && 'none' !== titleTagName &&
							<RichText.Content
								tagName={ titleTagName }
								className="smb-section__title"
								value={ title }
							/>
						}
						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: schema,
		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes, className } ) {
			const { title, videoURL, videoWidth, videoHeight, height, contentsAlignment, maskColor, maskOpacity, textColor } = attributes;

			const getVideoId = ( _videoURL ) => {
				const VIDEO_ID_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
				const matches = _videoURL.match( VIDEO_ID_REGEX );
				if ( !! matches ) {
					return matches[ 1 ];
				}
			};

			const classes = classnames(
				{
					'smb-section': true,
					'smb-section-with-bgvideo': true,
					'smb-section-with-bgimage': true,
					[ `smb-section-with-bgimage--${ contentsAlignment }` ]: true,
					[ `smb-section-with-bgimage--${ height }` ]: true,
					[ className ]: !! className,
				}
			);

			const bgvideoClasses = classnames(
				{
					'smb-section-with-bgimage__bgimage': true,
				}
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
						{ videoURL &&
							<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" src={ `https://www.youtube.com/embed/${ getVideoId( videoURL ) }?controls=0&autoplay=1&showinfo=0&rel=0&disablekb=1&iv_load_policy=3&loop=1&playlist=${ getVideoId( videoURL ) }&playsinline=1&modestbranding=1` } width={ videoWidth } height={ videoHeight } frameBorder="0" title={ videoURL } />
						}
					</div>
					<div className="smb-section-with-bgimage__mask" style={ maskStyles }></div>
					<div className="c-container">
						{ ! RichText.isEmpty( title ) &&
							<h2 className="smb-section__title">
								<RichText.Content value={ title } />
							</h2>
						}
						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
];
