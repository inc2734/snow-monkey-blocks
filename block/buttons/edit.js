import classnames from 'classnames';

import {
	BlockControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { JustifyToolbar } from './justify-toolbar';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/btn' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/btn' ] ];
const ALLOWED_CONTROLS = [ 'left', 'center', 'right' ];

export default function ( { attributes, setAttributes, className } ) {
	const { contentJustification } = attributes;

	const classes = classnames( 'smb-buttons', className, {
		[ `is-content-justification-${ contentJustification }` ]: contentJustification,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
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
					allowedControls={ ALLOWED_CONTROLS }
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
