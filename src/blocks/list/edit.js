import classnames from 'classnames';
import { times } from 'lodash';

import {
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import metadata from './block.json';

// const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/list-item' ];
const ALLOWED_BLOCKS = [ 'core/list-item' ];

// const TEMPLATE = [ [ 'snow-monkey-blocks/list-item' ] ];
const TEMPLATE = [ [ 'core/list-item' ] ];

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { icon, iconColor, templateLock } = attributes;

	const iconList = [
		{
			value: 'angle-right',
			label: __( 'angle-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'angles-right',
			label: __( 'angles-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'circle-right',
			label: __( 'circle-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'arrow-right',
			label: __( 'arrow-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'check',
			label: __( 'check', 'snow-monkey-blocks' ),
		},
		{
			value: 'circle-check',
			label: __( 'circle-check', 'snow-monkey-blocks' ),
		},
		{
			value: 'square-check',
			label: __( 'square-check', 'snow-monkey-blocks' ),
		},
		{
			value: 'circle-chevron-right',
			label: __( 'circle-chevron-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'hand-point-right',
			label: __( 'hand-point-right', 'snow-monkey-blocks' ),
		},
	];

	const classes = classnames( 'smb-list', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock,
		}
	);

	return (
		<>
			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: iconColor,
							onColorChange: ( value ) =>
								setAttributes( {
									iconColor: value,
								} ),
							label: __( 'Icon color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
				></PanelColorGradientSettings>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							icon !== metadata.attributes.icon.default
						}
						isShownByDefault
						label={ __( 'Icon', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								icon: metadata.attributes.icon.default,
							} )
						}
					>
						<BaseControl
							label={ __( 'Icon', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/list/icon"
						>
							<div className="smb-list-icon-selector">
								{ times( iconList.length, ( index ) => {
									const value = iconList[ index ].value;

									const onClickIcon = () =>
										setAttributes( {
											icon: value,
										} );

									return (
										<Button
											variant={
												icon === value && 'primary'
											}
											onClick={ onClickIcon }
											key={ index }
										>
											<i
												className={ `fa-solid fa-${ iconList[ index ].value }` }
												title={
													iconList[ index ].label
												}
											/>
										</Button>
									);
								} ) }
							</div>
						</BaseControl>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div
				{ ...blockProps }
				data-icon={ icon }
				data-icon-color={ iconColor }
			>
				<style>
					{ `.editor-styles-wrapper [data-block="${ clientId }"] ul li::before, .customize-control-sidebar_block_editor [data-block="${ clientId }"] ul li::before { border-color: ${ iconColor } }` }
				</style>

				<ul { ...innerBlocksProps } />
			</div>
		</>
	);
}
