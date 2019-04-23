'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { times } = lodash;
const { registerBlockType, createBlock } = wp.blocks;
const { InspectorControls, RichText, MediaPlaceholder, MediaUpload, PanelColorSettings, ContrastChecker, URLInput } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

/**
 * THIS BLOCK IS DEPRECATED.
 * It exists only for backward compatibility.
 *
 * @deprecated
 */
registerBlockType( 'snow-monkey-blocks/items--item', {
	title: __( 'Items', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#cd162c',
		src: 'screenoptions',
	},
	category: 'smb',
	parent: [ 'DEPRECATED' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { titleTagName, title, lede, summary, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL, imageAlt, isBlockLink } = attributes;

		const titleTagNames = [ 'div', 'h2', 'h3' ];

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
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
									<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
								</Button>
							);
						} }
					/>
					{ isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => {
								setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } );
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

						<ToggleControl
							label={ __( 'Block link', 'snow-monkey-blocks' ) }
							description={ __( 'Link is made not only to the button but to the whole block.', 'snow-monkey-blocks' ) }
							checked={ isBlockLink }
							onChange={ ( value ) => setAttributes( { isBlockLink: value } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Button Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) }>
							<URLInput
								value={ btnURL }
								onChange={ ( value ) => setAttributes( { btnURL: value } ) }
							/>
						</BaseControl>

						<SelectControl
							label={ __( 'Target', 'snow-monkey-blocks' ) }
							value={ btnTarget }
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
							onChange={ ( value ) => setAttributes( { btnTarget: value } ) }
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
								<span className="smb-items__item__btn smb-btn"
									href={ btnURL }
									style={ itemBtnStyles }
									target={ '_self' === btnTarget ? undefined : btnTarget }
									rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
								>
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
		const { titleTagName, title, lede, summary, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL, imageAlt, isBlockLink } = attributes;

		const classes = classnames( 'c-row__col', className );

		const itemBtnLabelStyles = {
			color: btnTextColor || undefined,
		};

		const itemBtnStyles = {
			backgroundColor: btnBackgroundColor || undefined,
		};

		const ItemsItemBtnContent = () => {
			return (
				<span className="smb-btn__label" style={ itemBtnLabelStyles }>
					<RichText.Content value={ btnLabel } />
				</span>
			);
		};

		const ItemsItemBtn = () => {
			return !! isBlockLink ? (
				<span className="smb-items__item__btn smb-btn"
					href={ btnURL }
					style={ itemBtnStyles }
					target={ '_self' === btnTarget ? undefined : btnTarget }
					rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
				>
					<ItemsItemBtnContent />
				</span>
			) : (
				<a className="smb-items__item__btn smb-btn"
					href={ btnURL }
					style={ itemBtnStyles }
					target={ '_self' === btnTarget ? undefined : btnTarget }
					rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
				>
					<ItemsItemBtnContent />
				</a>
			);
		};

		const ItemsItemContent = () => {
			return (
				<Fragment>
					{ !! imageID &&
						<div className="smb-items__item__figure">
							<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
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

					{ ( ! RichText.isEmpty( btnLabel ) && !! btnURL ) &&
						<div className="smb-items__item__action">
							<ItemsItemBtn />
						</div>
					}
				</Fragment>
			);
		};

		const ItemsItem = () => {
			return !! isBlockLink ? (
				<a
					className="smb-items__item"
					href={ btnURL }
					target={ '_self' === btnTarget ? undefined : btnTarget }
					rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
				>
					<ItemsItemContent />
				</a>
			) : (
				<div className="smb-items__item">
					<ItemsItemContent />
				</div>
			);
		};

		return (
			<div className={ classes }>
				<ItemsItem />
			</div>
		);
	},

	deprecated: deprecated,

	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'snow-monkey-blocks/items--item--standard' ],
				transform: ( attributes ) => {
					return createBlock( 'snow-monkey-blocks/items--item--standard', {
						...attributes,
						url: attributes.btnURL,
						target: attributes.btnTarget,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'snow-monkey-blocks/items--item--block-link' ],
				transform: ( attributes ) => {
					return createBlock( 'snow-monkey-blocks/items--item--block-link', {
						...attributes,
						url: attributes.btnURL,
						target: attributes.btnTarget,
					} );
				},
			},
		],
	},
} );
