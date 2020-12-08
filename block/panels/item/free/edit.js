import classnames from 'classnames';

import {
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--free'
	);

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: 'smb-panels__item__body',
	} );

	return (
		<div { ...blockProps }>
			<div className={ itemClasses }>
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
