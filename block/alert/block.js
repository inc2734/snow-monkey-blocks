'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

let isIconUpdated = false;

registerBlockType( 'snow-monkey-blocks/alert', {
	title: __( 'Alert', 'snow-monkey-blocks' ),
	description: __( 'It is a block that warns visitors.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	snowMonkeyBlocks: {
		screenshot: 'https://snow-monkey.2inc.org/wp-content/uploads/2018/10/screenshot-1.png',
	},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { title, content, modifier, icon } = attributes;

		const iconList = [
			{
				value: 'exclamation-circle',
				label: __( 'exclamation-circle', 'snow-monkey-blocks' ),
			},
			{
				value: 'check',
				label: __( 'check', 'snow-monkey-blocks' ),
			},
			{
				value: 'check-circle',
				label: __( 'check-circle', 'snow-monkey-blocks' ),
			},
			{
				value: 'check-square',
				label: __( 'check-square', 'snow-monkey-blocks' ),
			},
			{
				value: 'hand-point-right',
				label: __( 'hand-point-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'edit',
				label: __( 'edit', 'snow-monkey-blocks' ),
			},
			{
				value: 'lightbulb',
				label: __( 'lightbulb', 'snow-monkey-blocks' ),
			},
		];

		const TitleIcon = () => {
			return (
				<Fragment>
					{ ! isIconUpdated ? (
						<span><i className={ `fas fa-${ icon }` } /></span>
					) : (
						<FontAwesomeIcon icon={ icon } />
					) }
				</Fragment>
			);
		};

		const classes = classnames(
			{
				'smb-alert': true,
				[ className ]: !! className,
				[ `smb-alert--${ modifier }` ]: !! modifier,
			}
		);

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Alert Settings', 'snow-monkey-blocks' ) }>
						<SelectControl
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ modifier }
							onChange={ ( value ) => setAttributes( { modifier: value } ) }
							options={ [
								{
									value: '',
									label: __( 'Normal alert', 'snow-monkey-blocks' ),
								},
								{
									value: 'warning',
									label: __( 'Warning alert', 'snow-monkey-blocks' ),
								},
								{
									value: 'success',
									label: __( 'Success alert', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<BaseControl label={ __( 'Icon', 'snow-monkey-blocks' ) }>
							<div className="smb-list-icon-selector">
								{ times( iconList.length, ( index ) => {
									return (
										<Button
											isDefault
											isPrimary={ icon === iconList[ index ].value }
											onClick={ () => {
												isIconUpdated = true;
												setAttributes( { icon: iconList[ index ].value } );
											} }
										>
											<i className={ `fas fa-${ iconList[ index ].value }` } title={ iconList[ index ].label } />
										</Button>
									);
								} ) }
							</div>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					{ ( ! RichText.isEmpty( title ) || isSelected ) &&
						<div className="smb-alert__title">
							<TitleIcon icon={ icon } />

							<strong>
								<RichText
									multiline={ false }
									value={ title }
									placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
									onChange={ ( value ) => setAttributes( { title: value } ) }
								/>
							</strong>
						</div>
					}

					<RichText
						className="smb-alert__body"
						multiline="p"
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { title, content, modifier, icon } = attributes;

		const classes = classnames(
			{
				'smb-alert': true,
				[ className ]: !! className,
				[ `smb-alert--${ modifier }` ]: !! modifier,
			}
		);

		return (
			<div className={ classes }>
				{ ! RichText.isEmpty( title ) &&
					<div className="smb-alert__title">
						<i className={ `fas fa-${ icon }` } />
						<strong>
							<RichText.Content value={ title } />
						</strong>
					</div>
				}

				<div className="smb-alert__body">
					<RichText.Content value={ content } />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
