import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
} from '@wordpress/block-editor';

import { BaseControl, Button, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import FontAwesome from '@smb/component/font-awesome';

export default function ( { attributes, setAttributes, className } ) {
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
											iconVendor === iconData.vendor &&
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
				</PanelBody>
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
						onChange={ onChangeName }
					/>
				</p>
			</div>
		</>
	);
}
