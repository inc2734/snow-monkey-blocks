'use strict';

import classnames from 'classnames';
import toNumber from '../../src/js/helper/to-number';

import { blockConfig } from '../../src/js/config/block.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl, ToggleControl, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

let isUpdated = false;

registerBlockType( 'snow-monkey-blocks/evaluation-star', {
	title: __( 'Evaluation star', 'snow-monkey-blocks' ),
	description: __( 'Evaluate with star icons', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'star-half',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	snowMonkey: {
		screenshot: 'https://snow-monkey.2inc.org/wp-content/uploads/2019/04/screenshot-18.png',
	},

	edit( { attributes, setAttributes, className } ) {
		const { evaluationValue, iconColor, isDisplayNumeric, numericAlign, numericColor } = attributes;

		const EditEvaluationIcon = () => {
			const defaultOutputIcons = [];
			const updatedOutputIcons = [];
			const evaluationNumber = toNumber( evaluationValue, 0, 5 );
			const fillIconCount = Math.floor( evaluationNumber );
			const emptyIconCount = 5 - Math.ceil( evaluationNumber );
			const halfIconCount = ( fillIconCount + emptyIconCount ) === 5 ? 0 : 1;

			for ( let i = 0; i < fillIconCount; i++ ) {
				defaultOutputIcons.push( <FontAwesomeIcon icon={ [ 'fas', 'star' ] } /> );
				updatedOutputIcons.push( <i className="fas fa-star" /> );
			}

			if ( halfIconCount !== 0 ) {
				defaultOutputIcons.push( <FontAwesomeIcon icon={ [ 'fas', 'star-half-alt' ] } /> );
				updatedOutputIcons.push( <i className="fas fa-star-half-alt" /> );
			}

			for ( let j = 0; j < emptyIconCount; j++ ) {
				defaultOutputIcons.push( <FontAwesomeIcon icon={ [ 'far', 'star' ] } /> );
				updatedOutputIcons.push( <i className="far fa-star"></i> );
			}

			return (
				<Fragment>
					{ ! isUpdated ? (
						<span>{ updatedOutputIcons }</span>
					) : (
						<span>{ defaultOutputIcons }</span>
					) }
				</Fragment>
			);
		};

		const classes = classnames( 'smb-evaluation-star', className );

		const bodyClasses = classnames( 'smb-evaluation-star__numeric', [ `smb-evaluation-star__numeric--${ numericAlign }` ] );

		const evaluationStarBodyStyles = {
			color: numericColor || undefined,
			display: isDisplayNumeric ? 'inline' : 'none',
		};

		const evaluationStarIconStyles = {
			color: iconColor || undefined,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Evaluation Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Evaluation', 'snow-monkey-blocks' ) }
							help={ __( 'Five-grade evaluation', 'snow-monkey-blocks' ) }
							value={ evaluationValue }
							onChange={ ( value ) => {
								isUpdated = true;
								setAttributes( { evaluationValue: toNumber( value, 0, 5 ) } );
							} }
							min={ 0 }
							max={ 5 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Numeric Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show numeric', 'snow-monkey-blocks' ) }
							checked={ isDisplayNumeric }
							onChange={ ( value ) => setAttributes( { isDisplayNumeric: value } ) }
						/>

						<SelectControl
							label={ __( 'Numeric position', 'snow-monkey-blocks' ) }
							value={ numericAlign }
							onChange={ ( value ) => {
								isUpdated = true;
								setAttributes( { numericAlign: value } );
							} }
							options={ [
								{
									value: 'left',
									label: __( 'Position left', 'snow-monkey-blocks' ),
								},
								{
									value: 'right',
									label: __( 'Position right', 'snow-monkey-blocks' ),
								},
							] }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: numericColor,
								onChange: ( value ) => {
									isUpdated = true;
									setAttributes( { numericColor: value } );
								},
								label: __( 'Numeric color', 'snow-monkey-blocks' ),
							},
							{
								value: iconColor,
								onChange: ( value ) => {
									isUpdated = true;
									setAttributes( { iconColor: value } );
								},
								label: __( 'Icon color', 'snow-monkey-blocks' ),
							},
						] }
					>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ classes }>
					<div className="smb-evaluation-star__body">
						<span className={ bodyClasses } style={ evaluationStarBodyStyles }>
							{ sprintf( '%.1f', Number( evaluationValue ) ) }
						</span>
						<div className="smb-evaluation-star__icon" style={ evaluationStarIconStyles }>
							<EditEvaluationIcon />
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { evaluationValue, iconColor, isDisplayNumeric, numericAlign, numericColor } = attributes;

		const SaveEvaluationIcon = () => {
			const outputEvaluationIcons = [];
			const evaluationNumber = toNumber( evaluationValue, 0, 5 );
			const fillIconCount = Math.floor( evaluationNumber );
			const emptyIconCount = 5 - Math.ceil( evaluationNumber );
			const halfIconCount = ( fillIconCount + emptyIconCount ) === 5 ? 0 : 1;

			for ( let i = 0; i < fillIconCount; i++ ) {
				outputEvaluationIcons.push( <i className="fas fa-star" /> );
			}

			if ( halfIconCount !== 0 ) {
				outputEvaluationIcons.push( <i className="fas fa-star-half-alt" /> );
			}

			for (
				let j = 0; j < emptyIconCount; j++ ) {
				outputEvaluationIcons.push( <i className="far fa-star" /> );
			}

			return (
				<Fragment>
					{ outputEvaluationIcons }
				</Fragment>
			);
		};

		const classes = classnames( 'smb-evaluation-star', className );

		const bodyClasses = classnames( 'smb-evaluation-star__numeric', [ `smb-evaluation-star__numeric--${ numericAlign }` ] );

		const evaluationStarBodyStyles = {
			color: numericColor || undefined,
		};

		const evaluationStarIconStyles = {
			color: iconColor || undefined,
		};

		return (
			<div className={ classes }>
				<div className="smb-evaluation-star__body">
					{ isDisplayNumeric &&
						<span className={ bodyClasses } style={ evaluationStarBodyStyles }>
							{ sprintf( '%.1f', Number( evaluationValue ) ) }
						</span>
					}
					<div className="smb-evaluation-star__icon" style={ evaluationStarIconStyles }>
						<SaveEvaluationIcon />
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
