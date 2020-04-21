'use strict';

import classnames from 'classnames';
import { times } from 'lodash';

import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	BaseControl,
	Button,
	ToggleControl,
	TextControl,
} from '@wordpress/components';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
} from '@wordpress/block-editor';

import { toNumber } from '../../../src/js/helper/helper';
import { getVideoId } from './utils';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		titleTagName,
		title,
		videoURL,
		videoWidth,
		videoHeight,
		height,
		contentsAlignment,
		maskColor,
		maskColor2,
		maskColorAngle,
		maskOpacity,
		textColor,
		isSlim,
	} = attributes;

	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		'smb-section-with-bgvideo',
		`smb-section-with-bgimage--${ contentsAlignment }`,
		`smb-section-with-bgimage--${ height }`,
		className
	);

	const bgvideoClasses = classnames( 'smb-section-with-bgimage__bgimage' );

	const containerClasses = classnames( 'c-container', {
		'u-slim-width': !! isSlim,
	} );

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

	const bgvideoStyles = {
		opacity: maskOpacity,
	};

	const onChangeVideoUrl = ( value ) =>
		setAttributes( {
			videoURL: value,
		} );

	const onChangeVideoWidth = ( value ) =>
		setAttributes( {
			videoWidth: toNumber( value, 1, 960 ),
		} );

	const onChangeVideoHeight = ( value ) =>
		setAttributes( {
			videoHeight: toNumber( value, 1, 960 ),
		} );

	const onChangeHeight = ( value ) =>
		setAttributes( {
			height: value,
		} );

	const onChangeContentsAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
		} );

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
		} );

	const onChangeMaskColor = ( value ) =>
		setAttributes( {
			maskColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeMaskOpacity = ( value ) =>
		setAttributes( {
			maskOpacity: toNumber( value, 0, 1 ),
		} );

	const onChangeMaskColor2 = ( value ) =>
		setAttributes( {
			maskColor2: value,
		} );

	const onChangeMaskColorAngle = ( value ) =>
		setAttributes( {
			maskColorAngle: toNumber( value, 0, 360 ),
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-with-bgvideo/title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								const onClickTitleTagName = () =>
									setAttributes( {
										titleTagName: titleTagNames[ index ],
									} );

								return (
									<Button
										isDefault
										isPrimary={
											titleTagName ===
											titleTagNames[ index ]
										}
										onClick={ onClickTitleTagName }
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<BaseControl
						label={ __( 'YouTube URL', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-with-bgvideo/video-url"
					>
						<TextControl
							value={ videoURL }
							onChange={ onChangeVideoUrl }
						/>
					</BaseControl>

					<RangeControl
						label={ __( 'Video width', 'snow-monkey-blocks' ) }
						value={ videoWidth }
						onChange={ onChangeVideoWidth }
						min="1"
						max="960"
					/>

					<RangeControl
						label={ __( 'Video height', 'snow-monkey-blocks' ) }
						value={ videoHeight }
						onChange={ onChangeVideoHeight }
						min="1"
						max="960"
					/>

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
						onChange={ onChangeHeight }
					/>

					<SelectControl
						label={ __(
							'Contents alignment',
							'snow-monkey-blocks'
						) }
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
						onChange={ onChangeContentsAlignment }
					/>

					<ToggleControl
						label={ __(
							'Make the content width slim',
							'snow-monkey-blocks'
						) }
						checked={ isSlim }
						onChange={ onChangeIsSlim }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: maskColor,
							onChange: onChangeMaskColor,
							label: __( 'Mask Color', 'snow-monkey-blocks' ),
						},
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>

				<PanelBody
					title={ __( 'Mask Settings', 'snow-monkey-blocks' ) }
				>
					<RangeControl
						label={ __( 'Mask Opacity', 'snow-monkey-blocks' ) }
						value={ maskOpacity }
						onChange={ onChangeMaskOpacity }
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>

					{ maskColor && (
						<BaseControl
							className="editor-color-palette-control"
							label={ __( 'Mask Color 2', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/section-with-bgvideo/mask-color2"
						>
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								value={ maskColor2 }
								onChange={ onChangeMaskColor2 }
							/>
						</BaseControl>
					) }

					{ maskColor && maskColor2 && (
						<RangeControl
							label={ __(
								'Mask Gradation Angle',
								'snow-monkey-blocks'
							) }
							value={ maskColorAngle }
							onChange={ onChangeMaskColorAngle }
							min="0"
							max="360"
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div className={ classes } style={ sectionStyles }>
				<div
					className="smb-section-with-bgimage__mask"
					style={ maskStyles }
				/>
				<div className={ bgvideoClasses } style={ bgvideoStyles }>
					{ videoURL && (
						<img
							src={ `https://i.ytimg.com/vi/${ getVideoId(
								videoURL
							) }/maxresdefault.jpg` }
							alt=""
						/>
					) }
				</div>
				<div className={ containerClasses }>
					{ ( ! RichText.isEmpty( title ) || isSelected ) &&
						'none' !== titleTagName && (
							<RichText
								className="smb-section__title"
								tagName={ titleTagName }
								value={ title }
								onChange={ onChangeTitle }
								allowedFormats={ [] }
								placeholder={ __(
									'Write title…',
									'snow-monkey-blocks'
								) }
							/>
						) }

					<div className="smb-section__body">
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);
}
