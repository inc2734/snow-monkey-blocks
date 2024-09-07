import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	SelectControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/pricing-table-item' ];
const TEMPLATE = [
	[ 'snow-monkey-blocks/pricing-table-item' ],
	[ 'snow-monkey-blocks/pricing-table-item' ],
];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { columnSize, childrenCount, templateLock } = attributes;

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
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			templateLock,
			orientation: 'horizontal',
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							columnSize !==
							metadata.attributes.columnSize.default
						}
						isShownByDefault
						label={ __( 'Title tag', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								columnSize:
									metadata.attributes.columnSize.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Column size', 'snow-monkey-blocks' ) }
							help={ __(
								'If the text of each item is long, it is recommended to select other than "Auto".',
								'snow-monkey-blocks'
							) }
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
							onChange={ ( value ) =>
								setAttributes( {
									columnSize: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
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
