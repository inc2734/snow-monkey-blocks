'use strict';

import classnames from 'classnames';

const { RichText, InnerBlocks } = wp.editor;

export const deprecated = [
	{
		attributes: {
			title: {
				source: 'html',
				selector: '.smb-section__title',
			},
			backgroundColor: {
				type: 'string',
			},
			imageID: {
				type: 'number',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-section-with-image__figure > img',
				attribute: 'src',
				default: '',
			},
			imagePosition: {
				type: 'string',
				default: 'right',
			},
			imageColumnSize: {
				type: 'string',
				default: 66,
			},
		},

		save( { attributes } ) {
			const { title, backgroundColor, imageURL, imagePosition, imageColumnSize } = attributes;

			const _getColumnsSize = () => {
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

			const { textColumnWidth, imageColumnWidth } = _getColumnsSize( imageColumnSize );

			return (
				<div className="smb-section smb-section-with-image" style={ { backgroundColor: backgroundColor } }>
					<div className="c-container">
						<div className={ classnames( 'c-row', 'c-row--margin', 'c-row--middle', { 'c-row--reverse': 'left' === imagePosition } ) }>
							<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ textColumnWidth }` }>
								{ ! RichText.isEmpty( title ) &&
									<h2 className="smb-section__title">
										<RichText.Content value={ title } />
									</h2>
								}
								<div className="smb-section__body">
									<InnerBlocks.Content />
								</div>
							</div>
							<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ imageColumnWidth }` }>
								<div className="smb-section-with-image__figure">
									{ imageURL &&
										<img src={ imageURL } alt="" />
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			title: {
				source: 'html',
				selector: '.smb-section__title',
			},
			backgroundColor: {
				type: 'string',
			},
			imageID: {
				type: 'number',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-section-with-image__figure > img',
				attribute: 'src',
				default: '',
			},
			imagePosition: {
				type: 'string',
				default: 'right',
			},
			imageColumnSize: {
				type: 'string',
				default: 2,
			},
		},

		migrate( { imageColumnSize } ) {
			let newImageColumnSize = imageColumnSize;
			if ( 1 === parseInt( imageColumnSize ) ) {
				newImageColumnSize = 33;
			} else if ( 2 === parseInt( imageColumnSize ) ) {
				newImageColumnSize = 66;
			}
			return {
				imageColumnSize: newImageColumnSize,
			};
		},

		save( { attributes } ) {
			const { title, backgroundColor, imageURL, imagePosition, imageColumnSize } = attributes;

			return (
				<div className="smb-section smb-section-with-image" style={ { backgroundColor: backgroundColor } }>
					<div className="c-container">
						<div className={ classnames( 'c-row', 'c-row--margin', 'c-row--middle', { 'c-row--reverse': 'left' === imagePosition } ) }>
							<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ 3 - imageColumnSize }-3` }>
								{ ! RichText.isEmpty( title ) &&
									<h2 className="smb-section__title">
										<RichText.Content value={ title } />
									</h2>
								}
								<div className="smb-section__body">
									<InnerBlocks.Content />
								</div>
							</div>
							<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ imageColumnSize }-3` }>
								<div className="smb-section-with-image__figure">
									{ imageURL &&
										<img src={ imageURL } alt="" />
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
];
