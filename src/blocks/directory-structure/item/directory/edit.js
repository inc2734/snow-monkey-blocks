import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import FontAwesome from '@smb/component/font-awesome';

const ALLOWED_BLOCKS = [
	'snow-monkey-blocks/directory-structure-item-directory',
	'snow-monkey-blocks/directory-structure-item-file',
];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const { iconColor, iconVendor, iconClass, name, templateLock } = attributes;

	const classes = classnames(
		'smb-directory-structure__item',
		'smb-directory-structure__item--directory',
		className
	);

	const itemNameClasses = 'smb-directory-structure__item__name';

	const itemListClasses = 'smb-directory-structure__item__list';

	const styles = {
		'--smb-directory-structure--icon-color': iconColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: itemListClasses,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const iconList = [
		{
			label: __( 'folder - Solid', 'snow-monkey-blocks' ),
			key: 'folder-solid',
			vendor: 'fas',
			value: 'folder',
		},
		{
			label: __( 'folder-open - Solid', 'snow-monkey-blocks' ),
			key: 'folder-open-solid',
			vendor: 'fas',
			value: 'folder-open',
		},
		{
			label: __( 'folder-open - Regular', 'snow-monkey-blocks' ),
			key: 'folder-open-regular',
			vendor: 'far',
			value: 'folder-open',
		},
		{
			label: __( 'folder - Regular', 'snow-monkey-blocks' ),
			key: 'folder-regular',
			vendor: 'far',
			value: 'folder',
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
							id="snow-monkey-blocks/directory-structure-item-directory/icon"
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
						className={ itemNameClasses }
						tagName="span"
						placeholder={ __(
							'Write directory name…',
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

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
