import classnames from 'classnames';

import {
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/faq--item' ];
	const template = [ [ 'snow-monkey-blocks/faq--item' ] ];

	const classes = classnames( 'smb-faq', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-faq__body',
		},
		{
			allowedBlocks,
			template,
			templateLock: false,
		}
	);

	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
		</div>
	);
}
