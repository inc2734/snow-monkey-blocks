'use strict';

const { times, get } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText, MediaUpload, ColorPalette } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl, Button, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/section-has-items', {
	title: __( 'Section (has items)', 'snow-monkey-blocks' ),
	icon: 'text',
	category: 'smb-section',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: '.smb-section__title',
			default: [],
		},
		columns: {
			type: 'number',
			default: 1,
		},
		lg: {
			type: 'number',
			default: 2,
		},
		backgroundColor: {
			type: 'string',
		},
		items: {
			type: 'array',
			source: 'query',
			default: [],
			selector: '.smb-section-has-items__item',
			query: {
				title: {
					type: 'array',
					source: 'children',
					selector: '.smb-section-has-items__item__title',
					default: [],
				},
				lede: {
					type: 'array',
					source: 'children',
					selector: '.smb-section-has-items__item__lede',
					default: [],
				},
				summary: {
					type: 'array',
					source: 'children',
					selector: '.smb-section-has-items__item__content',
					default: [],
				},
				btnLabel: {
					type: 'array',
					source: 'children',
					selector: '.smb-section-has-items__item__btn > .smb-btn__label',
					default: [],
				},
				btnURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-section-has-items__item__btn',
					attribute: 'href',
					default: '',
				},
				btnTarget: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-section-has-items__item__btn',
					attribute: 'target',
					default: '_self',
				},
				btnBackgroundColor: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-section-has-items__item__btn',
					attribute: 'data-background-color',
					default: null,
				},
				btnTextColor: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-section-has-items__item__btn',
					attribute: 'data-color',
					default: null,
				},
				imageID: {
					type: 'number',
					source: 'attribute',
					selector: '.smb-section-has-items__item__figure > img',
					attribute: 'data-image-id',
					default: 0,
				},
				imageURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-section-has-items__item__figure > img',
					attribute: 'src',
					default: smb.pluginURL + 'block/section-has-items/image.png',
				},
			},
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { columns, lg, title, backgroundColor, items } = attributes;

		const generateUpdatedAttribute = ( parent, index, attribute, value ) => {
			const newParent = [ ...parent ];
			newParent[ index ] = get( newParent, index, {} );
			if ( null === newParent[ index ] ) {
				newParent[ index ] = {};
			}
			newParent[ index ][ attribute ] = value;
			return newParent;
		};

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

						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>

					{ times( columns, ( index ) => {
						const btnURL = get( items, [ index, 'btnURL' ], '' );
						const btnTarget = get( items, [ index, 'btnTarget' ], '_self' );
						const btnBackgroundColor = get( items, [ index, 'btnBackgroundColor' ], '' );
						const btnTextColor = get( items, [ index, 'btnTextColor' ], '' );

						return (
							<PanelBody
								title={ sprintf( __( '(%d) Button Settings', 'snow-monkey-blocks' ), index + 1 ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'URL', 'snow-monkey-blocks' ) }
									value={ btnURL }
									onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnURL', value ) } ) }
								/>

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
									onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnTarget', value ) } ) }
								/>

								<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
									<ColorPalette
										value={ btnBackgroundColor }
										onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnBackgroundColor', value ) } ) }
									/>
								</BaseControl>

								<BaseControl label={ __( 'Text Color', 'snow-monkey-blocks' ) }>
									<ColorPalette
										value={ btnTextColor }
										onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnTextColor', value ) } ) }
									/>
								</BaseControl>
							</PanelBody>
						);
					} ) }
				</InspectorControls>

				<div
					className={ `smb-section smb-section-has-items smb-section-has-items--lg-${ lg }` }
					style={ { backgroundColor: backgroundColor } }
				>
					<div className="c-container">
						{ ( title.length > 0 || isSelected ) &&
							<RichText
								className="smb-section__title"
								tagName="h2"
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
							/>
						}

						<div className="c-row c-row--margin">
							{ times( columns, ( index ) => {
								const itemTitle = get( items, [ index, 'title' ], [] );
								const lede = get( items, [ index, 'lede' ], [] );
								const summary = get( items, [ index, 'summary' ], [] );
								const btnLabel = get( items, [ index, 'btnLabel' ], [] );
								const btnURL = get( items, [ index, 'btnURL' ], '' );
								const btnTarget = get( items, [ index, 'btnTarget' ], '_self' );
								const btnBackgroundColor = get( items, [ index, 'btnBackgroundColor' ], '' );
								const btnTextColor = get( items, [ index, 'btnTextColor' ], '' );
								const imageID = get( items, [ index, 'imageID' ], 0 );
								const imageURL = get( items, [ index, 'imageURL' ], smb.pluginURL + 'block/section-has-items/image.png' );

								const renderImage = ( obj ) => {
									return (
										<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
											<img src={ imageURL } alt="" />
										</Button>
									);
								};

								return (
									<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-1-${ lg }` }>
										<div className="smb-section-has-items__item">
											{ ( !! imageID || isSelected ) &&
												<div className="smb-section-has-items__item__figure">
													<MediaUpload
														onSelect={ ( media ) => {
															const newImageURL = !! media.sizes.large ? media.sizes.large.url : media.url;
															setAttributes( { items: generateUpdatedAttribute( items, index, 'imageURL', newImageURL ) } );
															setAttributes( { items: generateUpdatedAttribute( items, index, 'imageID', media.id ) } );
														} }
														type="image"
														value={ imageID }
														render={ renderImage }
													/>
												</div>
											}

											<RichText
												className="smb-section-has-items__item__title"
												placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
												value={ itemTitle }
												onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'title', value ) } ) }
											/>

											{ ( lede.length > 0 || isSelected ) &&
												<RichText
													className="smb-section-has-items__item__lede"
													placeholder={ __( 'Write lede…', 'snow-monkey-blocks' ) }
													value={ lede }
													onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'lede', value ) } ) }
												/>
											}

											{ ( summary.length > 0 || isSelected ) &&
												<RichText
													className="smb-section-has-items__item__content"
													placeholder={ __( 'Write content…', 'snow-monkey-blocks' ) }
													value={ summary }
													onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'summary', value ) } ) }
												/>
											}

											{ ( ( btnLabel.length > 0 && !! btnURL ) || isSelected ) &&
												<div className="smb-section-has-items__item__action">
													<span className="smb-section-has-items__item__btn smb-btn"
														href={ btnURL }
														target={ btnTarget }
														style={ { backgroundColor: btnBackgroundColor } }
														data-background-color={ btnBackgroundColor }
														data-color={ btnTextColor }
													>
														<RichText
															className="smb-btn__label"
															style={ { color: btnTextColor } }
															value={ btnLabel }
															placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
															formattingControls={ [] }
															onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnLabel', value ) } ) }
														/>
													</span>
												</div>
											}
										</div>
									</div>
								);
							} ) }
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { columns, lg, title, backgroundColor, items } = attributes;

		return (
			<div
				className={ `smb-section smb-section-has-items smb-section-has-items--lg-${ lg }` }
				style={ { backgroundColor: backgroundColor } }
			>
				<div className="c-container">
					{ title.length > 0 &&
					<h2 className="smb-section__title">
						{ title }
					</h2>
					}

					<div className="c-row c-row--margin">
						{ times( columns, ( index ) => {
							const itemTitle = get( items, [ index, 'title' ], [] );
							const lede = get( items, [ index, 'lede' ], [] );
							const summary = get( items, [ index, 'summary' ], [] );
							const btnLabel = get( items, [ index, 'btnLabel' ], [] );
							const btnURL = get( items, [ index, 'btnURL' ], '' );
							const btnTarget = get( items, [ index, 'btnTarget' ], '_self' );
							const btnBackgroundColor = get( items, [ index, 'btnBackgroundColor' ], '' );
							const btnTextColor = get( items, [ index, 'btnTextColor' ], '' );
							const imageID = get( items, [ index, 'imageID' ], 0 );
							const imageURL = get( items, [ index, 'imageURL' ], smb.pluginURL + 'block/section-has-items/image.png' );

							return (
								<div className={ `c-row__col c-row__col--1-1 c-row__col--lg-1-${ lg }` }>
									<div className="smb-section-has-items__item">
										{ !! imageID &&
										<div className="smb-section-has-items__item__figure">
											<img src={ imageURL } alt="" data-image-id={ imageID } />
										</div>
										}

										<div className="smb-section-has-items__item__title">
											{ itemTitle }
										</div>

										{ lede.length > 0 &&
										<div className="smb-section-has-items__item__lede">
											{ lede }
										</div>
										}

										{ summary.length > 0 &&
										<div className="smb-section-has-items__item__content">
											{ summary }
										</div>
										}

										{ btnLabel.length > 0 && btnURL &&
										<div className="smb-section-has-items__item__action">
											<a className="smb-section-has-items__item__btn smb-btn"
												href={ btnURL }
												target={ btnTarget }
												style={ { backgroundColor: btnBackgroundColor } }
												data-background-color={ btnBackgroundColor }
												data-color={ btnTextColor }
											>
												<span className="smb-btn__label" style={ { color: btnTextColor } }>
													{ btnLabel }
												</span>
											</a>
										</div>
										}
									</div>
								</div>
							);
						} ) }
					</div>
				</div>
			</div>
		);
	},
} );
