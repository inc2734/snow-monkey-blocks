import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	BaseControl,
	RangeControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/testimonial-item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/testimonial-item' ] ];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { md, lg, gap, templateLock } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-testimonial', className );
	const rowClasses = classnames( 'c-row', 'c-row--margin', {
		[ `c-row--margin-${ gap }` ]: !! gap,
	} );

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
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
			orientation: 'horizontal',
		}
	);

	const gapOptions = [
		{
			label: 'S',
			value: 1,
		},
		{
			label: 'M',
			value: 2,
		},
		{
			label: 'L',
			value: 3,
		},
	];

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							lg !== metadata.attributes.lg.default ||
							md !== metadata.attributes.md.default
						}
						isShownByDefault
						label={ __( 'Columns per row', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								lg: metadata.attributes.lg.default,
								md: metadata.attributes.md.default,
							} )
						}
					>
						<ResponsiveTabPanel
							desktop={ () => (
								<RangeControl
									label={ __(
										'Columns per row (Large window)',
										'snow-monkey-blocks'
									) }
									value={ lg }
									onChange={ ( value ) =>
										setAttributes( {
											lg: toNumber( value, 1, 4 ),
										} )
									}
									min="1"
									max="4"
								/>
							) }
							tablet={ () => (
								<RangeControl
									label={ __(
										'Columns per row (Medium window)',
										'snow-monkey-blocks'
									) }
									value={ md }
									onChange={ ( value ) =>
										setAttributes( {
											md: toNumber( value, 1, 2 ),
										} )
									}
									min="1"
									max="2"
								/>
							) }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<InspectorControls group="dimensions">
				<ToolsPanelItem
					hasValue={ () => gap !== metadata.attributes.gap.default }
					isShownByDefault
					label={ __(
						'The gap between each item',
						'snow-monkey-blocks'
					) }
					onDeselect={ () =>
						setAttributes( {
							gap: metadata.attributes.gap.default,
						} )
					}
					panelId={ clientId }
				>
					<BaseControl
						id="snow-monkey-blocks/testimonials/gap"
						label={ __(
							'The gap between each item',
							'snow-monkey-blocks'
						) }
						className="spacing-sizes-control"
					>
						<RangeControl
							className="spacing-sizes-control__range-control"
							value={
								gapOptions.filter(
									( option ) =>
										option.label?.toLowerCase() === gap
								)?.[ 0 ]?.value
							}
							resetFallbackValue={ undefined }
							onChange={ ( value ) =>
								setAttributes( {
									gap: gapOptions
										.filter(
											( option ) => option.value === value
										)?.[ 0 ]
										?.label?.toLowerCase(),
								} )
							}
							withInputField={ false }
							min={ 1 }
							max={ 3 }
							marks
							renderTooltipContent={ ( _value ) =>
								gapOptions
									.filter(
										( option ) => option.value === _value
									)?.[ 0 ]
									?.label?.toUpperCase()
							}
							hideLabelFromVision
							__nextHasNoMarginBottom
						/>
					</BaseControl>
				</ToolsPanelItem>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-testimonial__body">
					<div
						{ ...innerBlocksProps }
						data-columns="1"
						data-md-columns={ md }
						data-lg-columns={ lg }
					/>
				</div>
			</div>
		</>
	);
}
