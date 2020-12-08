import classnames from 'classnames';

import {
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-items__item',
		'smb-items__item--free'
	);

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: 'smb-items__item__body',
	} );

	return (
		<div { ...blockProps }>
			<div className={ itemClasses }>
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
