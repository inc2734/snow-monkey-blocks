import classnames from 'classnames';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default [
	{
		attributes: {
			title: {
				type: 'string',
				source: 'html',
				selector: '.smb-accordion__item__title',
				default: '',
			},
		},

		save( { attributes, className } ) {
			const classes = classnames( 'smb-accordion__item', className );
			const { title } = attributes;

			return (
				<div className={ classes }>
					<div className="smb-accordion__item__title">
						<RichText.Content value={ title } />
					</div>
					<input
						type="checkbox"
						className="smb-accordion__item__control"
					/>
					<div className="smb-accordion__item__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			title: {
				type: 'string',
				source: 'html',
				selector: '.smb-accordion__item__title',
				default: '',
			},
		},

		save( { attributes } ) {
			const { title } = attributes;

			return (
				<div className="smb-accordion__item">
					<div className="smb-accordion__item__title">
						<RichText.Content value={ title } />
					</div>
					<input
						type="checkbox"
						className="smb-accordion__item__control"
					/>
					<div className="smb-accordion__item__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];
