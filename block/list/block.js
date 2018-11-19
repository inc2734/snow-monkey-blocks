'use strict';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/list', {
	title: __( 'Icon list', 'snow-monkey-blocks' ),
	description: __( 'Icons are displayed only on the actual screen.', 'snow-monkey-blocks' ),
	icon: 'editor-ul',
	category: 'smb',
	attributes: {
		content: {
			source: 'html',
			selector: 'ul',
		},
		icon: {
			type: 'string',
			default: 'angle-right',
		},
		iconColor: {
			type: 'string',
		},
	},

	edit( { attributes, setAttributes } ) {
		const { content, icon, iconColor } = attributes;

		const iconList = [
			{
				value: 'angle-right',
				label: __( 'angle-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'angle-double-right',
				label: __( 'angle-double-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'arrow-alt-circle-right',
				label: __( 'arrow-alt-circle-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'arrow-right',
				label: __( 'arrow-right', 'snow-monkey-blocks' ),
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
				value: 'chevron-circle-right',
				label: __( 'chevron-circle-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'hand-point-right',
				label: __( 'hand-point-right', 'snow-monkey-blocks' ),
			},
		];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'List Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Icon', 'snow-monkey-blocks' ) }>
							<div className="smb-list-icon-selector">
								{ times( iconList.length, ( index ) => {
									const value = iconList[ index ].value;

									return (
										<Button
											isDefault
											isPrimary={ icon === value }
											onClick={ () => setAttributes( { icon: value } ) }
										>
											<i className={ `fas fa-${ iconList[ index ].value }` } title={ iconList[ index ].label } />
										</Button>
									);
								} ) }
							</div>
						</BaseControl>

						<BaseControl label={ __( 'Icon Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ iconColor }
								onChange={ ( value ) => setAttributes( { iconColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="smb-list" data-icon={ icon } data-icon-color={ iconColor }>
					<RichText
						tagName="ul"
						multiline="li"
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { content, icon, iconColor } = attributes;

		return (
			<div className="smb-list" data-icon={ icon } data-icon-color={ iconColor }>
				<ul>
					<RichText.Content value={ content } />
				</ul>
			</div>
		);
	},
} );
