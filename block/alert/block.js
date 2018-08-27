'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-awesome-custom-blocks/alert', {
	title: __( 'Alert', 'snow-monkey-awesome-custom-blocks' ),
	icon: 'warning',
	category: 'smacb',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: '.smacb-alert__title strong',
			default: [],
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.smacb-alert__body',
			default: [],
		},
		modifier: {
			type: 'string',
			default: '',
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { title, content, modifier } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Alert Settings', 'snow-monkey-awesome-custom-blocks' ) }>
						<SelectControl
							label={ __( 'Type', 'snow-monkey-awesome-custom-blocks' ) }
							value={ modifier }
							onChange={ ( value ) => setAttributes( { modifier: value } ) }
							options={ [
								{
									value: '',
									label: __( 'Normal alert', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'warning',
									label: __( 'Warning alert', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'success',
									label: __( 'Success alert', 'snow-monkey-awesome-custom-blocks' ),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames( 'smacb-alert', { [ `smacb-alert--${ modifier }` ]: !! modifier } ) }>
					{ ( 0 < title.length || isSelected ) &&
						<div className="smacb-alert__title">
							<i className="fas fa-exclamation-circle" />
							<strong>
								<RichText
									multiline={ false }
									value={ title }
									placeholder={ __( 'Write title…', 'snow-monkey-awesome-custom-blocks' ) }
									onChange={ ( value ) => setAttributes( { title: value } ) }
								/>
							</strong>
						</div>
					}

					<RichText
						className="smacb-alert__body"
						multiline="p"
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { title, content, modifier } = attributes;

		return (
			<div className={ classnames( 'smacb-alert', { [ `smacb-alert--${ modifier }` ]: !! modifier } ) }>
				{ 0 < title.length &&
					<div className="smacb-alert__title">
						<i className="fas fa-exclamation-circle" />
						<strong>
							{ title }
						</strong>
					</div>
				}

				<div className="smacb-alert__body">
					{ content }
				</div>
			</div>
		);
	},
} );
