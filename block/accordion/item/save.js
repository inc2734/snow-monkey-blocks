'use strict';

import {
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';

import classnames from 'classnames';

export default function( { attributes, className } ) {
	const { title, initialState } = attributes;
	const classes = classnames( 'smb-accordion__item', className );

	return (
		<div className={ classes }>
			<input type="checkbox" className="smb-accordion__item__control" checked={ initialState } />
			<div className="smb-accordion__item__title">
				<span className="smb-accordion__item__title__label"><RichText.Content value={ title } /></span>
				<div className="smb-accordion__item__title__icon">
					<i className="fas fa-angle-down"></i>
				</div>
			</div>
			<div className="smb-accordion__item__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
