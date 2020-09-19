import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	BaseControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';

import {
	InspectorControls,
	InnerBlocks,
	RichText,
	PanelColorSettings,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

import FontAwesome from '@smb/component/font-awesome';

export default function( { attributes, setAttributes, className } ) {
	const { iconColor, iconVendor, iconClass, name } = attributes;

	const allowedBlocks = [
		'snow-monkey-blocks/directory-structure--item--directory',
		'snow-monkey-blocks/directory-structure--item--file',
	];

	const BlockWrapper = Block.div;
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
						<ButtonGroup>
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
										isLarge
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
						</ButtonGroup>
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

			<BlockWrapper className={ classes }>
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
				<div className={ itemListClasses }>
					<InnerBlocks
						allowedBlocks={ allowedBlocks }
						templateLock={ false }
					/>
				</div>
			</BlockWrapper>
		</>
	);
}
