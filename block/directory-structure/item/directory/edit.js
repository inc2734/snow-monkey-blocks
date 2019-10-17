'use strict';

import classnames from 'classnames';
import FontAwesome from '../../../../src/js/component/font-awesome';

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
} from '@wordpress/editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const allowedBlocks = [
		'snow-monkey-blocks/directory-structure--item--directory',
		'snow-monkey-blocks/directory-structure--item--file',
	];

	const blockClasses = classnames(
		'smb-directory-structure__item',
		'smb-directory-structure__item--directory',
		className
	);

	const itemNameClasses = 'smb-directory-structure__item__name';

	const itemListClasses = 'smb-directory-structure__item__list';

	const iconStyles = {
		color: attributes.iconColor || undefined,
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

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<BaseControl label={ __( 'Icon', 'snow-monkey-blocks' ) }>
						<ButtonGroup>
							{
								iconList.map( ( iconData ) => {
									const selected = attributes.iconVendor === iconData.vendor && attributes.iconClass === iconData.value;
									return (
										<Button
											isLarge
											isPrimary={ selected }
											aria-pressed={ selected }
											onClick={ () => {
												setAttributes( { iconVendor: iconData.vendor } );
												setAttributes( { iconClass: iconData.value } );
											} }
											key={ `icon_${ iconData.key }` }
										>
											<i className={ `fa-fw ${ iconData.vendor } fa-${ iconData.value }` } title={ iconData.label } />
										</Button>
									);
								} )
							}
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.iconColor,
							onChange: ( value ) => setAttributes( { iconColor: value } ),
							label: __( 'Icon Color', 'snow-monkey-blocks' ),
						},
					] }
				/>
			</InspectorControls>
			<div className={ blockClasses }>
				<p>
					<span className="fa-fw" style={ iconStyles }>
						<FontAwesome icon={ [ attributes.iconVendor, attributes.iconClass ] } />
					</span>
					<span className={ itemNameClasses }>
						<RichText
							placeholder={ __( 'Write directory name...', 'snow-monkey-blocks' ) }
							value={ attributes.name }
							onChange={ ( value ) => setAttributes( { name: value } ) }
						/>
					</span>
				</p>
				<div className={ itemListClasses }>
					<InnerBlocks
						allowedBlocks={ allowedBlocks }
						templateLock={ false }
					/>
				</div>
			</div>
		</Fragment>
	);
}
