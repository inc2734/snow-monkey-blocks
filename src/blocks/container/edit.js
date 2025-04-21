import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	ToggleControl,
	BaseControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import WidthPicker from '@smb/component/width-picker';
import { useToolsPanelDropdownMenuProps } from '@smb/helper';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { contentsMaxWidth, isSlim, removeGutters, templateLock } =
		attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-container', 'c-container', className, {
		'smb-container--no-gutters': removeGutters,
	} );

	const bodyClasses = classnames( 'smb-container__body', {
		'u-slim-width': isSlim && ! contentsMaxWidth,
	} );

	const bodyStyles = {
		width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: bodyClasses,
			style: bodyStyles,
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const dropdownMenuProps = useToolsPanelDropdownMenuProps();

	const disableIsSlim = !! contentsMaxWidth;
	const disableContentsMaxWidth = isSlim;

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
					dropdownMenuProps={ dropdownMenuProps }
				>
					{ ! disableContentsMaxWidth && (
						<ToolsPanelItem
							hasValue={ () =>
								contentsMaxWidth !==
								metadata.attributes.contentsMaxWidth.default
							}
							isShownByDefault
							label={ __(
								'Max width of the contents',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									contentsMaxWidth:
										metadata.attributes.contentsMaxWidth
											.default,
								} )
							}
						>
							<BaseControl
								__nextHasNoMarginBottom
								label={ __(
									'Max width of the contents',
									'snow-monkey-blocks'
								) }
								id="snow-monkey-blocks/container/contents-max-width"
							>
								<WidthPicker
									value={ contentsMaxWidth }
									onChange={ ( value ) =>
										setAttributes( {
											contentsMaxWidth: value,
										} )
									}
									withReset={ false }
								/>
							</BaseControl>
						</ToolsPanelItem>
					) }

					{ ! disableIsSlim && (
						<ToolsPanelItem
							hasValue={ () =>
								isSlim !== metadata.attributes.isSlim.default
							}
							isShownByDefault
							label={ __(
								'Make the contents width slim',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									isSlim: metadata.attributes.isSlim.default,
								} )
							}
						>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __(
									'Make the contents width slim',
									'snow-monkey-blocks'
								) }
								checked={ isSlim }
								onChange={ ( value ) =>
									setAttributes( {
										isSlim: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							removeGutters !==
							metadata.attributes.removeGutters.default
						}
						isShownByDefault
						label={ __(
							'Remove left and right spaces',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								removeGutters:
									metadata.attributes.removeGutters.default,
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __(
								'Remove left and right spaces',
								'snow-monkey-blocks'
							) }
							checked={ removeGutters }
							onChange={ ( value ) =>
								setAttributes( {
									removeGutters: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
