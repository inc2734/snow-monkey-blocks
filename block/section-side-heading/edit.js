'use strict';

import classnames from 'classnames';
import { toNumber, getColumnSize, divider } from '../../src/js/helper/helper';

import {
	times,
} from 'lodash';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
} from '@wordpress/block-editor';

import {
	PanelBody,
	BaseControl,
	SelectControl,
	RangeControl,
	Button,
	ToggleControl,
} from '@wordpress/components';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, isSelected, className } ) {
	const { wrapperTagName, titleTagName, title, backgroundColor, backgroundColor2, backgroundColorAngle, textColor, headingColumnSize, isSlim, topDividerType, topDividerLevel, topDividerColor, bottomDividerType, bottomDividerLevel, bottomDividerColor } = attributes;

	const { textColumnWidth, imageColumnWidth } = getColumnSize( headingColumnSize );

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3' ];

	const Wrapper = wrapperTagName;

	const classes = classnames( 'smb-section', 'smb-section-side-heading', className );

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
		'c-container',
		{
			'u-slim-width': !! isSlim,
		}
	);

	const headingColClasses = classnames( 'c-row__col', 'c-row__col--1-1', `c-row__col--md-${ imageColumnWidth }` );

	const contentColClasses = classnames( 'c-row__col', 'c-row__col--1-1', `c-row__col--md-${ textColumnWidth }` );

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
					<BaseControl label={ __( 'Wrapper Tag', 'snow-monkey-blocks' ) } id="snow-monkey-blocks/section-side-heading/wrapper-tag-name">
						<div className="smb-list-icon-selector">
							{ times( wrapperTagNames.length, ( index ) => {
								return (
									<Button
										isDefault
										isPrimary={ wrapperTagName === wrapperTagNames[ index ] }
										onClick={ () => setAttributes( { wrapperTagName: wrapperTagNames[ index ] } ) }
									>
										{ wrapperTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<BaseControl label={ __( 'Title Tag', 'snow-monkey-blocks' ) } id="snow-monkey-blocks/section-side-heading/title-tag">
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
							label={ __( 'Background Color 2', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/section-side-heading/background-color2">
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
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-side-heading/top-divider-color">
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
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-side-heading/bottom-divider-color">
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ bottomDividerColor }
							onChange={ ( value ) => setAttributes( { bottomDividerColor: value } ) }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<Wrapper className={ classes } style={ sectionStyles }>
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
										allowedFormats={ [] }
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
			</Wrapper>
		</Fragment>
	);
}
