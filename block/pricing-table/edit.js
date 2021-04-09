import classnames from 'classnames';

import { BaseControl, PanelBody, SelectControl } from '@wordpress/components';

import {
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/pricing-table--item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/pricing-table--item' ] ];

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { columnSize, childrenCount } = attributes;

	const innerBlocksCount = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlocksByClientId(
			clientId
		)[ 0 ].innerBlocks.length;
	} );

	useEffect( () => {
		if ( !! innerBlocksCount ) {
			setAttributes( {
				childrenCount: innerBlocksCount,
			} );
		}
	}, [ innerBlocksCount ] );

	const classes = classnames( 'smb-pricing-table', {
		[ `smb-pricing-table--col-size-${ columnSize }` ]: !! columnSize,
		[ className ]: !! className,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: [ 'c-row', 'c-row--md-nowrap' ],
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			orientation: 'horizontal',
		}
	);

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

			<div
				{ ...blockProps }
				data-has-items={ 0 < childrenCount ? childrenCount : undefined }
			>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
