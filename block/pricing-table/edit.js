import classnames from 'classnames';

import { BaseControl, PanelBody, SelectControl } from '@wordpress/components';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { useMigrateDoubleHyphenToSingleHyphen } from '@smb/hooks';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/pricing-table-item' ];
const TEMPLATE = [
	[ 'snow-monkey-blocks/pricing-table-item' ],
	[ 'snow-monkey-blocks/pricing-table-item' ],
];

export default function ( { attributes, setAttributes, className, clientId } ) {
	useMigrateDoubleHyphenToSingleHyphen( clientId, [
		{
			oldBlockName: 'snow-monkey-blocks/pricing-table--item',
			newBlockName: 'snow-monkey-blocks/pricing-table-item',
		},
	] );

	const { columnSize, childrenCount } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const innerBlocksCount = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

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

	const rowClasses = classnames( 'c-row', 'c-row--md-nowrap' );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: rowClasses,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			orientation: 'horizontal',
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
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
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Column size', 'snow-monkey-blocks' ) }
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
