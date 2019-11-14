'use strict';

import classnames from 'classnames';
import blockAttributes from './attributes';

import {
	omit,
} from 'lodash';

import {
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';

export default [
	{
		attributes: blockAttributes,

		save( { attributes, className } ) {
			const { titleTagName, title, imageID, imageURL, imageAlt, height, contentsAlignment, maskColor, maskOpacity, textColor, parallax, isSlim } = attributes;

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

			const containerClasses = classnames(
				'c-container',
				{
					'u-slim-width': !! isSlim,
				}
			);

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
					<div className="smb-section-with-bgimage__mask" style={ maskStyles } />
					<div className={ bgimageClasses } style={ bgimageStyles }>
						<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
					</div>
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
		attributes: blockAttributes,

		migrate( attributes ) {
			const isSlim = !! attributes.contentsWidth;
			return { ...attributes, isSlim: isSlim };
		},

		save( { attributes, className } ) {
			const { titleTagName, title, imageID, imageURL, imageAlt, height, contentsAlignment, maskColor, maskOpacity, textColor, parallax, contentsWidth } = attributes;

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

			const containerClasses = classnames(
				'c-container',
				{
					'u-slim-width': !! contentsWidth,
				}
			);

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
					<div className="smb-section-with-bgimage__mask" style={ maskStyles } />
					<div className={ bgimageClasses } style={ bgimageStyles }>
						<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
					</div>
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
		attributes: blockAttributes,

		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const { title, imageID, imageURL, height, contentsAlignment, maskColor, maskOpacity, textColor, parallax } = attributes;

			return (
				<div className={ classnames( `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }`, { 'js-bg-parallax': !! parallax } ) } style={ { color: textColor } }>
					<div className="smb-section-with-bgimage__mask" style={ { backgroundColor: maskColor } } />
					<div className={ classnames( 'smb-section-with-bgimage__bgimage', { 'js-bg-parallax__bgimage': !! parallax } ) } style={ { opacity: maskOpacity } }>
						<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
					</div>
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
	{
		attributes: {
			...omit( blockAttributes, [ 'textColor', 'parallax' ] ),
		},
		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const { title, imageID, imageURL, height, contentsAlignment, maskColor, maskOpacity } = attributes;

			return (
				<div className={ `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }` }>
					<div className="smb-section-with-bgimage__mask" style={ { backgroundColor: maskColor } } />
					<div className="smb-section-with-bgimage__bgimage" style={ { opacity: maskOpacity } }>
						<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
					</div>
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
	{
		attributes: {
			...omit( blockAttributes, [ 'textColor', 'parallax' ] ),
		},
		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const { title, imageURL, height, contentsAlignment, maskColor, maskOpacity } = attributes;

			return (
				<div className={ `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }` }>
					<div className="smb-section-with-bgimage__mask" style={ { backgroundColor: maskColor } } />
					<div className="smb-section-with-bgimage__bgimage" style={ { opacity: maskOpacity } }>
						<img src={ imageURL } alt="" />
					</div>
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
	{
		attributes: {
			...omit( blockAttributes, [ 'maskColor', 'maskOpacity', 'textColor', 'parallax' ] ),
		},

		save( { attributes } ) {
			const { title, imageURL, height, contentsAlignment } = attributes;

			return (
				<div className={ `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }` }>
					<div className="smb-section-with-bgimage__bgimage">
						{ imageURL &&
							<img src={ imageURL } alt="" />
						}
					</div>
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
