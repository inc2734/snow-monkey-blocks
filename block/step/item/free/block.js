'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../../../src/js/config/block';
import { schema } from './_schema';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings, InnerBlocks } = wp.editor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/step--item--free', {
	title: __( 'Item (Free input)', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the step block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ol',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/step' ],
	attributes: schema,

	edit( { attributes, setAttributes, className } ) {
		const { title, numberColor } = attributes;

		const classes = classnames(
			'smb-step__item',
			className
		);

		const itemNumberStyles = {
			backgroundColor: numberColor || undefined,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: numberColor,
								onChange: ( value ) => setAttributes( { numberColor: value } ),
								label: __( 'Number Color', 'snow-monkey-blocks' ),
							},
						] }
					>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ classes }>
					<div className="smb-step__item__title">
						<div className="smb-step__item__number" style={ itemNumberStyles } />
						<span>
							<RichText
								placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
								value={ title }
								formattingControls={ [] }
								multiline={ false }
								onChange={ ( value ) => setAttributes( { title: value } ) }
							/>
						</span>
					</div>

					<div className="smb-step__item__body">
						<div className="smb-step__item__summary">
							<InnerBlocks />
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { title, numberColor } = attributes;

		const classes = classnames(
			'smb-step__item',
			className
		);

		const itemNumberStyles = {
			backgroundColor: numberColor || undefined,
		};

		return (
			<div className={ classes }>
				<div className="smb-step__item__title">
					<div className="smb-step__item__number" style={ itemNumberStyles } />
					<span>
						<RichText.Content value={ title } />
					</span>
				</div>

				<div className="smb-step__item__body">
					<div className="smb-step__item__summary">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
