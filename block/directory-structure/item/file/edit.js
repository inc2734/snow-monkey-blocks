import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import { BaseControl, Button, PanelBody } from '@wordpress/components';

import {
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

import FontAwesome from '@smb/component/font-awesome';

export default function ( { attributes, setAttributes, className } ) {
	const { iconColor, iconVendor, iconClass, name } = attributes;

	const classes = classnames(
		'smb-directory-structure__item',
		'smb-directory-structure__item--file',
		className
	);

	const itemNameClasses = 'smb-directory-structure__item__name';

	const iconStyles = {
		color: iconColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
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
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Icon', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/directory-structure--item--file/icon"
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
