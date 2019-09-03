'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../../../src/js/config/block';
import { schema } from './_schema';
import { deprecated } from './_deprecated';

import { Figure } from '../../../../src/js/component/figure';

const { times } = lodash;
const { registerBlockType, createBlock } = wp.blocks;
const { InspectorControls, RichText, URLInput } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/panels--item--horizontal', {
	title: __( 'Item (Horizontal)', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the panels block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/panels' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imagePosition, imageID, imageURL, imageAlt } = attributes;

		const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

		const classes = classnames( 'c-row__col', className );

		const itemClasses = classnames(
			'smb-panels__item',
			'smb-panels__item--horizontal',
			{
				'smb-panels__item--reverse': 'right' === imagePosition,
			}
		);

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
							label={ __( 'Image Position', 'snow-monkey-blocks' ) }
							value={ imagePosition }
							options={ [
								{
									value: 'right',
									label: __( 'Right side', 'snow-monkey-blocks' ),
								},
								{
									value: 'left',
									label: __( 'Left side', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Link Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) }>
							<URLInput
								value={ linkURL }
								onChange={ ( value ) => setAttributes( { linkURL: value } ) }
							/>
						</BaseControl>

						<SelectControl
							label={ __( 'Target', 'snow-monkey-blocks' ) }
							value={ linkTarget }
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
							onChange={ ( value ) => setAttributes( { linkTarget: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<div
						className={ itemClasses }
						href={ linkURL }
						target={ '_self' === linkTarget ? undefined : linkTarget }
						rel={ '_self' === linkTarget ? undefined : 'noopener noreferrer' }
					>
						{ ( !! imageID || isSelected ) &&
							<div className="smb-panels__item__figure">
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

						<div className="smb-panels__item__body">
							{ ( ! RichText.isEmpty( title ) || isSelected ) && 'none' !== titleTagName &&
								<RichText
									tagName={ titleTagName }
									className="smb-panels__item__title"
									placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
									value={ title }
									onChange={ ( value ) => setAttributes( { title: value } ) }
									keepPlaceholderOnFocus={ true }
								/>
							}

							{ ( ! RichText.isEmpty( summary ) || isSelected ) &&
								<RichText
									className="smb-panels__item__content"
									placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
									value={ summary }
									onChange={ ( value ) => setAttributes( { summary: value } ) }
									keepPlaceholderOnFocus={ true }
								/>
							}

							{ ( ! RichText.isEmpty( linkLabel ) || isSelected ) &&
								<div className="smb-panels__item__action">
									<RichText
										className="smb-panels__item__link"
										value={ linkLabel }
										placeholder={ __( 'Link', 'snow-monkey-blocks' ) }
										formattingControls={ [] }
										onChange={ ( value ) => setAttributes( { linkLabel: value } ) }
										keepPlaceholderOnFocus={ true }
									/>
								</div>
							}
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imagePosition, imageID, imageURL, imageAlt } = attributes;

		const PanelsItemContent = () => {
			return (
				<Fragment>
					{ !! imageID &&
						<div className="smb-panels__item__figure">
							<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
						</div>
					}

					<div className="smb-panels__item__body">
						{ ! RichText.isEmpty( title ) && 'none' !== titleTagName &&
							<RichText.Content
								tagName={ titleTagName }
								className="smb-panels__item__title"
								value={ title }
							/>
						}

						{ ! RichText.isEmpty( summary ) &&
							<div className="smb-panels__item__content">
								<RichText.Content value={ summary } />
							</div>
						}

						{ ! RichText.isEmpty( linkLabel ) &&
							<div className="smb-panels__item__action">
								<div className="smb-panels__item__link">
									<RichText.Content value={ linkLabel } />
								</div>
							</div>
						}
					</div>
				</Fragment>
			);
		};

		const classes = classnames( 'c-row__col', className );

		const itemClasses = classnames(
			'smb-panels__item',
			'smb-panels__item--horizontal',
			{
				'smb-panels__item--reverse': 'right' === imagePosition,
			}
		);

		const PanelsItem = () => {
			return !! linkURL ? (
				<a
					className={ itemClasses }
					href={ linkURL }
					target={ '_self' === linkTarget ? undefined : linkTarget }
					rel={ '_self' === linkTarget ? undefined : 'noopener noreferrer' }
				>
					<PanelsItemContent />
				</a>
			) : (
				<div className={ itemClasses }>
					<PanelsItemContent />
				</div>
			);
		};

		return (
			<div className={ classes }>
				<PanelsItem />
			</div>
		);
	},

	deprecated: deprecated,

	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'snow-monkey-blocks/panels--item' ],
				transform: ( attributes ) => {
					return createBlock( 'snow-monkey-blocks/panels--item', attributes );
				},
			},
		],
	},
} );
