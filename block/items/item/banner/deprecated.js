import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
			url: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__banner',
				attribute: 'href',
				default: '',
			},
		},

		save( { attributes, className } ) {
			const {
				title,
				lede,
				url,
				target,
				blur,
				textColor,
				maskColor,
				maskOpacity,
				imageSize,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
			} = attributes;

			const classes = classnames( 'c-row__col', className );
			const bannerClasses = classnames(
				'smb-items__banner',
				`smb-items__banner--${ imageSize }`,
				{ 'smb-items__banner--blur': blur }
			);

			const styles = {
				color: textColor || undefined,
			};

			const imgStyles = {
				opacity: maskOpacity,
			};

			const maskStyles = {
				backgroundColor: maskColor || undefined,
			};

			return (
				<div className={ classes }>
					<a
						className={ bannerClasses }
						href={ url }
						target={ '_self' === target ? undefined : target }
						rel={
							'_self' === target
								? undefined
								: 'noopener noreferrer'
						}
						style={ styles }
					>
						<div className="smb-items__banner__figure">
							{ 1 > maskOpacity && (
								<div
									className="smb-items__banner__figure__mask"
									style={ maskStyles }
								/>
							) }
							{ !! imageURL ? (
								<img
									src={ imageURL }
									alt={ imageAlt }
									width={ !! imageWidth && imageWidth }
									height={ !! imageHeight && imageHeight }
									className={ `wp-image-${ imageID }` }
									style={ imgStyles }
								/>
							) : (
								<div
									className="smb-items__banner__figure__dummy"
									style={ imgStyles }
								/>
							) }
						</div>

						{ ( ! RichText.isEmpty( title ) ||
							! RichText.isEmpty( lede ) ) && (
							<div className="smb-items__banner__body">
								{ ! RichText.isEmpty( title ) && (
									<div className="smb-items__banner__title">
										<RichText.Content value={ title } />
									</div>
								) }

								{ ! RichText.isEmpty( lede ) && (
									<div className="smb-items__banner__lede">
										<RichText.Content value={ lede } />
									</div>
								) }
							</div>
						) }
					</a>
				</div>
			);
		},
	},
];
