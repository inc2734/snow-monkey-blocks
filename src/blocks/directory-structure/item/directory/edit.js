import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { BaseControl, Button, PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import FontAwesome from '@smb/component/font-awesome';
import { useMigrateDoubleHyphenToSingleHyphen } from '@smb/hooks';

const ALLOWED_BLOCKS = [
	'snow-monkey-blocks/directory-structure-item-directory',
	'snow-monkey-blocks/directory-structure-item-file',
];

export default function ( { attributes, setAttributes, className, clientId } ) {
	useMigrateDoubleHyphenToSingleHyphen( clientId, [
		{
			oldBlockName:
				'snow-monkey-blocks/directory-structure--item--directory',
			newBlockName:
				'snow-monkey-blocks/directory-structure-item-directory',
		},
		{
			oldBlockName: 'snow-monkey-blocks/directory-structure--item--file',
			newBlockName: 'snow-monkey-blocks/directory-structure-item-file',
		},
	] );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const { iconColor, iconVendor, iconClass, name } = attributes;

	const classes = classnames(
		'smb-directory-structure__item',
		'smb-directory-structure__item--directory',
		className
	);

	const itemNameClasses = 'smb-directory-structure__item__name';

	const itemListClasses = 'smb-directory-structure__item__list';

	const iconStyles = {
		color: iconColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: itemListClasses,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			templateLock: false,
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

	const onChangeIconColor = ( value ) =>
		setAttributes( {
			iconColor: value,
		} );

	const onChangeName = ( value ) =>
		setAttributes( {
			name: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: iconColor,
							onColorChange: onChangeIconColor,
							label: __( 'Icon color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				/>

				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Icon', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/directory-structure-item-directory/icon"
					>
						<div className="smb-list-icon-selector">
							{ iconList.map( ( iconData ) => {
								const selected =
									iconVendor === iconData.vendor &&
									iconClass === iconData.value;

								const onClickIcon = () => {
									setAttributes( {
										iconVendor: iconData.vendor,
									} );
									setAttributes( {
										iconClass: iconData.value,
									} );
								};

								return (
									<Button
										isPrimary={ selected }
										aria-pressed={ selected }
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
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<p>
					<span className="fa-fw" style={ iconStyles }>
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
						onChange={ onChangeName }
					/>
				</p>

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
