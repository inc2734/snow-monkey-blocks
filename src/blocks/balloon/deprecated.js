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
			balloonBody: {
				type: 'string',
				source: 'html',
				selector: '.smb-balloon__body',
				multiline: 'p',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { balloonBody } = attributes;

			const match = balloonBody.match( /<p>(.+?)<\/p>/g ) || [];
			const items = match.map( ( value ) => {
				return rawHandler( { HTML: value } )[ 0 ];
			} );

			return [ { ...attributes }, [ ...items ] ];
		},

		save( { attributes, className } ) {
			const {
				avatarID,
				avatarAlt,
				avatarURL,
				avatarBorderColor,
				backgroundColor,
				textColor,
				balloonName,
				balloonBody,
				modifier,
			} = attributes;

			const styles = {
				'--smb-balloon--background-color': backgroundColor || undefined,
				'--smb-balloon--border-color': backgroundColor || undefined,
				'--smb-balloon--color': textColor || undefined,
				'--smb-balloon--avatar-border-color':
					avatarBorderColor || undefined,
			};

			const classes = classnames( 'smb-balloon', {
				[ className ]: !! className,
				[ `smb-balloon--${ modifier }` ]: !! modifier,
			} );

			return (
				<div
					{ ...useBlockProps.save( {
						className: classes,
						style: styles,
					} ) }
				>
					<div className="smb-balloon__person">
						<div className="smb-balloon__figure">
							<img
								src={ avatarURL }
								alt={ avatarAlt }
								className={ `wp-image-${ avatarID }` }
							/>
						</div>
						<div className="smb-balloon__name">
							<RichText.Content value={ balloonName } />
						</div>
					</div>
					<div className="smb-balloon__body">
						<RichText.Content value={ balloonBody } />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			balloonBody: {
				type: 'string',
				source: 'html',
				selector: '.smb-balloon__body',
				multiline: 'p',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { balloonBody } = attributes;

			const match = balloonBody.match( /<p>(.+?)<\/p>/g ) || [];
			const items = match.map( ( value ) => {
				return rawHandler( { HTML: value } )[ 0 ];
			} );

			return [ { ...attributes }, [ ...items ] ];
		},

		save( { attributes, className } ) {
			const {
				avatarID,
				avatarAlt,
				avatarURL,
				avatarBorderColor,
				backgroundColor,
				textColor,
				balloonName,
				balloonBody,
				modifier,
			} = attributes;

			const balloonFigureStyles = {
				borderColor: avatarBorderColor || undefined,
			};

			const bodyStyles = {
				backgroundColor: backgroundColor || undefined,
				borderColor: backgroundColor || undefined,
				color: textColor || undefined,
			};

			const classes = classnames( 'smb-balloon', {
				[ className ]: !! className,
				[ `smb-balloon--${ modifier }` ]: !! modifier,
			} );

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<div className="smb-balloon__person">
						<div
							className="smb-balloon__figure"
							style={ balloonFigureStyles }
						>
							<img
								src={ avatarURL }
								alt={ avatarAlt }
								className={ `wp-image-${ avatarID }` }
							/>
						</div>
						<div className="smb-balloon__name">
							<RichText.Content value={ balloonName } />
						</div>
					</div>
					<div className="smb-balloon__body" style={ bodyStyles }>
						<RichText.Content value={ balloonBody } />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			balloonBody: {
				type: 'string',
				source: 'html',
				selector: '.smb-balloon__body',
				multiline: 'p',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { balloonBody } = attributes;

			const match = balloonBody.match( /<p>(.+?)<\/p>/g ) || [];
			const items = match.map( ( value ) => {
				return rawHandler( { HTML: value } )[ 0 ];
			} );

			return [ { ...attributes }, [ ...items ] ];
		},

		save( { attributes } ) {
			const {
				avatarID,
				avatarURL,
				avatarBorderColor,
				balloonName,
				balloonBody,
				modifier,
			} = attributes;

			return (
				<div
					className={ classnames( 'smb-balloon', {
						[ `smb-balloon--${ modifier }` ]: !! modifier,
					} ) }
				>
					<div className="smb-balloon__person">
						<div
							className="smb-balloon__figure"
							style={ { borderColor: avatarBorderColor } }
						>
							<img
								src={ avatarURL }
								alt=""
								className={ `wp-image-${ avatarID }` }
							/>
						</div>
						<div className="smb-balloon__name">{ balloonName }</div>
					</div>
					<div className="smb-balloon__body">
						<RichText.Content value={ balloonBody } />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			balloonBody: {
				type: 'string',
				source: 'html',
				selector: '.smb-balloon__body',
				multiline: 'p',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { balloonBody } = attributes;

			const match = balloonBody.match( /<p>(.+?)<\/p>/g ) || [];
			const items = match.map( ( value ) => {
				return rawHandler( { HTML: value } )[ 0 ];
			} );

			return [ { ...attributes }, [ ...items ] ];
		},

		save( { attributes } ) {
			const {
				avatarURL,
				avatarBorderColor,
				balloonName,
				balloonBody,
				modifier,
			} = attributes;

			return (
				<div
					className={ classnames( 'smb-balloon', {
						[ `smb-balloon--${ modifier }` ]: !! modifier,
					} ) }
				>
					<div className="smb-balloon__person">
						<div
							className="smb-balloon__figure"
							style={ { borderColor: avatarBorderColor } }
						>
							<img src={ avatarURL } alt="" />
						</div>
						<div className="smb-balloon__name">{ balloonName }</div>
					</div>
					<div className="smb-balloon__body">
						<RichText.Content value={ balloonBody } />
					</div>
				</div>
			);
		},
	},
];
