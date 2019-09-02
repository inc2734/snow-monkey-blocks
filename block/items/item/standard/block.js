'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../../../src/js/config/block';
import { schema } from './_schema';

import { Figure } from '../../../../src/js/component/figure';

const { times } = lodash;
const { registerBlockType, createBlock } = wp.blocks;
const { InspectorControls, RichText, PanelColorSettings, ContrastChecker, URLInput } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/items--item--standard', {
	title: __( 'Items (Standard)', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the items block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/items' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { titleTagName, title, lede, summary, btnLabel, url, target, btnBackgroundColor, btnTextColor, imageID, imageURL, imageAlt } = attributes;

		const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

		const classes = classnames( 'c-row__col', className );

		const itemBtnLabelStyles = {
			color: btnTextColor || undefined,
		};

		const itemBtnStyles = {
			backgroundColor: btnBackgroundColor || undefined,
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
							</div>
						}

						{ 'none' !== titleTagName &&
							<RichText
								tagName={ titleTagName }
								className="smb-items__item__title"
								placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
								keepPlaceholderOnFocus={ true }
							/>
						}

						{ ( ! RichText.isEmpty( lede ) || isSelected ) &&
							<RichText
								className="smb-items__item__lede"
								placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
								value={ lede }
								onChange={ ( value ) => setAttributes( { lede: value } ) }
								keepPlaceholderOnFocus={ true }
							/>
						}

						{ ( ! RichText.isEmpty( summary ) || isSelected ) &&
							<RichText
								className="smb-items__item__content"
								placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
								value={ summary }
								onChange={ ( value ) => setAttributes( { summary: value } ) }
								keepPlaceholderOnFocus={ true }
							/>
						}

						{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) &&
							<div className="smb-items__item__action">
								<span className="smb-items__item__btn smb-btn"
									href={ url }
									style={ itemBtnStyles }
									target={ '_self' === target ? undefined : target }
									rel={ '_self' === target ? undefined : 'noopener noreferrer' }
								>
									<RichText
										className="smb-btn__label"
										style={ itemBtnLabelStyles }
										value={ btnLabel }
										placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
										formattingControls={ [] }
										onChange={ ( value ) => setAttributes( { btnLabel: value } ) }
										keepPlaceholderOnFocus={ true }
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
		const { titleTagName, title, lede, summary, btnLabel, url, target, btnBackgroundColor, btnTextColor, imageID, imageURL, imageAlt } = attributes;

		const classes = classnames( 'c-row__col', className );

		const itemBtnLabelStyles = {
			color: btnTextColor || undefined,
		};

		const itemBtnStyles = {
			backgroundColor: btnBackgroundColor || undefined,
		};

		return (
			<div className={ classes }>
				<div className="smb-items__item">
					{ !! imageID &&
						<div className="smb-items__item__figure">
							<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
						</div>
					}

					{ 'none' !== titleTagName &&
						<RichText.Content
							tagName={ titleTagName }
							className="smb-items__item__title"
							value={ title }
						/>
					}

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
							<a className="smb-items__item__btn smb-btn"
								href={ url }
								style={ itemBtnStyles }
								target={ '_self' === target ? undefined : target }
								rel={ '_self' === target ? undefined : 'noopener noreferrer' }
							>
								<span className="smb-btn__label" style={ itemBtnLabelStyles }>
									<RichText.Content value={ btnLabel } />
								</span>
							</a>
						</div>
					}
				</div>
			</div>
		);
	},

	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'snow-monkey-blocks/items--item--block-link' ],
				transform: ( attributes ) => createBlock( 'snow-monkey-blocks/items--item--block-link', attributes ),
			},
		],
	},
} );
