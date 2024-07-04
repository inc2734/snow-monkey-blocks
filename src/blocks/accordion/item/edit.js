import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	withColors,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps,
} from '@wordpress/block-editor';

import {
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import metadata from './block.json';

function Edit( { attributes, setAttributes, className, clientId } ) {
	const {
		title,
		initialState,
		titleBackgroundColor,
		titleColor,
		templateLock,
	} = attributes;

	const spacingProps = useSpacingProps( attributes );

	const classes = classnames( 'smb-accordion__item', className );

	const blockProps = useBlockProps( {
		className: classes,
		style: {
			'--smb-accordion-item--background-color':
				titleBackgroundColor || undefined,
			'--smb-accordion-item--color': titleColor || undefined,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-accordion__item__body',
			style: {
				...spacingProps.style,
			},
		},
		{ templateLock }
	);

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							initialState !==
							metadata.attributes.initialState.default
						}
						isShownByDefault
						label={ __(
							'Display in open state',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								initialState:
									metadata.attributes.initialState.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Display in open state',
								'snow-monkey-blocks'
							) }
							checked={ initialState }
							onChange={ ( value ) =>
								setAttributes( {
									initialState: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					panelId={ clientId }
					__experimentalIsRenderedInSidebar
					{ ...useMultipleOriginColorsAndGradients() }
					settings={ [
						{
							colorValue: titleBackgroundColor,
							onColorChange: ( value ) =>
								setAttributes( {
									titleBackgroundColor: value,
								} ),
							resetAllFilter: () => ( {
								titleBackgroundColor:
									metadata.titleBackgroundColor,
							} ),
							label: __(
								'Title background color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: titleColor,
							onColorChange: ( value ) =>
								setAttributes( {
									titleColor: value,
								} ),
							resetAllFilter: () => ( {
								titleColor: metadata.titleColor,
							} ),
							label: __(
								'Title text color',
								'snow-monkey-blocks'
							),
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-accordion__item__title">
					<RichText
						className="smb-accordion__item__title__label"
						value={ title }
						onChange={ ( value ) =>
							setAttributes( {
								title: value,
							} )
						}
						placeholder={ __(
							'Enter title here',
							'snow-monkey-blocks'
						) }
					/>
					<div className="smb-accordion__item__title__icon">
						<i className="fa-solid fa-angle-down"></i>
					</div>
				</div>

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

export default withColors( {
	titleBackgroundColor: 'background-color',
	titleColor: 'color',
} )( Edit );
