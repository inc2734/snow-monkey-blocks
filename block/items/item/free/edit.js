import classnames from 'classnames';

import {
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'c-row__col', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: 'smb-items__item__body',
	} );

	return (
		<>
			<div { ...blockProps }>
				<div className="smb-items__item">
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}
