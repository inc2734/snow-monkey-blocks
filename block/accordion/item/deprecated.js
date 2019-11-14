'use strict';

import classnames from 'classnames';

import {
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';

export default [
	{
		attributes: {
			title: {
				source: 'html',
				selector: '.smb-accordion__item__title',
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
					<input type="checkbox" className="smb-accordion__item__control" />
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
				source: 'html',
				selector: '.smb-accordion__item__title',
			},
		},

		save( { attributes } ) {
			const { title } = attributes;

			return (
				<div className="smb-accordion__item">
					<div className="smb-accordion__item__title">
						<RichText.Content value={ title } />
					</div>
					<input type="checkbox" className="smb-accordion__item__control" />
					<div className="smb-accordion__item__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];
