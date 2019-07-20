'use strict';

import toNumber from '../../src/js/helper/to-number';
import classnames from 'classnames';
import divider from '../../src/js/helper/divider';
import getColumnSize from '../../src/js/helper/get-column-size';

import { blockConfig } from '../../src/js/config/block.js';
import { schema } from './_schema.js';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, PanelColorSettings, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, SelectControl, RangeControl, Button, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/section-side-heading', {
	title: __( 'Section (Side heading)', 'snow-monkey-blocks' ),
	description: __( 'Contents can be separated by appropriate margins.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'text',
	},
	category: blockConfig.blockCategories.section,
	attributes: schema,
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
	},
	snowMonkeyBlocks: {
		isPro: true,
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/section.png`,
	},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { titleTagName, title, backgroundColor, backgroundColor2, backgroundColorAngle, textColor, headingColumnSize, isSlim, topDividerType, topDividerLevel, topDividerColor, bottomDividerType, bottomDividerLevel, bottomDividerColor } = attributes;

		const { textColumnWidth, imageColumnWidth } = getColumnSize( headingColumnSize );

		const titleTagNames = [ 'h2', 'h3' ];

		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-side-heading': true,
			}
		);

		const topDividerClasses = classnames(
			'smb-section__divider',
			'smb-section__divider--top',
			`smb-section__divider--${ topDividerType }`
		);

		const bottomDividerClasses = classnames(
			'smb-section__divider',
			'smb-section__divider--bottom',
			`smb-section__divider--${ bottomDividerType }`
		);

		const containerClasses = classnames(
			{
				'c-container': true,
				'u-slim-width': !! isSlim,
			}
		);

		const headingColClasses = classnames(
			{
				'c-row__col': true,
				'c-row__col--1-1': true,
				[ `c-row__col--md-${ imageColumnWidth }` ]: true,
			}
		);

		const contentColClasses = classnames(
			{
				'c-row__col': true,
				'c-row__col--1-1': true,
				[ `c-row__col--md-${ textColumnWidth }` ]: true,
			}
		);

		const sectionStyles = {};
		if ( textColor ) {
			sectionStyles.color = textColor;
		}
		if ( backgroundColor ) {
			sectionStyles.backgroundColor = backgroundColor;
			if ( backgroundColor2 ) {
				sectionStyles.backgroundImage = `linear-gradient(${ backgroundColorAngle }deg, ${ backgroundColor } 0%, ${ backgroundColor2 } 100%)`;
			}
		}

		const innerStyles = {
			paddingTop: topDividerLevel,
			paddingBottom: bottomDividerLevel,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Title Tag', 'snow-monkey-blocks' ) }>
							<div className="smb-list-icon-selector">
								{ times( titleTagNames.length, ( index ) => {
									return (
										<Button
											isDefault
											isPrimary={ titleTagName === titleTagNames[ index ] }
											onClick={ () => setAttributes( { titleTagName: titleTagNames[ index ] } ) }
										>
											{ titleTagNames[ index ] }
										</Button>
									);
								} ) }
							</div>
						</BaseControl>

						<SelectControl
							label={ __( 'Heading column size', 'snow-monkey-blocks' ) }
							value={ headingColumnSize }
							onChange={ ( value ) => setAttributes( { headingColumnSize: value } ) }
							options={ [
								{
									value: 50,
									label: __( '50%', 'snow-monkey-blocks' ),
								},
								{
									value: 33,
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: 25,
									label: __( '25%', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<ToggleControl
							label={ __( 'Make the content width slim', 'snow-monkey-blocks' ) }
							checked={ isSlim }
							onChange={ ( value ) => setAttributes( { isSlim: value } ) }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: textColor,
								onChange: ( value ) => setAttributes( { textColor: value } ),
								label: __( 'Text Color', 'snow-monkey-blocks' ),
							},
							{
								value: backgroundColor,
								onChange: ( value ) => setAttributes( { backgroundColor: value } ),
								label: __( 'Background Color', 'snow-monkey-blocks' ),
							},
						] }
					>
					</PanelColorSettings>

					{ backgroundColor &&
						<PanelBody title={ __( 'Background Gradation Settings', 'snow-monkey-blocks' ) }>
							<BaseControl
								className="editor-color-palette-control"
								label={ __( 'Background Color 2', 'snow-monkey-blocks' ) }>
								<ColorPalette
									className="editor-color-palette-control__color-palette"
									value={ backgroundColor2 }
									onChange={ ( value ) => setAttributes( { backgroundColor2: value } ) }
								/>
							</BaseControl>

							{ backgroundColor2 &&
								<RangeControl
									label={ __( 'Background Gradation Angle', 'snow-monkey-blocks' ) }
									value={ backgroundColorAngle }
									onChange={ ( value ) => setAttributes( { backgroundColorAngle: toNumber( value, 0, 360 ) } ) }
									min="0"
									max="360"
								/>
							}
						</PanelBody>
					}

					<PanelBody title={ __( 'Top divider Settings', 'snow-monkey-blocks' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ topDividerType }
							onChange={ ( value ) => setAttributes( { topDividerType: value } ) }
							options={ [
								{
									value: 'tilt',
									label: __( 'Tilt', 'snow-monkey-blocks' ),
								},
								{
									value: 'curve',
									label: __( 'Curve', 'snow-monkey-blocks' ),
								},
								{
									value: 'wave',
									label: __( 'Wave', 'snow-monkey-blocks' ),
								},
								{
									value: 'triangle',
									label: __( 'Triangle', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							value={ topDividerLevel }
							onChange={ ( value ) => setAttributes( { topDividerLevel: toNumber( value, 0, 100 ) } ) }
							min="0"
							max="100"
						/>

						<BaseControl
							className="editor-color-palette-control"
							label={ __( 'Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								value={ topDividerColor }
								onChange={ ( value ) => setAttributes( { topDividerColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>

					<PanelBody title={ __( 'Bottom divider Settings', 'snow-monkey-blocks' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ bottomDividerType }
							onChange={ ( value ) => setAttributes( { bottomDividerType: value } ) }
							options={ [
								{
									value: 'tilt',
									label: __( 'Tilt', 'snow-monkey-blocks' ),
								},
								{
									value: 'curve',
									label: __( 'Curve', 'snow-monkey-blocks' ),
								},
								{
									value: 'wave',
									label: __( 'Wave', 'snow-monkey-blocks' ),
								},
								{
									value: 'triangle',
									label: __( 'Triangle', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							value={ bottomDividerLevel }
							onChange={ ( value ) => setAttributes( { bottomDividerLevel: toNumber( value, 0, 100 ) } ) }
							min="0"
							max="100"
						/>

						<BaseControl
							className="editor-color-palette-control"
							label={ __( 'Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								value={ bottomDividerColor }
								onChange={ ( value ) => setAttributes( { bottomDividerColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className={ classes } style={ sectionStyles }>
					{ !! topDividerLevel &&
						<div className={ topDividerClasses }>
							{ divider( topDividerType, topDividerLevel, topDividerColor ) }
						</div>
					}

					{ !! bottomDividerLevel &&
						<div className={ bottomDividerClasses }>
							{ divider( bottomDividerType, bottomDividerLevel, bottomDividerColor ) }
						</div>
					}

					<div className="smb-section__inner" style={ innerStyles }>
						<div className={ containerClasses }>
							<div className="c-row c-row--md-margin">
								<div className={ headingColClasses }>
									{ ( ! RichText.isEmpty( title ) || isSelected ) &&
										<RichText
											className="smb-section__title"
											tagName={ titleTagName }
											value={ title }
											onChange={ ( value ) => setAttributes( { title: value } ) }
											formattingControls={ [] }
											placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
										/>
									}
								</div>
								<div className={ contentColClasses }>
									<div className="smb-section__body">
										<InnerBlocks />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { titleTagName, title, backgroundColor, backgroundColor2, backgroundColorAngle, textColor, headingColumnSize, isSlim, topDividerType, topDividerLevel, topDividerColor, bottomDividerType, bottomDividerLevel, bottomDividerColor } = attributes;

		const { textColumnWidth, imageColumnWidth } = getColumnSize( headingColumnSize );

		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-side-heading': true,
			}
		);

		const topDividerClasses = classnames(
			'smb-section__divider',
			'smb-section__divider--top',
			`smb-section__divider--${ topDividerType }`
		);

		const bottomDividerClasses = classnames(
			'smb-section__divider',
			'smb-section__divider--bottom',
			`smb-section__divider--${ bottomDividerType }`
		);

		const containerClasses = classnames(
			{
				'c-container': true,
				'u-slim-width': !! isSlim,
			}
		);

		const headingColClasses = classnames(
			{
				'c-row__col': true,
				'c-row__col--1-1': true,
				[ `c-row__col--md-${ imageColumnWidth }` ]: true,
			}
		);

		const contentColClasses = classnames(
			{
				'c-row__col': true,
				'c-row__col--1-1': true,
				[ `c-row__col--md-${ textColumnWidth }` ]: true,
			}
		);

		const sectionStyles = {};
		if ( textColor ) {
			sectionStyles.color = textColor;
		}
		if ( backgroundColor ) {
			sectionStyles.backgroundColor = backgroundColor;
			if ( backgroundColor2 ) {
				sectionStyles.backgroundImage = `linear-gradient(${ backgroundColorAngle }deg, ${ backgroundColor } 0%, ${ backgroundColor2 } 100%)`;
			}
		}

		const innerStyles = {
			paddingTop: topDividerLevel,
			paddingBottom: bottomDividerLevel,
		};

		return (
			<div className={ classes } style={ sectionStyles }>
				{ !! topDividerLevel &&
					<div className={ topDividerClasses }>
						{ divider( topDividerType, topDividerLevel, topDividerColor ) }
					</div>
				}

				{ !! bottomDividerLevel &&
					<div className={ bottomDividerClasses }>
						{ divider( bottomDividerType, bottomDividerLevel, bottomDividerColor ) }
					</div>
				}

				<div className="smb-section__inner" style={ innerStyles }>
					<div className={ containerClasses }>
						<div className="c-row c-row--md-margin">
							<div className={ headingColClasses }>
								{ ! RichText.isEmpty( title ) &&
									<RichText.Content
										tagName={ titleTagName }
										className="smb-section__title"
										value={ title }
									/>
								}
							</div>
							<div className={ contentColClasses }>
								<div className="smb-section__body">
									<InnerBlocks.Content />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
