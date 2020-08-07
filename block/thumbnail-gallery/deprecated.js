import classnames from 'classnames';
import { get, times } from 'lodash';

import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'wide', 'full' ],
		},

		migrate() {
			return {
				arrows: blockAttributes.arrows.default,
				speed: blockAttributes.speed.default,
				autoplay: blockAttributes.autoplay.default,
				autoplaySpeed: blockAttributes.autoplaySpeed.default,
			};
		},

		save( { className } ) {
			const classes = classnames( 'smb-thumbnail-gallery', className );

			return (
				<div className={ classes }>
					<div className="smb-thumbnail-gallery__canvas">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			content: {
				type: 'array',
				source: 'query',
				selector: '.smb-thumbnail-gallery__item',
				default: [],
				query: {
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-thumbnail-gallery__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-thumbnail-gallery__item__figure > img',
						attribute: 'src',
						default: '',
					},
				},
			},
			items: {
				type: 'number',
				default: 2,
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
		},

		migrate( attributes ) {
			const migratedInnerBlocks = () => {
				const length =
					'undefined' === typeof attributes.content
						? 0
						: attributes.content.length;

				return times( length, ( index ) => {
					const imageID = get(
						attributes.content,
						[ index, 'imageID' ],
						0
					);
					const imageURL = get(
						attributes.content,
						[ index, 'imageURL' ],
						''
					);

					return createBlock(
						'snow-monkey-blocks/thumbnail-gallery--item',
						{
							imageID: Number( imageID ),
							imageURL,
						}
					);
				} );
			};

			return [ {}, migratedInnerBlocks() ];
		},

		save( { attributes, className } ) {
			const { content } = attributes;

			const classes = classnames( 'smb-thumbnail-gallery', className );
			const length = 'undefined' === typeof content ? 0 : content.length;

			return (
				<div className={ classes }>
					<div className="smb-thumbnail-gallery__canvas">
						{ times( length, ( index ) => {
							const imageID = get(
								content,
								[ index, 'imageID' ],
								0
							);
							const imageURL = get(
								content,
								[ index, 'imageURL' ],
								''
							);

							return (
								<>
									{ !! imageID && (
										<div className="smb-thumbnail-gallery__item">
											<div className="smb-thumbnail-gallery__item__figure">
												<img
													src={ imageURL }
													alt=""
													className={ `wp-image-${ imageID }` }
													data-image-id={ imageID }
												/>
											</div>
										</div>
									) }
								</>
							);
						} ) }
					</div>

					<div className="smb-thumbnail-gallery__nav">
						{ times( length, ( index ) => {
							const imageID = get(
								content,
								[ index, 'imageID' ],
								0
							);
							const imageURL = get(
								content,
								[ index, 'imageURL' ],
								''
							);

							return (
								<>
									{ !! imageID && (
										<div className="smb-thumbnail-gallery__nav__item">
											<div className="smb-thumbnail-gallery__nav__item__figure">
												<img
													src={ imageURL }
													alt=""
													className={ `wp-image-${ imageID }` }
													data-image-id={ imageID }
												/>
											</div>
										</div>
									) }
								</>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			content: {
				type: 'array',
				source: 'query',
				selector: '.smb-thumbnail-gallery__item',
				default: [],
				query: {
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-thumbnail-gallery__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-thumbnail-gallery__item__figure > img',
						attribute: 'src',
						default: '',
					},
				},
			},
			items: {
				type: 'number',
				default: 2,
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const { items, content } = attributes;

			return (
				<div className="smb-thumbnail-gallery">
					<div className="smb-thumbnail-gallery__canvas">
						{ times( items, ( index ) => {
							const imageID = get(
								content,
								[ index, 'imageID' ],
								0
							);
							const imageURL = get(
								content,
								[ index, 'imageURL' ],
								''
							);

							return (
								<>
									{ !! imageID && (
										<div className="smb-thumbnail-gallery__item">
											<div className="smb-thumbnail-gallery__item__figure">
												<img
													src={ imageURL }
													alt=""
													className={ `wp-image-${ imageID }` }
													data-image-id={ imageID }
												/>
											</div>
										</div>
									) }
								</>
							);
						} ) }
					</div>

					<div className="smb-thumbnail-gallery__nav">
						{ times( items, ( index ) => {
							const imageID = get(
								content,
								[ index, 'imageID' ],
								0
							);
							const imageURL = get(
								content,
								[ index, 'imageURL' ],
								''
							);

							return (
								<>
									{ !! imageID && (
										<div className="smb-thumbnail-gallery__nav__item">
											<div className="smb-thumbnail-gallery__nav__item__figure">
												<img
													src={ imageURL }
													alt=""
													className={ `wp-image-${ imageID }` }
													data-image-id={ imageID }
												/>
											</div>
										</div>
									) }
								</>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
];
