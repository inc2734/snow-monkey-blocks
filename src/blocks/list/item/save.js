import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { content } = attributes;

	const classes = classnames( 'smb-list__item', className );

	return (
		<li { ...useBlockProps.save( { className: classes } ) }>
			<RichText.Content value={ content } />
		</li>
	);
}
