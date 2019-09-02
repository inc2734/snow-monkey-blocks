'use strict';

import classnames from 'classnames';
import { schema } from './_schema';

const { RichText, InnerBlocks } = wp.editor;

const _getColumnsSize = ( imageColumnSize ) => {
	let textColumnWidth = '1-3';
	let imageColumnWidth = '2-3';
	if ( 66 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-3';
		imageColumnWidth = '2-3';
	} else if ( 50 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-2';
		imageColumnWidth = '1-2';
	} else if ( 33 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '2-3';
		imageColumnWidth = '1-3';
	} else if ( 25 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '3-4';
		imageColumnWidth = '1-4';
	}

	return {
		textColumnWidth: textColumnWidth,
		imageColumnWidth: imageColumnWidth,
	};
};

export const deprecated = [
	{
		attributes: schema,

		save( { attributes } ) {
			const { title, imageID, imageURL, imagePosition, imageColumnSize } = attributes;

			const { textColumnWidth, imageColumnWidth } = _getColumnsSize( imageColumnSize );

			return (
				<div className="smb-media-text">
					<div className={ classnames( 'c-row', 'c-row--margin', 'c-row--middle', { 'c-row--reverse': 'left' === imagePosition } ) }>
						<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ textColumnWidth }` }>
							{ ! RichText.isEmpty( title ) &&
								<h2 className="smb-media-text__title">
									<RichText.Content value={ title } />
								</h2>
							}
							<div className="smb-media-text__body">
								<InnerBlocks.Content />
							</div>
						</div>
						<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ imageColumnWidth }` }>
							<div className="smb-media-text__figure">
								{ imageURL &&
									<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
								}
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: schema,

		save( { attributes } ) {
			const { title, imageURL, imagePosition, imageColumnSize } = attributes;

			const { textColumnWidth, imageColumnWidth } = _getColumnsSize( imageColumnSize );

			return (
				<div className="smb-media-text">
					<div className={ classnames( 'c-row', 'c-row--margin', 'c-row--middle', { 'c-row--reverse': 'left' === imagePosition } ) }>
						<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ textColumnWidth }` }>
							{ ! RichText.isEmpty( title ) &&
								<h2 className="smb-media-text__title">
									<RichText.Content value={ title } />
								</h2>
							}
							<div className="smb-media-text__body">
								<InnerBlocks.Content />
							</div>
						</div>
						<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ imageColumnWidth }` }>
							<div className="smb-media-text__figure">
								{ imageURL &&
									<img src={ imageURL } alt="" />
								}
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
];
