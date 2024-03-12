import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetGapCSSValue as getGapCSSValue,
} from '@wordpress/block-editor';

import {
	TextControl,
	RangeControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		columnsOption,
		columns,
		columnMinWidth,
		columnAutoRepeat,
		gridTemplateColumns,
		rowsOption,
		rows,
		gridTemplateRows,
		style,
		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const blockGapValue =
		style?.spacing?.blockGap &&
		getGapCSSValue( style?.spacing?.blockGap, '0px' );

	const classes = classnames(
		'smb-grid',
		`smb-grid--columns:${ columnsOption }`,
		`smb-grid--rows:${ rowsOption }`,
		className
	);

	const styles = {
		'--smb-grid--gap': blockGapValue || undefined,
		'--smb-grid--columns':
			( 'columns' === columnsOption && String( columns ) ) || undefined,
		'--smb-grid--column-min-width':
			( 'min' === columnsOption && columnMinWidth ) || undefined,
		'--smb-grid--column-auto-repeat':
			( 'min' === columnsOption && columnAutoRepeat ) || undefined,
		'--smb-grid--grid-template-columns':
			( 'free' === columnsOption && gridTemplateColumns ) || undefined,
		'--smb-grid--rows':
			( 'rows' === rowsOption && String( rows ) ) || undefined,
		'--smb-grid--grid-template-rows':
			( 'free' === rowsOption && gridTemplateRows ) || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		templateLock,
		renderAppender: hasInnerBlocks
			? InnerBlocks.DefaultBlockAppender
			: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							columnsOption !==
							metadata.attributes.columnsOption.default
						}
						isShownByDefault
						label={ 'grid-template-columns' }
						onDeselect={ () =>
							setAttributes( {
								columnsOption:
									metadata.attributes.columnsOption.default,
								columns: metadata.attributes.columns.default,
								columnMinWidth:
									metadata.attributes.columnMinWidth.default,
								columnAutoRepeat:
									metadata.attributes.columnAutoRepeat
										.default,
								gridTemplateColumns:
									metadata.attributes.gridTemplateColumns
										.default,
							} )
						}
					>
						<ToggleGroupControl
							label="grid-template-columns"
							value={ columnsOption }
							onChange={ ( value ) => {
								setAttributes( {
									columnsOption: value,
									columns:
										metadata.attributes.columns.default,
									columnMinWidth:
										metadata.attributes.columnMinWidth
											.default,
									columnAutoRepeat:
										metadata.attributes.columnAutoRepeat
											.default,
									gridTemplateColumns:
										metadata.attributes.gridTemplateColumns
											.default,
								} );
							} }
							isBlock
						>
							<ToggleGroupControlOption
								value="min"
								label={ __(
									'Minimum width',
									'snow-monkey-blocks'
								) }
							/>
							<ToggleGroupControlOption
								value="columns"
								label={ __(
									'Columns count',
									'snow-monkey-blocks'
								) }
							/>
							<ToggleGroupControlOption
								value="free"
								label={ __(
									'Free input',
									'snow-monkey-blocks'
								) }
							/>
						</ToggleGroupControl>

						{ 'columns' === columnsOption && (
							<RangeControl
								label={ __(
									'Columns count',
									'snow-monkey-blocks'
								) }
								value={ parseInt( columns ) }
								onChange={ ( value ) =>
									setAttributes( {
										columns: parseInt( value ),
									} )
								}
								min={ 1 }
								max={ 12 }
								step={ 1 }
							/>
						) }

						{ 'min' === columnsOption && (
							<>
								<UnitControl
									label={ __(
										'Minimum width',
										'snow-monkey-blocks'
									) }
									value={ columnMinWidth }
									onChange={ ( value ) =>
										setAttributes( {
											columnMinWidth: value,
										} )
									}
								/>

								<ToggleGroupControl
									label={ __(
										'Auto repeat',
										'snow-monkey-blocks'
									) }
									value={ columnAutoRepeat }
									onChange={ ( value ) => {
										setAttributes( {
											columnAutoRepeat: value,
										} );
									} }
									isBlock
								>
									<ToggleGroupControlOption
										value="auto-fit"
										label="auto-fit"
									/>
									<ToggleGroupControlOption
										value="auto-fill"
										label="auto-fill"
									/>
								</ToggleGroupControl>
							</>
						) }

						{ 'free' === columnsOption && (
							<TextControl
								value={ gridTemplateColumns }
								onChange={ ( value ) =>
									setAttributes( {
										gridTemplateColumns: value,
									} )
								}
							/>
						) }
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							rowsOption !==
							metadata.attributes.rowsOption.default
						}
						isShownByDefault
						label={ 'grid-template-rows' }
						onDeselect={ () =>
							setAttributes( {
								rowsOption:
									metadata.attributes.rowsOption.default,
								rows: metadata.attributes.rows.default,
								gridTemplateRows:
									metadata.attributes.gridTemplateRows
										.default,
							} )
						}
					>
						<ToggleGroupControl
							label="grid-template-rows"
							value={ rowsOption }
							onChange={ ( value ) => {
								setAttributes( {
									rowsOption: value,
									rows: metadata.attributes.rows.default,
									gridTemplateRows:
										metadata.attributes.gridTemplateRows
											.default,
								} );
							} }
							isBlock
						>
							<ToggleGroupControlOption
								value="rows"
								label={ __(
									'Rows count',
									'snow-monkey-blocks'
								) }
							/>
							<ToggleGroupControlOption
								value="free"
								label={ __(
									'Free input',
									'snow-monkey-blocks'
								) }
							/>
						</ToggleGroupControl>

						{ 'rows' === rowsOption && (
							<RangeControl
								label={ __(
									'Rows count',
									'snow-monkey-blocks'
								) }
								value={ parseInt( rows ) }
								onChange={ ( value ) =>
									setAttributes( {
										rows: parseInt( value ),
									} )
								}
								min={ 1 }
								max={ 12 }
								step={ 1 }
							/>
						) }

						{ 'free' === rowsOption && (
							<TextControl
								value={ gridTemplateRows }
								onChange={ ( value ) =>
									setAttributes( {
										gridTemplateRows: value,
									} )
								}
							/>
						) }
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
