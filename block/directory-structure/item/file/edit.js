'use strict';

import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	PanelBody, BaseControl, Button, ButtonGroup,
} from '@wordpress/components';

import {
	InspectorControls,
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
	const blockClasses = classnames(
		'smb-directory-structure__item',
		'smb-directory-structure__item--file',
		className
	);

	const itemNameClasses = 'smb-directory-structure__item__name';

	const iconStyles = {
		color: attributes.iconColor || undefined,
	};

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
						<FontAwesomeIcon icon={ [ attributes.iconVendor, attributes.iconClass ] } />
					</span>
					<span className={ itemNameClasses }>
						<RichText
							placeholder={ __( 'Write file name...', 'snow-monkey-blocks' ) }
							value={ attributes.name }
							onChange={ ( value ) => setAttributes( { name: value } ) }
						/>
					</span>
				</p>
			</div>
		</Fragment>
	);
}
