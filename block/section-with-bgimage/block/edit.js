'use strict';

import classnames from 'classnames';
import { toNumber } from '../../../src/js/helper/helper';

import {
	times,
} from 'lodash';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
	ColorPalette,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	BaseControl,
	Button,
} from '@wordpress/components';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, isSelected, className } ) {
	const { wrapperTagName, titleTagName, title, imageID, imageURL, imageAlt, height, contentsAlignment, maskColor, maskColor2, maskColorAngle, maskOpacity, textColor, parallax, isSlim } = attributes;

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

	const Wrapper = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		`smb-section-with-bgimage--${ contentsAlignment }`,
		`smb-section-with-bgimage--${ height }`,
		className,
		{
			'js-bg-parallax': !! parallax,
		}
	);

	const bgimageClasses = classnames(
		'smb-section-with-bgimage__bgimage',
		{
			'js-bg-parallax__bgimage': !! parallax,
		}
	);

	const containerClasses = classnames(
		'c-container',
		{
			'u-slim-width': !! isSlim,
		}
	);

	const sectionStyles = {
		color: textColor || undefined,
	};

	const maskStyles = {};
	if ( maskColor ) {
		maskStyles.backgroundColor = maskColor;
		if ( maskColor2 ) {
			maskStyles.backgroundImage = `linear-gradient(${ maskColorAngle }deg, ${ maskColor } 0%, ${ maskColor2 } 100%)`;
		}
	}

	const bgimageStyles = {
		opacity: maskOpacity,
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<BaseControl label={ __( 'Title Tag', 'snow-monkey-blocks' ) } id="snow-monkey-blocks/section-with-bgimage/wrapper-tag-name">
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

					<BaseControl label={ __( 'Title Tag', 'snow-monkey-blocks' ) } id="snow-monkey-blocks/section-with-bgimage/title-tag-names">
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
						label={ __( 'Height', 'snow-monkey-blocks' ) }
						value={ height }
						options={ [
							{
								value: 'fit',
								label: __( 'Fit', 'snow-monkey-blocks' ),
							},
							{
								value: 'wide',
								label: __( 'Wide', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ ( value ) => setAttributes( { height: value } ) }
					/>

					<SelectControl
						label={ __( 'Contents alignment', 'snow-monkey-blocks' ) }
						value={ contentsAlignment }
						options={ [
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
							{
								value: 'center',
								label: __( 'Center', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ ( value ) => setAttributes( { contentsAlignment: value } ) }
					/>

					<ToggleControl
						label={ __( 'Parallax', 'snow-monkey-blocks' ) }
						checked={ parallax }
						onChange={ ( value ) => setAttributes( { parallax: value } ) }
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
							value: maskColor,
							onChange: ( value ) => setAttributes( { maskColor: value } ),
							label: __( 'Mask Color', 'snow-monkey-blocks' ),
						},
					] }
				>
				</PanelColorSettings>

				<PanelBody title={ __( 'Mask Settings', 'snow-monkey-blocks' ) }>
					<RangeControl
						label={ __( 'Mask Opacity', 'snow-monkey-blocks' ) }
						value={ maskOpacity }
						onChange={ ( value ) => setAttributes( { maskOpacity: toNumber( value, 0, 1 ) } ) }
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>

					{ maskColor &&
						<BaseControl
							className="editor-color-palette-control"
							label={ __( 'Mask Color 2', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/section-with-bgimage/mask-color2">
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								value={ maskColor2 }
								onChange={ ( value ) => setAttributes( { maskColor2: value } ) }
							/>
						</BaseControl>
					}

					{ maskColor && maskColor2 &&
						<RangeControl
							label={ __( 'Mask Gradation Angle', 'snow-monkey-blocks' ) }
							value={ maskColorAngle }
							onChange={ ( value ) => setAttributes( { maskColorAngle: toNumber( value, 0, 360 ) } ) }
							min="0"
							max="360"
						/>
					}
				</PanelBody>
			</InspectorControls>

			{ ! imageURL &&
				<MediaPlaceholder
					icon="format-image"
					labels={ { title: __( 'Image' ) } }
					onSelect={ ( media ) => {
						const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
						setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
					} }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
				/>
			}
			<Wrapper className={ classes } style={ sectionStyles }>
				{ !! imageURL && isSelected &&
					<button
						className="smb-remove-button"
						onClick={ () => {
							setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } );
						} }
					>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
				}
				<div className="smb-section-with-bgimage__mask" style={ maskStyles } />
				{ imageURL &&
					<div className={ bgimageClasses } style={ bgimageStyles }>
						<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
					</div>
				}
				<div className={ containerClasses }>
					{ ( ! RichText.isEmpty( title ) || isSelected ) && 'none' !== titleTagName &&
						<RichText
							className="smb-section__title"
							tagName={ titleTagName }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							allowedFormats={ [] }
							placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
						/>
					}

					<div className="smb-section__body">
						<InnerBlocks />
					</div>
				</div>
			</Wrapper>
		</Fragment>
	);
}
