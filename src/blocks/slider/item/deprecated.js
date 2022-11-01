import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
			const {
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
				caption,
				url,
				target,
			} = attributes;

			const classes = classnames( 'smb-slider__item', className );

			const item = (
				<>
					<div className="smb-slider__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							width={ !! imageWidth && imageWidth }
							height={ !! imageHeight && imageHeight }
							className={ `wp-image-${ imageID }` }
						/>
					</div>

					{ ! RichText.isEmpty( caption ) && (
						<div className="smb-slider__item__caption">
							<RichText.Content value={ caption } />
						</div>
					) }
				</>
			);

			return !! url ? (
				<a
					className={ classes }
					href={ url }
					target={ '_self' === target ? undefined : target }
					rel={
						'_self' === target ? undefined : 'noopener noreferrer'
					}
				>
					{ item }
				</a>
			) : (
				<div className={ classes }>{ item }</div>
			);
		},
	},
];
