'use strict';

import toNumber from '../../../../src/js/helper/to-number';
import classnames from 'classnames';

import { blockConfig } from '../../../../src/js/config/block';
import { schema } from './_schema';

import { Figure } from '../../../../src/js/component/figure';

const { registerBlockType, createBlock } = wp.blocks;
const { InspectorControls, RichText, PanelColorSettings, URLInput } = wp.editor;
const { PanelBody, SelectControl, BaseControl, RangeControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/items--banner', {
	title: __( 'Banner', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the items block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/items' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { title, lede, url, target, blur, textColor, maskColor, maskOpacity, imageSize, imageID, imageURL, imageAlt } = attributes;

		const classes = classnames( 'c-row__col', className );
		const bannerClasses = classnames(
			'smb-items__banner',
			`smb-items__banner--${ imageSize }`,
			{ 'smb-items__banner--blur': blur },
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

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Image', 'snow-monkey-blocks' ) }>
							<Figure
								url={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								selectHandler={ ( media ) => {
									const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
									setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
								} }
								removeHandler={ () => setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } ) }
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
							onChange={ ( value ) => setAttributes( { imageSize: value } ) }
						/>

						<ToggleControl
							label={ __( 'Blur', 'snow-monkey-blocks' ) }
							checked={ blur }
							onChange={ ( value ) => setAttributes( { blur: value } ) }
						/>

						<RangeControl
							label={ __( 'Mask Opacity', 'snow-monkey-blocks' ) }
							value={ maskOpacity }
							onChange={ ( value ) => setAttributes( { maskOpacity: toNumber( value, 0, 1 ) } ) }
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>

						<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) }>
							<URLInput
								value={ url }
								onChange={ ( value ) => setAttributes( { url: value } ) }
							/>
						</BaseControl>

						<SelectControl
							label={ __( 'Target', 'snow-monkey-blocks' ) }
							value={ target }
							options={ [
								{
									value: '_self',
									label: __( '_self', 'snow-monkey-blocks' ),
								},
								{
									value: '_blank',
									label: __( '_blank', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { target: value } ) }
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
				</InspectorControls>

				<div className={ classes }>
					<div className={ bannerClasses } style={ styles }>
						<div className="smb-items__banner__figure">
							{ 1 > maskOpacity &&
								<div className="smb-items__banner__figure__mask" style={ maskStyles } />
							}
							{ !! imageID ? (
								<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } style={ imgStyles } />
							) : (
								<div className="smb-items__banner__figure__dummy" style={ imgStyles } />
							) }
						</div>

						{ ( ! RichText.isEmpty( title ) || ! RichText.isEmpty( lede ) || isSelected ) &&
							<div className="smb-items__banner__body">
								{ ( ! RichText.isEmpty( title ) || isSelected ) &&
									<RichText
										className="smb-items__banner__title"
										placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
										value={ title }
										onChange={ ( value ) => setAttributes( { title: value } ) }
										keepPlaceholderOnFocus={ true }
									/>
								}

								{ ( ! RichText.isEmpty( lede ) || isSelected ) &&
									<RichText
										className="smb-items__banner__lede"
										placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
										value={ lede }
										onChange={ ( value ) => setAttributes( { lede: value } ) }
										keepPlaceholderOnFocus={ true }
									/>
								}
							</div>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { title, lede, url, target, blur, textColor, maskColor, maskOpacity, imageSize, imageID, imageURL, imageAlt } = attributes;

		const classes = classnames( 'c-row__col', className );
		const bannerClasses = classnames(
			'smb-items__banner',
			`smb-items__banner--${ imageSize }`,
			{ 'smb-items__banner--blur': blur },
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

		return (
			<div className={ classes }>
				<a
					className={ bannerClasses }
					href={ url }
					target={ '_self' === target ? undefined : target }
					rel={ '_self' === target ? undefined : 'noopener noreferrer' }
					style={ styles }
				>
					<div className="smb-items__banner__figure">
						{ 1 > maskOpacity &&
							<div className="smb-items__banner__figure__mask" style={ maskStyles } />
						}
						{ !! imageID ? (
							<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } style={ imgStyles } />
						) : (
							<div className="smb-items__banner__figure__dummy" style={ imgStyles } />
						) }
					</div>

					{ ( ! RichText.isEmpty( title ) || ! RichText.isEmpty( lede ) ) &&
						<div className="smb-items__banner__body">
							{ ! RichText.isEmpty( title ) &&
								<div className="smb-items__banner__title">
									<RichText.Content value={ title } />
								</div>
							}

							{ ! RichText.isEmpty( lede ) &&
								<div className="smb-items__banner__lede">
									<RichText.Content value={ lede } />
								</div>
							}
						</div>
					}
				</a>
			</div>
		);
	},

	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'snow-monkey-blocks/items--item--standard' ],
				transform: ( attributes ) => createBlock( 'snow-monkey-blocks/items--item--standard', attributes ),
			},
			{
				type: 'block',
				blocks: [ 'snow-monkey-blocks/items--item--block-link' ],
				transform: ( attributes ) => createBlock( 'snow-monkey-blocks/items--item--block-link', attributes ),
			},
		],
	},
} );
