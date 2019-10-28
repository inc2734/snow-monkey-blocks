'use strict';

import classnames from 'classnames';
import { getColumnSize } from '../../src/js/helper/helper';

import {
	RichText,
	InnerBlocks,
} from '@wordpress/editor';

export default function( { attributes, className } ) {
	const { titleTagName, title, imageID, imageURL, imageAlt, imagePosition, imageColumnSize, url, target } = attributes;

	const { textColumnWidth, imageColumnWidth } = getColumnSize( imageColumnSize );

	const classes = classnames( 'smb-media-text', className );

	const rowClasses = classnames(
		'c-row',
		'c-row--margin',
		'c-row--middle',
		{
			'c-row--reverse': 'left' === imagePosition,
		}
	);

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ textColumnWidth }` ] );

	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ imageColumnWidth }` ] );

	const Figure = () => {
		const Img = () => {
			return (
				<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
			);
		};

		if ( url ) {
			return (
				<a
					href={ url }
					target={ '_self' === target ? undefined : target }
					rel={ '_self' === target ? undefined : 'noopener noreferrer' }
				>
					<Img />
				</a>
			);
		}

		return <Img />;
	};

	return (
		<div className={ classes }>
			<div className={ rowClasses }>
				<div className={ textColumnClasses }>
					{ ! RichText.isEmpty( title ) && 'none' !== titleTagName &&
						<RichText.Content
							className="smb-media-text__title"
							tagName={ titleTagName }
							value={ title }
						/>
					}
					<div className="smb-media-text__body">
						<InnerBlocks.Content />
					</div>
				</div>
				<div className={ imageColumnClasses }>
					<div className="smb-media-text__figure">
						{ imageURL &&
							<Figure />
						}
					</div>
				</div>
			</div>
		</div>
	);
}
