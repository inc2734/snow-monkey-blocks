'use strict';

import classnames from 'classnames';

import {
	RichText,
} from '@wordpress/editor';

export default function( { attributes, className } ) {
	const { content, icon, iconColor } = attributes;

	const classes = classnames( 'smb-list', className );

	return (
		<div className={ classes } data-icon={ icon } data-icon-color={ iconColor }>
			<ul>
				<RichText.Content value={ content } />
			</ul>
		</div>
	);
}
