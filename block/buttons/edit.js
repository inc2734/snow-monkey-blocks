import classnames from 'classnames';

import {
	InnerBlocks,
	AlignmentToolbar,
	BlockControls,
	__experimentalAlignmentHookSettingsProvider as AlignmentHookSettingsProvider,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

export default function( { attributes, setAttributes, className } ) {
	const { textAlign } = attributes;

	const allowedBlocks = [ 'snow-monkey-blocks/btn' ];
	const template = [ [ 'snow-monkey-blocks/btn' ] ];

	const alignmentHooksSetting = {
		isEmbedButton: true,
	};

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-buttons', className, {
		[ `has-text-align-${ textAlign }` ]: textAlign,
	} );

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

			<BlockWrapper className={ classes }>
				<AlignmentHookSettingsProvider value={ alignmentHooksSetting }>
					<InnerBlocks
						allowedBlocks={ allowedBlocks }
						template={ template }
						orientation="horizontal"
					/>
				</AlignmentHookSettingsProvider>
			</BlockWrapper>
		</>
	);
}
