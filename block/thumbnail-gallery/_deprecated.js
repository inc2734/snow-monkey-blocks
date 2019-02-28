'use strict';

import { schema } from './_schema.js';

const { get, times } = lodash;
const { Fragment } = wp.element;

export const deprecated = [
	{
		attributes: schema,

		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const { items, content } = attributes;

			return (
				<div className="smb-thumbnail-gallery">
					<div className="smb-thumbnail-gallery__canvas">
						{ times( items, ( index ) => {
							const imageID = get( content, [ index, 'imageID' ], 0 );
							const imageURL = get( content, [ index, 'imageURL' ], '' );

							return (
								<Fragment>
									{ !! imageID &&
										<div className="smb-thumbnail-gallery__item">
											<div className="smb-thumbnail-gallery__item__figure">
												<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } data-image-id={ imageID } />
											</div>
										</div>
									}
								</Fragment>
							);
						} ) }
					</div>

					<div className="smb-thumbnail-gallery__nav">
						{ times( items, ( index ) => {
							const imageID = get( content, [ index, 'imageID' ], 0 );
							const imageURL = get( content, [ index, 'imageURL' ], '' );

							return (
								<Fragment>
									{ !! imageID &&
										<div className="smb-thumbnail-gallery__nav__item">
											<div className="smb-thumbnail-gallery__nav__item__figure">
												<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } data-image-id={ imageID } />
											</div>
										</div>
									}
								</Fragment>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
];
