'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { omit } = lodash;
const { RichText, InnerBlocks } = wp.editor;

export const deprecated = [
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
