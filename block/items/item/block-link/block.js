'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { times } = lodash;
const { registerBlockType, createBlock } = wp.blocks;
const { InspectorControls, RichText, MediaPlaceholder, MediaUpload, PanelColorSettings, ContrastChecker, URLInput } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/items--item--block-link', {
	title: __( 'Items (Block Link)', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the items block.', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/items' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { titleTagName, title, lede, summary, btnLabel, url, target, btnBackgroundColor, btnTextColor, imageID, imageURL, imageALT } = attributes;

		const titleTagNames = [ 'div', 'h2', 'h3' ];

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id, imageALT: media.alt } );
		};

		const classes = classnames( 'c-row__col', className );

		const itemBtnLabelStyles = {
			color: btnTextColor || undefined,
		};

		const itemBtnStyles = {
			backgroundColor: btnBackgroundColor || undefined,
		};

		const ItemsItemFigureImg = () => {
			return ! imageURL ? (
				<MediaPlaceholder
					icon="format-image"
					labels={ { title: __( 'Image' ) } }
					onSelect={ onSelectImage }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
				/>
			) : (
				<Fragment>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ imageID }
						render={ ( obj ) => {
							return (
								<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
									<img src={ imageURL } alt={ imageALT } className={ `wp-image-${ imageID }` } />
								</Button>
							);
						} }
					/>
					{ isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => {
								setAttributes( { imageURL: '', imageALT: '', imageID: 0 } );
							} }
						>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
					}
				</Fragment>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Items Settings', 'snow-monkey-blocks' ) }>
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
					</PanelBody>

					<PanelBody title={ __( 'Button Settings', 'snow-monkey-blocks' ) }>
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
								value: btnBackgroundColor,
								onChange: ( value ) => setAttributes( { btnBackgroundColor: value } ),
								label: __( 'Background Color of Button', 'snow-monkey-blocks' ),
							},
							{
								value: btnTextColor,
								onChange: ( value ) => setAttributes( { btnTextColor: value } ),
								label: __( 'Text Color of Button', 'snow-monkey-blocks' ),
							},
						] }
					>
						<ContrastChecker
							backgroundColor={ btnBackgroundColor }
							textColor={ btnTextColor }
						/>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ classes }>
					<div className="smb-items__item">
						{ ( !! imageID || isSelected ) &&
							<div className="smb-items__item__figure">
								<ItemsItemFigureImg />
							</div>
						}

						<RichText
							tagName={ titleTagName }
							className="smb-items__item__title"
							placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>

						{ ( ! RichText.isEmpty( lede ) || isSelected ) &&
							<RichText
								className="smb-items__item__lede"
								placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
								value={ lede }
								onChange={ ( value ) => setAttributes( { lede: value } ) }
							/>
						}

						{ ( ! RichText.isEmpty( summary ) || isSelected ) &&
							<RichText
								className="smb-items__item__content"
								placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
								value={ summary }
								onChange={ ( value ) => setAttributes( { summary: value } ) }
							/>
						}

						{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) &&
							<div className="smb-items__item__action">
								<span className="smb-items__item__btn smb-btn" style={ itemBtnStyles }>
									<RichText
										className="smb-btn__label"
										style={ itemBtnLabelStyles }
										value={ btnLabel }
										placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
										formattingControls={ [] }
										onChange={ ( value ) => setAttributes( { btnLabel: value } ) }
									/>
								</span>
							</div>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { titleTagName, title, lede, summary, btnLabel, url, target, btnBackgroundColor, btnTextColor, imageID, imageURL, imageALT } = attributes;

		const classes = classnames( 'c-row__col', className );

		const itemBtnLabelStyles = {
			color: btnTextColor || undefined,
		};

		const itemBtnStyles = {
			backgroundColor: btnBackgroundColor || undefined,
		};

		return (
			<div className={ classes }>
				<a
					className="smb-items__item"
					href={ url }
					target={ '_self' === target ? undefined : target }
					rel={ '_self' === target ? undefined : 'noopener noreferrer' }
				>
					{ !! imageID &&
						<div className="smb-items__item__figure">
							<img src={ imageURL } alt={ imageALT } className={ `wp-image-${ imageID }` } />
						</div>
					}

					<RichText.Content
						tagName={ titleTagName }
						className="smb-items__item__title"
						value={ title }
					/>

					{ ! RichText.isEmpty( lede ) &&
						<div className="smb-items__item__lede">
							<RichText.Content value={ lede } />
						</div>
					}

					{ ! RichText.isEmpty( summary ) &&
						<div className="smb-items__item__content">
							<RichText.Content value={ summary } />
						</div>
					}

					{ ( ! RichText.isEmpty( btnLabel ) && !! url ) &&
						<div className="smb-items__item__action">
							<span className="smb-items__item__btn smb-btn" style={ itemBtnStyles }>
								<span className="smb-btn__label" style={ itemBtnLabelStyles }>
									<RichText.Content value={ btnLabel } />
								</span>
							</span>
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
		],
	},
} );
