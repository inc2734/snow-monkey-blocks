'use strict';

const { RichText, InnerBlocks } = wp.editor;

export const deprecated = [
	{
		attributes: {
			title: {
				source: 'html',
				selector: '.smb-section__title',
			},
			imageID: {
				type: 'number',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-section-with-bgimage__bgimage > img',
				attribute: 'src',
				default: '',
			},
			height: {
				type: 'string',
				default: 'fit',
			},
			contentsAlignment: {
				type: 'string',
				default: 'left',
			},
			maskColor: {
				type: 'string',
				default: '#000',
			},
			maskOpacity: {
				type: 'number',
				default: 1,
			},
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
			title: {
				source: 'html',
				selector: '.smb-section__title',
			},
			imageID: {
				type: 'number',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-section-with-bgimage__bgimage > img',
				attribute: 'src',
				default: '',
			},
			height: {
				type: 'string',
				default: 'fit',
			},
			contentsAlignment: {
				type: 'string',
				default: 'left',
			},
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
