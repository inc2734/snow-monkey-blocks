import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--free'
	);

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ itemClasses }>
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-panels__item__body',
					} ) }
				/>
			</div>
		</div>
	);
}
