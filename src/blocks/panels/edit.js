import classnames from 'classnames';

import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import { useMigrateDoubleHyphenToSingleHyphen } from '@smb/hooks';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

const ALLOWED_BLOCKS = [
	'snow-monkey-blocks/panels-item',
	'snow-monkey-blocks/panels-item-horizontal',
	'snow-monkey-blocks/panels-item-free',
	'snow-monkey-blocks/panels-item-block-link',
];

const HORIZONTAL_JUSTIFY_CONTROLS = [
	'left',
	'center',
	'right',
	'space-between',
];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	useMigrateDoubleHyphenToSingleHyphen( clientId, [
		{
			oldBlockName: 'snow-monkey-blocks/panels--item--free',
			newBlockName: 'snow-monkey-blocks/panels-item-free',
		},
		{
			oldBlockName: 'snow-monkey-blocks/panels--item--horizontal',
			newBlockName: 'snow-monkey-blocks/panels-item-horizontal',
		},
		{
			oldBlockName: 'snow-monkey-blocks/panels--item',
			newBlockName: 'snow-monkey-blocks/panels-item',
		},
	] );

	const { sm, md, lg, imagePadding, contentJustification, isGlue, gap } =
		attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-panels', className, {
		'smb-panels--glue': isGlue && ! gap,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const contentJustificationModifier =
		!! contentJustification && 'left' !== contentJustification
			? contentJustification.replace( 'space-', '' )
			: undefined;

	const rowClasses = classnames( 'c-row', 'c-row--fill', {
		'c-row--margin': ! isGlue && ( 'm' === gap || ! gap ),
		[ `c-row--${ contentJustificationModifier }` ]: contentJustification,
		[ `c-row--margin-${ gap }` ]:
			! isGlue && ( 's' === gap || 'l' === gap ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: rowClasses,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			templateLock: false,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
			orientation: 'horizontal',
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
							lg !== metadata.attributes.lg.default ||
							md !== metadata.attributes.md.default ||
							sm !== metadata.attributes.sm.default
						}
						isShownByDefault
						label={ __( 'Columns per row', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								lg: metadata.attributes.lg.default,
								md: metadata.attributes.md.default,
								sm: metadata.attributes.sm.default,
							} )
						}
					>
						<ResponsiveTabPanel
							desktop={ () => {
								return (
									<RangeControl
										label={ __(
											'Columns per row (Large window)',
											'snow-monkey-blocks'
										) }
										value={ lg }
										onChange={ ( value ) =>
											setAttributes( {
												lg: toNumber( value, 1, 6 ),
											} )
										}
										min="1"
										max="6"
									/>
								);
							} }
							tablet={ () => {
								return (
									<RangeControl
										label={ __(
											'Columns per row (Medium window)',
											'snow-monkey-blocks'
										) }
										value={ md }
										onChange={ ( value ) =>
											setAttributes( {
												md: toNumber( value, 1, 6 ),
											} )
										}
										min="1"
										max="6"
									/>
								);
							} }
							mobile={ () => {
								return (
									<RangeControl
										label={ __(
											'Columns per row (Small window)',
											'snow-monkey-blocks'
										) }
										value={ sm }
										onChange={ ( value ) =>
											setAttributes( {
												sm: toNumber( value, 1, 6 ),
											} )
										}
										min="1"
										max="6"
									/>
								);
							} }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							imagePadding !==
							metadata.attributes.imagePadding.default
						}
						isShownByDefault
						label={ __(
							'Set padding around images',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								imagePadding:
									metadata.attributes.imagePadding.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Set padding around images',
								'snow-monkey-blocks'
							) }
							checked={ imagePadding }
							onChange={ ( value ) =>
								setAttributes( {
									imagePadding: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ ! gap && (
						<ToolsPanelItem
							hasValue={ () =>
								isGlue !== metadata.attributes.isGlue.default
							}
							isShownByDefault
							label={ __(
								'Glue each item together',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									isGlue: metadata.attributes.isGlue.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Glue each item together',
									'snow-monkey-blocks'
								) }
								checked={ isGlue }
								onChange={ ( value ) =>
									setAttributes( {
										isGlue: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }
				</ToolsPanel>
			</InspectorControls>

			{ ! isGlue && (
				<InspectorControls group="dimensions">
					<ToolsPanelItem
						hasValue={ () =>
							gap !== metadata.attributes.gap.default
						}
						isShownByDefault
						label={ __( 'Gap', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								gap: metadata.attributes.gap.default,
							} )
						}
						panelId={ clientId }
					>
						<SelectControl
							label={ __( 'Gap', 'snow-monkey-blocks' ) }
							value={ gap }
							onChange={ ( value ) =>
								setAttributes( {
									gap: value,
								} )
							}
							options={ [
								{
									value: '',
									label: __(
										'Default',
										'snow-monkey-blocks'
									),
								},
								{
									value: 's',
									label: __( 'S', 'snow-monkey-blocks' ),
								},
								{
									value: 'm',
									label: __( 'M', 'snow-monkey-blocks' ),
								},
								{
									value: 'l',
									label: __( 'L', 'snow-monkey-blocks' ),
								},
							] }
						/>
					</ToolsPanelItem>
				</InspectorControls>
			) }

			<BlockControls group="block">
				<JustifyToolbar
					allowedControls={ HORIZONTAL_JUSTIFY_CONTROLS }
					value={ contentJustification }
					onChange={ ( value ) =>
						setAttributes( { contentJustification: value } )
					}
				/>
			</BlockControls>

			<div { ...blockProps } data-image-padding={ imagePadding }>
				<div
					{ ...innerBlocksProps }
					data-columns={ sm }
					data-md-columns={ md }
					data-lg-columns={ lg }
				/>
			</div>
		</>
	);
}
