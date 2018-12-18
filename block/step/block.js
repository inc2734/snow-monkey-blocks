'use strict';

import toNumber from '../../src/js/helper/to-number';
import generateUpdatedAttribute from '../../src/js/helper/generate-updated-attribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deprecated } from './_deprecated.js';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette, MediaPlaceholder } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/step', {
	title: __( 'Step', 'snow-monkey-blocks' ),
	icon: 'editor-ol',
	category: 'smb',
	attributes: {
		content: {
			type: 'array',
			source: 'query',
			selector: '.smb-step__item',
			default: [],
			query: {
				title: {
					source: 'html',
					selector: '.smb-step__item__title > span',
				},
				summary: {
					source: 'html',
					selector: '.smb-step__item__summary',
				},
				numberColor: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-step__item__number',
					attribute: 'data-number-color',
				},
				imagePosition: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-image-position',
					default: 'center',
				},
				imageID: {
					type: 'number',
					source: 'attribute',
					selector: '.smb-step__item__figure > img',
					attribute: 'data-image-id',
					default: 0,
				},
				imageURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-step__item__figure > img',
					attribute: 'src',
					default: '',
				},
				linkLabel: {
					source: 'html',
					selector: '.smb-step__item__link__label',
				},
				linkURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-step__item__link',
					attribute: 'href',
					default: '',
				},
				linkTarget: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-step__item__link',
					attribute: 'target',
					default: '_self',
				},
				linkColor: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-step__item__link',
					attribute: 'data-color',
				},
			},
		},
		rows: {
			type: 'number',
			default: 1,
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { rows, content } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Step Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Rows', 'snow-monkey-blocks' ) }
							value={ rows }
							onChange={ ( value ) => setAttributes( { rows: toNumber( value, 1, 50 ) } ) }
							min="1"
							max="50"
						/>
					</PanelBody>

					{ times( rows, ( index ) => {
						const numberColor = get( content, [ index, 'numberColor' ], null );
						const imagePosition = get( content, [ index, 'imagePosition' ], 'center' );
						const linkURL = get( content, [ index, 'linkURL' ], '' );
						const linkTarget = get( content, [ index, 'linkTarget' ], '_self' );
						const linkColor = get( content, [ index, 'linkColor' ], '' );

						return (
							<PanelBody
								title={ sprintf( __( 'STEP.%d Settings', 'snow-monkey-blocks' ), index + 1 ) }
								initialOpen={ false }
							>
								<SelectControl
									label={ __( 'Image Position', 'snow-monkey-blocks' ) }
									value={ imagePosition }
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
									onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'imagePosition', value ) } ) }
								/>

								<BaseControl label={ __( 'Number Color', 'snow-monkey-blocks' ) }>
									<ColorPalette
										value={ numberColor }
										onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'numberColor', value ) } ) }
									/>
								</BaseControl>

								<TextControl
									label={ __( 'Link URL', 'snow-monkey-blocks' ) }
									value={ linkURL }
									onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'linkURL', value ) } ) }
								/>

								<SelectControl
									label={ __( 'Link Target', 'snow-monkey-blocks' ) }
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
									onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'linkTarget', value ) } ) }
								/>

								<BaseControl label={ __( 'Link Color', 'snow-monkey-blocks' ) }>
									<ColorPalette
										value={ linkColor }
										onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'linkColor', value ) } ) }
									/>
								</BaseControl>
							</PanelBody>
						);
					} ) }
				</InspectorControls>

				<div className="smb-step">
					<div className="smb-step__body">
						{ times( rows, ( index ) => {
							const title = get( content, [ index, 'title' ], '' );
							const summary = get( content, [ index, 'summary' ], '' );
							const numberColor = get( content, [ index, 'numberColor' ], null );
							const imagePosition = get( content, [ index, 'imagePosition' ], 'center' );
							const imageID = get( content, [ index, 'imageID' ], 0 );
							const imageURL = get( content, [ index, 'imageURL' ], '' );
							const linkURL = get( content, [ index, 'linkURL' ], '' );
							const linkTarget = get( content, [ index, 'linkTarget' ], '_self' );
							const linkLabel = get( content, [ index, 'linkLabel' ], '' );
							const linkColor = get( content, [ index, 'linkColor' ], '' );

							const renderMedia = () => {
								if ( ! imageURL ) {
									return (
										<MediaPlaceholder
											icon="format-image"
											labels={ { title: __( 'Image' ) } }
											onSelect={ ( media ) => {
												const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
												let newContent = content;
												newContent = generateUpdatedAttribute( newContent, index, 'imageURL', newImageURL );
												newContent = generateUpdatedAttribute( newContent, index, 'imageID', media.id );
												setAttributes( { content: newContent } );
											} }
											accept="image/*"
											allowedTypes={ [ 'image' ] }
										/>
									);
								}

								return (
									<Fragment>
										<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
										<button
											className="smb-remove-button"
											onClick={ () => {
												setAttributes( { content: generateUpdatedAttribute( content, index, 'imageURL', '' ) } );
												setAttributes( { content: generateUpdatedAttribute( content, index, 'imageID', 0 ) } );
											} }
										>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
									</Fragment>
								);
							};

							return (
								<div className={ `smb-step__item smb-step__item--image-${ imagePosition }` } data-image-position={ imagePosition }>
									<div className="smb-step__item__title">
										<div className="smb-step__item__number" data-number-color={ numberColor } style={ { backgroundColor: numberColor } }>
											{ index + 1 }
										</div>
										<span>
											<RichText
												placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
												value={ title }
												formattingControls={ [] }
												multiline={ false }
												onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'title', value ) } ) }
											/>
										</span>
									</div>

									{ ( !! imageID || isSelected ) &&
										<div className="smb-step__item__figure">
											{ renderMedia() }
										</div>
									}

									<div className="smb-step__item__body">
										<RichText
											className="smb-step__item__summary"
											placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
											value={ summary }
											multiline="p"
											onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'summary', value ) } ) }
										/>

										{ ( ! RichText.isEmpty( linkLabel ) || isSelected ) &&
											<span
												className="smb-step__item__link"
												href={ linkURL }
												target={ linkTarget }
												data-color={ linkColor }
												style={ { color: linkColor } }
											>
												<i className="fas fa-arrow-circle-right" />
												<RichText
													className="smb-step__item__link__label"
													placeholder={ __( 'Link text', 'snow-monkey-blocks' ) }
													value={ linkLabel }
													formattingControls={ [] }
													multiline={ false }
													onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'linkLabel', value ) } ) }
												/>
											</span>
										}
									</div>
								</div>
							);
						} ) }
					</div>

					{ isSelected &&
						<div className="smb-add-item-button-wrapper">
							{ rows > 1 &&
								<button className="smb-remove-item-button" onClick={ () => setAttributes( { rows: rows - 1 } ) }>
									<FontAwesomeIcon icon="minus-circle" />
								</button>
							}

							<button className="smb-add-item-button" onClick={ () => setAttributes( { rows: rows + 1 } ) }>
								<FontAwesomeIcon icon="plus-circle" />
							</button>
						</div>
					}
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { rows, content } = attributes;

		return (
			<div className="smb-step">
				<div className="smb-step__body">
					{ times( rows, ( index ) => {
						const title = get( content, [ index, 'title' ], '' );
						const summary = get( content, [ index, 'summary' ], '' );
						const numberColor = get( content, [ index, 'numberColor' ], null );
						const imagePosition = get( content, [ index, 'imagePosition' ], 'left' );
						const imageID = get( content, [ index, 'imageID' ], 0 );
						const imageURL = get( content, [ index, 'imageURL' ], '' );
						const linkURL = get( content, [ index, 'linkURL' ], '' );
						const linkTarget = get( content, [ index, 'linkTarget' ], '_self' );
						const linkLabel = get( content, [ index, 'linkLabel' ], '' );
						const linkColor = get( content, [ index, 'linkColor' ], '' );

						return (
							<div className={ `smb-step__item smb-step__item--image-${ imagePosition }` } data-image-position={ imagePosition }>
								<div className="smb-step__item__title">
									<div className="smb-step__item__number" data-number-color={ numberColor } style={ { backgroundColor: numberColor } }>
										{ index + 1 }
									</div>
									<span>
										<RichText.Content value={ title } />
									</span>
								</div>

								{ !! imageID &&
									<div className="smb-step__item__figure">
										<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } data-image-id={ imageID } />
									</div>
								}

								<div className="smb-step__item__body">
									<div className="smb-step__item__summary">
										<RichText.Content value={ summary } />
									</div>

									{ ! RichText.isEmpty( linkLabel ) &&
										<a
											className="smb-step__item__link"
											href={ linkURL }
											target={ linkTarget }
											data-color={ linkColor }
											style={ { color: linkColor } }
										>
											<i className="fas fa-arrow-circle-right" />
											<span className="smb-step__item__link__label">
												<RichText.Content value={ linkLabel } />
											</span>
										</a>
									}
								</div>
							</div>
						);
					} ) }
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
