'use strict';

import classnames from 'classnames';
import blockIcon from './block-icon.svg';

import { blockConfig } from '../../../../src/js/config/block.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { schema } from './_schema.js';
import { transforms } from './_transforms.js';

const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl, Button, ButtonGroup } = wp.components;
const { InspectorControls, RichText, PanelColorSettings } = wp.editor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/directory-structure--item--file', {
	title: __( 'File item', 'snow-monkey-blocks' ),
	description: __( 'Display a file item', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: blockIcon,
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	parent: [ 'snow-monkey-blocks/directory-structure' ],

	edit( { attributes, setAttributes, className } ) {
		const blockClasses = classnames(
			{
				'smb-directory-structure__item': true,
				'smb-directory-structure__item--file': true,
				[ className ]: !! className,
			}
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
	},

	save( { attributes, className } ) {
		const blockClasses = classnames(
			{
				'smb-directory-structure__item': true,
				'smb-directory-structure__item--file': true,
				[ className ]: !! className,
			}
		);

		const itemNameClasses = 'smb-directory-structure__item__name';

		const iconStyles = {
			color: attributes.iconColor || undefined,
		};

		return (
			<div className={ blockClasses }>
				<p>
					<span className="fa-fw" style={ iconStyles }>
						<i className={ `${ attributes.iconVendor } fa-${ attributes.iconClass }` } />
					</span>
					<span className={ itemNameClasses }><RichText.Content value={ attributes.name } /></span>
				</p>
			</div>
		);
	},

	transforms: transforms,
} );
