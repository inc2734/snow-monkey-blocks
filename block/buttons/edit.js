import classnames from 'classnames';

import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, setAttributes, className } ) {
	const { textAlign } = attributes;

	const allowedBlocks = [ 'snow-monkey-blocks/btn' ];
	const template = [ [ 'snow-monkey-blocks/btn' ] ];

	const classes = classnames( 'smb-buttons', className, {
		[ `has-text-align-${ textAlign }` ]: textAlign,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			allowedBlocks,
			template,
			orientation: 'horizontal',
			__experimentalLayout: {
				type: 'default',
				alignments: [],
			},
		}
	);

	const onChangeTextAlign = ( value ) =>
		setAttributes( { textAlign: value } );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ onChangeTextAlign }
				/>
			</BlockControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
