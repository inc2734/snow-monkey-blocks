import classnames from 'classnames';

import {
	InnerBlocks,
	AlignmentToolbar,
	BlockControls,
	__experimentalAlignmentHookSettingsProvider as AlignmentHookSettingsProvider,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

export default function( { attributes, setAttributes, className } ) {
	const { align } = attributes;

	const allowedBlocks = [ 'snow-monkey-blocks/btn' ];
	const template = [ [ 'snow-monkey-blocks/btn' ] ];

	const alignmentHooksSetting = {
		isEmbedButton: true,
	};

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-buttons', className, {
		[ `has-text-align-${ align }` ]: align,
	} );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
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
