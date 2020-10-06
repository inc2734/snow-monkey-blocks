import classnames from 'classnames';

import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';
import {
	InnerBlocks,
	InspectorControls,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, setAttributes, className } ) {
	const { columnSize } = attributes;

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-pricing-table', {
		[ `smb-pricing-table--col-size-${ columnSize }` ]: !! columnSize,
		[ className ]: !! className,
	} );

	const allowedBlocks = [ 'snow-monkey-blocks/pricing-table--item' ];
	const template = [ [ 'snow-monkey-blocks/pricing-table--item' ] ];

	const onChangeColumnSize = ( value ) =>
		setAttributes( {
			columnSize: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Column Size', 'snow-monkey-blocks' ) }
						help={ __(
							'If the text of each item is long, it is recommended to select other than "Auto".',
							'snow-monkey-blocks'
						) }
						id="snow-monkey-blocks/pricing-table/column-size"
					>
						<SelectControl
							value={ columnSize }
							options={ [
								{
									value: '',
									label: __( 'Auto', 'snow-monkey-blocks' ),
								},
								{
									value: '1-4',
									label: __( '25%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-3',
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-2',
									label: __( '50%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-1',
									label: __( '100%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ onChangeColumnSize }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<BlockWrapper className={ classes }>
				<div className="c-row c-row--md-nowrap">
					<InnerBlocks
						allowedBlocks={ allowedBlocks }
						template={ template }
						templateLock={ false }
						orientation="horizontal"
					/>
				</div>
			</BlockWrapper>
		</>
	);
}
