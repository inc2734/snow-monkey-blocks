import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-items__item',
		'smb-items__item--free'
	);

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ itemClasses }>
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-items__item__body',
					} ) }
				/>
			</div>
		</div>
	);
}
