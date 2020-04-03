'use strict';

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	BaseControl,
	RangeControl,
	ToggleControl,
	Popover,
} from '@wordpress/components';

import {
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';

import { toNumber } from '../../../../../src/js/helper/helper';
import Figure from '../../../../../src/js/component/figure';
import LinkControl from '../../../../../src/js/component/link-control';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		title,
		lede,
		url,
		target,
		blur,
		textColor,
		maskColor,
		maskOpacity,
		imageSize,
		imageID,
		imageURL,
		imageAlt,
	} = attributes;

	const classes = classnames( 'c-row__col', className );
	const bannerClasses = classnames(
		'smb-items__banner',
		`smb-items__banner--${ imageSize }`,
		{ 'smb-items__banner--blur': blur }
	);

	const styles = {
		color: textColor || undefined,
	};

	const imgStyles = {
		opacity: maskOpacity,
	};

	const maskStyles = {
		backgroundColor: maskColor || undefined,
	};

	const onSelectImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			imageURL: newImageURL,
			imageID: media.id,
			imageAlt: media.alt,
		} );
	};

	const onRemoveImage = () =>
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageID: 0,
		} );

	const onChangeImageSize = ( value ) =>
		setAttributes( {
			imageSize: value,
		} );

	const onChangeBlur = ( value ) =>
		setAttributes( {
			blur: value,
		} );

	const onChangeMaskOpacity = ( value ) =>
		setAttributes( {
			maskOpacity: toNumber( value, 0, 1 ),
		} );

	const onChangeMaskColor = ( value ) =>
		setAttributes( {
			maskColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
		} );

	const onChangeUrl = ( { url: newUrl, opensInNewTab } ) => {
		setAttributes( {
			url: newUrl,
			target: ! opensInNewTab ? '_self' : '_blank',
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Image', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/items--banner/image"
					>
						<Figure
							src={ imageURL }
							id={ imageID }
							alt={ imageAlt }
							onSelect={ onSelectImage }
							onRemove={ onRemoveImage }
							isSelected={ isSelected }
						/>
					</BaseControl>

					<SelectControl
						label={ __( 'Image Size', 'snow-monkey-blocks' ) }
						value={ imageSize }
						options={ [
							{
								value: 'default',
								label: __( 'Default', 'snow-monkey-blocks' ),
							},
							{
								value: 'standard',
								label: __( '4:3', 'snow-monkey-blocks' ),
							},
							{
								value: 'wide',
								label: __( '16:9', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeImageSize }
					/>

					<ToggleControl
						label={ __( 'Blur', 'snow-monkey-blocks' ) }
						checked={ blur }
						onChange={ onChangeBlur }
					/>

					<RangeControl
						label={ __( 'Mask Opacity', 'snow-monkey-blocks' ) }
						value={ maskOpacity }
						onChange={ onChangeMaskOpacity }
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
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
			</InspectorControls>

			<div className={ classes }>
				<div className={ bannerClasses } style={ styles }>
					<div className="smb-items__banner__figure">
						{ 1 > maskOpacity && (
							<div
								className="smb-items__banner__figure__mask"
								style={ maskStyles }
							/>
						) }
						{ !! imageID ? (
							<img
								src={ imageURL }
								alt={ imageAlt }
								className={ `wp-image-${ imageID }` }
								style={ imgStyles }
							/>
						) : (
							<div
								className="smb-items__banner__figure__dummy"
								style={ imgStyles }
							/>
						) }
					</div>

					{ ( ! RichText.isEmpty( title ) ||
						! RichText.isEmpty( lede ) ||
						isSelected ) && (
						<div className="smb-items__banner__body">
							{ ( ! RichText.isEmpty( title ) || isSelected ) && (
								<RichText
									className="smb-items__banner__title"
									placeholder={ __(
										'Write title...',
										'snow-monkey-blocks'
									) }
									value={ title }
									onChange={ onChangeTitle }
									keepPlaceholderOnFocus={ true }
								/>
							) }

							{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
								<RichText
									className="smb-items__banner__lede"
									placeholder={ __(
										'Write lede...',
										'snow-monkey-blocks'
									) }
									value={ lede }
									onChange={ onChangeLede }
									keepPlaceholderOnFocus={ true }
								/>
							) }
						</div>
					) }

					{ isSelected && (
						<Popover position="bottom center">
							<LinkControl
								url={ url }
								target={ target }
								onChange={ onChangeUrl }
							/>
						</Popover>
					) }
				</div>
			</div>
		</>
	);
}
