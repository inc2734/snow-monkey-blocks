import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import FontAwesome from '@smb/component/font-awesome';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { iconColor, iconVendor, iconClass, name } = attributes;

	const classes = classnames(
		'smb-directory-structure__item',
		'smb-directory-structure__item--file',
		className
	);

	const itemNameClasses = 'smb-directory-structure__item__name';

	const styles = {
		'--smb-directory-structure--icon-color': iconColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const iconList = [
		{
			label: __( 'file - Solid', 'snow-monkey-blocks' ),
			key: 'file-solid',
			vendor: 'fas',
			value: 'file',
		},
		{
			label: __( 'file - Regular', 'snow-monkey-blocks' ),
			key: 'file-regular',
			vendor: 'far',
			value: 'file',
		},
	];

	return (
		<>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={ [
						{
							colorValue: iconColor,
							onColorChange: ( value ) =>
								setAttributes( {
									iconColor: value,
								} ),
							resetAllFilter: () => ( {
								iconColor: metadata.iconColor,
							} ),
							label: __( 'Icon color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
					{ ...useMultipleOriginColorsAndGradients() }
					panelId={ clientId }
				/>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							iconVendor !==
								metadata.attributes.iconVendor.default ||
							iconClass !== metadata.attributes.iconClass.default
						}
						isShownByDefault
						label={ __( 'Icon', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								iconVendor:
									metadata.attributes.iconVendor.default,
								iconClass:
									metadata.attributes.iconClass.default,
							} )
						}
					>
						<BaseControl
							label={ __( 'Icon', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/directory-structure-item-file/icon"
						>
							<div className="smb-list-icon-selector">
								{ iconList.map( ( iconData ) => {
									const onClickIcon = () => {
										setAttributes( {
											iconVendor: iconData.vendor,
											iconClass: iconData.value,
										} );
									};

									return (
										<Button
											variant={
												iconVendor ===
													iconData.vendor &&
												iconClass === iconData.value &&
												'primary'
											}
											onClick={ onClickIcon }
											key={ `icon_${ iconData.key }` }
										>
											<i
												className={ `fa-fw ${ iconData.vendor } fa-${ iconData.value }` }
												title={ iconData.label }
											/>
										</Button>
									);
								} ) }
							</div>
						</BaseControl>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<p>
					<span className="fa-fw">
						<FontAwesome icon={ [ iconVendor, iconClass ] } />
					</span>

					<RichText
						tagName="span"
						className={ itemNameClasses }
						placeholder={ __(
							'Write file name…',
							'snow-monkey-blocks'
						) }
						value={ name }
						onChange={ ( value ) =>
							setAttributes( {
								name: value,
							} )
						}
					/>
				</p>
			</div>
		</>
	);
}
