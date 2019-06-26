'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { omit } = lodash;
const { RichText, InnerBlocks } = wp.editor;

export const deprecated = [
	{
		attributes: schema,

		migrate( attributes ) {
			const isSlim = !! attributes.contentsWidth;
			return { ...attributes, isSlim: isSlim };
		},

		save( { attributes, className } ) {
			const { titleTagName, title, imageID, imageURL, imageAlt, height, contentsAlignment, maskColor, maskOpacity, textColor, parallax, contentsWidth } = attributes;

			const classes = classnames(
				{
					'smb-section': true,
					'smb-section-with-bgimage': true,
					[ `smb-section-with-bgimage--${ contentsAlignment }` ]: true,
					[ `smb-section-with-bgimage--${ height }` ]: true,
					[ className ]: !! className,
					'js-bg-parallax': !! parallax,
				}
			);

			const bgimageClasses = classnames(
				{
					'smb-section-with-bgimage__bgimage': true,
					'js-bg-parallax__bgimage': !! parallax,
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
			};

			const bgimageStyles = {
				opacity: maskOpacity,
			};

			return (
				<div className={ classes } style={ sectionStyles }>
					<div className="smb-section-with-bgimage__mask" style={ maskStyles }></div>
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
		attributes: schema,

		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const { title, imageID, imageURL, height, contentsAlignment, maskColor, maskOpacity, textColor, parallax } = attributes;

			return (
				<div className={ classnames( `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }`, { 'js-bg-parallax': !! parallax } ) } style={ { color: textColor } }>
					<div className="smb-section-with-bgimage__mask" style={ { backgroundColor: maskColor } }></div>
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
			...omit( schema, [ 'textColor', 'parallax' ] ),
		},
		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const { title, imageID, imageURL, height, contentsAlignment, maskColor, maskOpacity } = attributes;

			return (
				<div className={ `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }` }>
					<div className="smb-section-with-bgimage__mask" style={ { backgroundColor: maskColor } }></div>
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
			...omit( schema, [ 'textColor', 'parallax' ] ),
		},
		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const { title, imageURL, height, contentsAlignment, maskColor, maskOpacity } = attributes;

			return (
				<div className={ `smb-section smb-section-with-bgimage smb-section-with-bgimage--${ contentsAlignment } smb-section-with-bgimage--${ height }` }>
					<div className="smb-section-with-bgimage__mask" style={ { backgroundColor: maskColor } }></div>
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
			...omit( schema, [ 'maskColor', 'maskOpacity', 'textColor', 'parallax' ] ),
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
