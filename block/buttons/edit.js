import classnames from 'classnames';

import {
	BlockControls,
	InnerBlocks,
	JustifyToolbar,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

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

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { contentJustification } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

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
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
		__experimentalLayout: LAYOUT,
	} );

	const onChangeContentJustification = ( value ) =>
		setAttributes( { contentJustification: value } );

	return (
		<>
			<BlockControls group="block">
				<JustifyToolbar
					allowedControls={ HORIZONTAL_JUSTIFY_CONTROLS }
					value={ contentJustification }
					onChange={ onChangeContentJustification }
				/>
			</BlockControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
