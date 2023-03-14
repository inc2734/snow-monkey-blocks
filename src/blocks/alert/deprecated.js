import classnames from 'classnames';

import { rawHandler } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
			content: {
				type: 'string',
				source: 'html',
				selector: '.smb-alert__body',
				multiline: 'p',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { content } = attributes;

			const match = content.match( /<p>(.+?)<\/p>/g );

			const items = match.map( ( value ) => {
				return rawHandler( { HTML: value } )[ 0 ];
			} );

			return [ { ...attributes }, [ ...items ] ];
		},

		save( { attributes, className } ) {
			const { title, content, modifier, icon } = attributes;

			const classes = classnames( 'smb-alert', {
				[ className ]: !! className,
				[ `smb-alert--${ modifier }` ]: !! modifier,
			} );

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					{ ! RichText.isEmpty( title ) && (
						<div className="smb-alert__title">
							<i className={ `fa-solid fa-${ icon }` } />
							<strong>
								<RichText.Content value={ title } />
							</strong>
						</div>
					) }

					<div className="smb-alert__body">
						<RichText.Content value={ content } />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			content: {
				type: 'string',
				source: 'html',
				selector: '.smb-alert__body',
				multiline: 'p',
				default: '',
			},
		},

		save( { attributes, className } ) {
			const { title, content, modifier, icon } = attributes;

			const classes = classnames( 'smb-alert', {
				[ className ]: !! className,
				[ `smb-alert--${ modifier }` ]: !! modifier,
			} );

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					{ ! RichText.isEmpty( title ) && (
						<div className="smb-alert__title">
							<i className={ `fas fa-${ icon }` } />
							<strong>
								<RichText.Content value={ title } />
							</strong>
						</div>
					) }

					<div className="smb-alert__body">
						<RichText.Content value={ content } />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			content: {
				type: 'string',
				source: 'html',
				selector: '.smb-alert__body',
				multiline: 'p',
				default: '',
			},
		},

		save( { attributes } ) {
			const { title, content, modifier, icon } = attributes;

			return (
				<div
					className={ classnames( 'smb-alert', {
						[ `smb-alert--${ modifier }` ]: !! modifier,
					} ) }
				>
					{ ! RichText.isEmpty( title ) && (
						<div className="smb-alert__title">
							<i className={ `fas fa-${ icon }` } />
							<strong>
								<RichText.Content value={ title } />
							</strong>
						</div>
					) }

					<div className="smb-alert__body">
						<RichText.Content value={ content } />
					</div>
				</div>
			);
		},
	},
];
