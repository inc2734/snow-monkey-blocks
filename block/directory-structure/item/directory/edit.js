import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import { BaseControl, Button, PanelBody } from '@wordpress/components';

import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import FontAwesome from '@smb/component/font-awesome';

const ALLOWED_BLOCKS = [
	'snow-monkey-blocks/directory-structure--item--directory',
	'snow-monkey-blocks/directory-structure--item--file',
];

export default function ( { attributes, setAttributes, className } ) {
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
			renderAppender: InnerBlocks.ButtonBlockAppender,
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
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Icon', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/directory-structure--item--directory/icon"
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

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: iconColor,
							onChange: onChangeIconColor,
							label: __( 'Icon Color', 'snow-monkey-blocks' ),
						},
					] }
				/>
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
