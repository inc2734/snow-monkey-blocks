import classnames from 'classnames';

import {
	BlockControls,
	JustifyContentControl,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/btn' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/btn' ] ];
const LAYOUT = {
	type: 'default',
	alignments: [],
};
const HORIZONTAL_JUSTIFY_CONTROLS = [
	'left',
	'center',
	'right',
	'space-between',
];

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
		__experimentalLayout: LAYOUT,
	} );

	const onChangeContentJustification = ( value ) =>
		setAttributes( { contentJustification: value } );

	const justifyControls = HORIZONTAL_JUSTIFY_CONTROLS;

	return (
		<>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={ justifyControls }
					value={ contentJustification }
					onChange={ onChangeContentJustification }
				/>
			</BlockControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
