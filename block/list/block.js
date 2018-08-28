'use strict';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-awesome-custom-blocks/list', {
	title: __( 'List', 'snow-monkey-awesome-custom-blocks' ),
	description: __( 'Icons are displayed only on the actual screen.', 'snow-monkey-awesome-custom-blocks' ),
	icon: 'editor-ul',
	category: 'smacb',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'ul',
			default: [],
		},
		icon: {
			type: 'string',
			default: 'angle-right',
		},
		iconColor: {
			type: 'string',
			default: null,
		},
	},

	edit( { attributes, setAttributes } ) {
		const { content, icon, iconColor } = attributes;

		const generateContentWidthIcon = ( _content, _icon, _iconColor ) => {
			_content = [ ..._content ];

			for ( let i = 0; i < _content.length; i++ ) {
				if ( !! _content[ i ].props.children[ 1 ] ) {
					_content[ i ].props.children[ 0 ] = _content[ i ].props.children[ 1 ];
					delete _content[ i ].props.children[ 1 ];
				}

				_content[ i ].props.children[ 1 ] = _content[ i ].props.children[ 0 ];
				_content[ i ].props.children[ 0 ] = (
					<span className="smacb-list__icon" style={ { color: _iconColor } }>
						<i className={ `fas fa-${ _icon }` } />
					</span>
				);
			}

			return _content;
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'List Settings', 'snow-monkey-awesome-custom-blocks' ) }>
						<SelectControl
							label={ __( 'Icon', 'snow-monkey-awesome-custom-blocks' ) }
							value={ icon }
							onChange={ ( value ) => {
								setAttributes( { icon: value } );

								const _content = generateContentWidthIcon( content, value, iconColor );
								setAttributes( { content: _content } );
							} }
							options={ [
								{
									value: 'angle-right',
									label: __( 'angle-right', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'angle-double-right',
									label: __( 'angle-double-right', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'arrow-alt-circle-right',
									label: __( 'arrow-alt-circle-right', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'arrow-right',
									label: __( 'arrow-right', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'check',
									label: __( 'check', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'check-circle',
									label: __( 'check-circle', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'check-square',
									label: __( 'check-square', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'chevron-circle-right',
									label: __( 'chevron-circle-right', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'hand-point-right',
									label: __( 'hand-point-right', 'snow-monkey-awesome-custom-blocks' ),
								},
							] }
						/>

						<BaseControl label={ __( 'Icon Color', 'snow-monkey-awesome-custom-blocks' ) }>
							<ColorPalette
								value={ iconColor }
								onChange={ ( value ) => {
									setAttributes( { iconColor: value } );

									const _content = generateContentWidthIcon( content, icon, value );
									setAttributes( { content: _content } );
								} }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="smacb-list">
					<RichText
						tagName="ul"
						multiline="li"
						value={ content }
						onChange={ ( value ) => {
							const _content = generateContentWidthIcon( value, icon, iconColor );
							setAttributes( { content: _content } );
						} }
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { content } = attributes;

		return (
			<div className="smacb-list">
				<ul>
					{ content }
				</ul>
			</div>
		);
	},
} );
