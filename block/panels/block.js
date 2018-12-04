'use strict';

import generateUpdatedAttribute from '../../src/js/helper/generate-updated-attribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { times, get } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText, MediaPlaceholder } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

const generateColClasses = ( sm, md, lg ) => {
	let colClasses = [];
	colClasses.push( 'c-row__col' );
	colClasses.push( `c-row__col--1-${ sm }` );
	colClasses.push( `c-row__col--md-1-${ md }` );
	colClasses.push( `c-row__col--lg-1-${ lg }` );
	colClasses = colClasses.join( ' ' );
	return colClasses;
};

registerBlockType( 'snow-monkey-blocks/panels', {
	title: __( 'Panels', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',
	attributes: {
		columns: {
			type: 'number',
			default: 2,
		},
		sm: {
			type: 'number',
			default: 1,
		},
		md: {
			type: 'number',
			default: 1,
		},
		lg: {
			type: 'number',
			default: 2,
		},
		imagePadding: {
			type: 'boolean',
			default: false,
		},
		items: {
			type: 'array',
			source: 'query',
			default: [],
			selector: '.smb-panels__item',
			query: {
				title: {
					source: 'html',
					selector: '.smb-panels__item__title',
				},
				summary: {
					source: 'html',
					selector: '.smb-panels__item__content',
				},
				linkLabel: {
					source: 'html',
					selector: '.smb-panels__item__link',
				},
				linkURL: {
					type: 'string',
					source: 'attribute',
					attribute: 'href',
					default: '',
				},
				linkTarget: {
					type: 'string',
					source: 'attribute',
					attribute: 'target',
					default: '_self',
				},
				imageID: {
					type: 'number',
					source: 'attribute',
					selector: '.smb-panels__item__figure > img',
					attribute: 'data-image-id',
					default: 0,
				},
				imageURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-panels__item__figure > img',
					attribute: 'src',
					default: '',
				},
			},
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { columns, sm, md, lg, imagePadding, items } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Columns Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Columns', 'snow-monkey-blocks' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min="1"
							max="24"
						/>

						<RangeControl
							label={ __( 'Columns per row (large window)', 'snow-monkey-blocks' ) }
							value={ lg }
							onChange={ ( value ) => setAttributes( { lg: value } ) }
							min="1"
							max="4"
						/>

						<RangeControl
							label={ __( 'Columns per row (Medium window)', 'snow-monkey-blocks' ) }
							value={ md }
							onChange={ ( value ) => setAttributes( { md: value } ) }
							min="1"
							max="4"
						/>

						<RangeControl
							label={ __( 'Columns per row (Small window)', 'snow-monkey-blocks' ) }
							value={ sm }
							onChange={ ( value ) => setAttributes( { sm: value } ) }
							min="1"
							max="4"
						/>

						<ToggleControl
							label={ __( 'Set padding around images', 'snow-monkey-blocks' ) }
							checked={ imagePadding }
							onChange={ ( value ) => setAttributes( { imagePadding: value } ) }
						/>
					</PanelBody>

					{ times( columns, ( index ) => {
						const linkURL = get( items, [ index, 'linkURL' ], '' );
						const linkTarget = get( items, [ index, 'linkTarget' ], '_self' );

						return (
							<PanelBody
								title={ sprintf( __( '(%d) Link Settings', 'snow-monkey-blocks' ), index + 1 ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'URL', 'snow-monkey-blocks' ) }
									value={ linkURL }
									onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'linkURL', value ) } ) }
								/>

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
									onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'linkTarget', value ) } ) }
								/>
							</PanelBody>
						);
					} ) }
				</InspectorControls>

				<div className={ `smb-panels smb-panels--sm-${ sm } smb-panels--md-${ md } smb-panels--lg-${ lg }` } data-image-padding={ imagePadding }>
					<div className="c-row c-row--margin c-row--fill">
						{ times( columns, ( index ) => {
							const itemTitle = get( items, [ index, 'title' ], '' );
							const summary = get( items, [ index, 'summary' ], '' );
							const linkLabel = get( items, [ index, 'linkLabel' ], '' );
							const linkURL = get( items, [ index, 'linkURL' ], '' );
							const linkTarget = get( items, [ index, 'linkTarget' ], '_self' );
							const imageID = get( items, [ index, 'imageID' ], 0 );
							const imageURL = get( items, [ index, 'imageURL' ], '' );

							const renderMedia = () => {
								if ( ! imageURL ) {
									return (
										<MediaPlaceholder
											icon="format-image"
											labels={ { title: __( 'Image' ) } }
											onSelect={ ( media ) => {
												const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
												let newItems = items;
												newItems = generateUpdatedAttribute( newItems, index, 'imageURL', newImageURL );
												newItems = generateUpdatedAttribute( newItems, index, 'imageID', media.id );
												setAttributes( { items: newItems } );
											} }
											accept="image/*"
											allowedTypes={ [ 'image' ] }
										/>
									);
								}

								return (
									<Fragment>
										<img src={ imageURL } alt="" />
										<button
											className="smb-remove-button"
											onClick={ () => {
												setAttributes( { items: generateUpdatedAttribute( items, index, 'imageURL', '' ) } );
												setAttributes( { items: generateUpdatedAttribute( items, index, 'imageID', 0 ) } );
											} }
										>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
									</Fragment>
								);
							};

							return (
								<div className={ generateColClasses( sm, md, lg ) }>
									<div
										className="smb-panels__item"
										href={ linkURL }
										target={ linkTarget }
									>
										{ ( !! imageID || isSelected ) &&
											<div className="smb-panels__item__figure">
												{ renderMedia() }
											</div>
										}

										<div className="smb-panels__item__body">
											{ ( ! RichText.isEmpty( itemTitle ) || isSelected ) &&
												<RichText
													className="smb-panels__item__title"
													placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
													value={ itemTitle }
													onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'title', value ) } ) }
												/>
											}

											{ ( ! RichText.isEmpty( summary ) || isSelected ) &&
												<RichText
													className="smb-panels__item__content"
													placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
													value={ summary }
													onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'summary', value ) } ) }
												/>
											}

											{ ( ! RichText.isEmpty( linkLabel ) || isSelected ) &&
												<div className="smb-panels__item__action">
													<RichText
														className="smb-panels__item__link"
														value={ linkLabel }
														placeholder={ __( 'Link', 'snow-monkey-blocks' ) }
														formattingControls={ [] }
														onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'linkLabel', value ) } ) }
													/>
												</div>
											}
										</div>
									</div>

									{ index + 1 === columns && isSelected &&
										<div className="smb-add-item-button-wrapper">
											{ columns > 1 &&
												<button className="smb-remove-item-button" onClick={ () => setAttributes( { columns: columns - 1 } ) }>
													<FontAwesomeIcon icon="minus-circle" />
												</button>
											}

											<button className="smb-add-item-button" onClick={ () => setAttributes( { columns: columns + 1 } ) }>
												<FontAwesomeIcon icon="plus-circle" />
											</button>
										</div>
									}
								</div>
							);
						} ) }
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { columns, sm, md, lg, imagePadding, items } = attributes;

		return (
			<div className={ `smb-panels smb-panels--sm-${ sm } smb-panels--md-${ md } smb-panels--lg-${ lg }` } data-image-padding={ imagePadding }>
				<div className="c-row c-row--margin c-row--fill">
					{ times( columns, ( index ) => {
						const itemTitle = get( items, [ index, 'title' ], '' );
						const summary = get( items, [ index, 'summary' ], '' );
						const linkLabel = get( items, [ index, 'linkLabel' ], '' );
						const linkURL = get( items, [ index, 'linkURL' ], '' );
						const linkTarget = get( items, [ index, 'linkTarget' ], '_self' );
						const imageID = get( items, [ index, 'imageID' ], 0 );
						const imageURL = get( items, [ index, 'imageURL' ], '' );

						const renderItem = ( itemContent ) => {
							if ( !! linkURL ) {
								return (
									<a
										className="smb-panels__item"
										href={ linkURL }
										target={ linkTarget }
									>
										{ itemContent }
									</a>
								);
							}

							return (
								<div
									className="smb-panels__item"
									href={ linkURL }
									target={ linkTarget }
								>
									{ itemContent }
								</div>
							);
						};

						return (
							<div className={ generateColClasses( sm, md, lg ) }>
								{
									renderItem(
										<Fragment>
											{ !! imageID &&
												<div className="smb-panels__item__figure">
													<img src={ imageURL } alt="" data-image-id={ imageID } />
												</div>
											}

											<div className="smb-panels__item__body">
												{ ! RichText.isEmpty( itemTitle ) &&
													<div className="smb-panels__item__title">
														<RichText.Content value={ itemTitle } />
													</div>
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
									)
								}
							</div>
						);
					} ) }
				</div>
			</div>
		);
	},

	deprecated: [
		{
			attributes: {
				columns: {
					type: 'number',
					default: 2,
				},
				sm: {
					type: 'number',
					default: 1,
				},
				md: {
					type: 'number',
					default: 1,
				},
				lg: {
					type: 'number',
					default: 2,
				},
				imagePadding: {
					type: 'boolean',
					default: false,
				},
				items: {
					type: 'array',
					source: 'query',
					default: [],
					selector: '.smb-panels__item',
					query: {
						title: {
							source: 'html',
							selector: '.smb-panels__item__title',
						},
						summary: {
							source: 'html',
							selector: '.smb-panels__item__content',
						},
						linkLabel: {
							source: 'html',
							selector: '.smb-panels__item__link',
						},
						linkURL: {
							type: 'string',
							source: 'attribute',
							attribute: 'href',
							default: '',
						},
						linkTarget: {
							type: 'string',
							source: 'attribute',
							attribute: 'target',
							default: '_self',
						},
						imageID: {
							type: 'number',
							source: 'attribute',
							selector: '.smb-panels__item__figure > img',
							attribute: 'data-image-id',
							default: 0,
						},
						imageURL: {
							type: 'string',
							source: 'attribute',
							selector: '.smb-panels__item__figure > img',
							attribute: 'src',
							default: '',
						},
					},
				},
			},

			save( { attributes } ) {
				const { columns, sm, md, lg, imagePadding, items } = attributes;

				return (
					<div className={ `smb-panels smb-panels--sm-${ sm } smb-panels--md-${ md } smb-panels--lg-${ lg }` } data-image-padding={ imagePadding }>
						<div className="c-row c-row--margin c-row--fill">
							{ times( columns, ( index ) => {
								const itemTitle = get( items, [ index, 'title' ], '' );
								const summary = get( items, [ index, 'summary' ], '' );
								const linkLabel = get( items, [ index, 'linkLabel' ], '' );
								const linkURL = get( items, [ index, 'linkURL' ], '' );
								const linkTarget = get( items, [ index, 'linkTarget' ], '_self' );
								const imageID = get( items, [ index, 'imageID' ], 0 );
								const imageURL = get( items, [ index, 'imageURL' ], '' );

								const renderItem = ( itemContent ) => {
									if ( !! linkURL ) {
										return (
											<a
												className="smb-panels__item"
												href={ linkURL }
												target={ linkTarget }
											>
												{ itemContent }
											</a>
										);
									}

									return (
										<div
											className="smb-panels__item"
											href={ linkURL }
											target={ linkTarget }
										>
											{ itemContent }
										</div>
									);
								};

								const _generateColClasses = () => {
									let colClasses = [];
									colClasses.push( 'c-row__col' );
									colClasses.push( `c-row__col--1-${ sm }` );
									if ( sm === md ) {
										colClasses.push( `c-row__col--1-${ md }` );
									}
									colClasses.push( `c-row__col--lg-1-${ lg }` );
									colClasses = colClasses.join( ' ' );
									return colClasses;
								};

								return (
									<div className={ _generateColClasses( sm, md, lg ) }>
										{
											renderItem(
												<Fragment>
													{ !! imageID &&
														<div className="smb-panels__item__figure">
															<img src={ imageURL } alt="" data-image-id={ imageID } />
														</div>
													}

													<div className="smb-panels__item__body">
														{ ! RichText.isEmpty( itemTitle ) &&
															<div className="smb-panels__item__title">
																<RichText.Content value={ itemTitle } />
															</div>
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
											)
										}
									</div>
								);
							} ) }
						</div>
					</div>
				);
			},
		},
	],
} );
