import classnames from 'classnames';

import {
	BlockControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { JustifyToolbar } from './justify-toolbar';

export default function ( { attributes, setAttributes, className } ) {
	const { contentJustification } = attributes;

	const allowedBlocks = [ 'snow-monkey-blocks/btn' ];
	const template = [ [ 'snow-monkey-blocks/btn' ] ];

	const classes = classnames( 'smb-buttons', className, {
		[ `is-content-justification-${ contentJustification }` ]: contentJustification,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks,
		template,
		orientation: 'horizontal',
		__experimentalLayout: {
			type: 'default',
			alignments: [],
		},
	} );

	const onChangeContentJustification = ( value ) =>
		setAttributes( { contentJustification: value } );

	return (
		<>
			<BlockControls>
				<JustifyToolbar
					allowedControls={ [ 'left', 'center', 'right' ] }
					value={ contentJustification }
					onChange={ onChangeContentJustification }
					popoverProps={ {
						position: 'bottom right',
						isAlternate: true,
					} }
				/>
			</BlockControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
