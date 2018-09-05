'use strict';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/pricing-table', {
	title: __( 'Pricing table', 'snow-monkey-blocks' ),
	icon: 'warning',
	category: 'smb',
	attributes: {
		content: {
			type: 'array',
			source: 'query',
			selector: '.smb-pricing-table__item',
			default: [],
			query: {
				title: {
					type: 'array',
					source: 'children',
					selector: '.smb-pricing-table__item__title',
					default: [],
				},
				price: {
					type: 'array',
					source: 'children',
					selector: '.smb-pricing-table__item__price',
					default: [],
				},
				lede: {
					type: 'array',
					source: 'children',
					selector: '.smb-pricing-table__item__lede',
					default: [],
				},
				list: {
					type: 'array',
					source: 'children',
					selector: 'ul',
					default: [],
				},
				btnLabel: {
					type: 'array',
					source: 'children',
					selector: '.smb-pricing-table__item__btn > .smb-btn__label',
					default: [],
				},
				btnURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-pricing-table__item__btn',
					attribute: 'href',
					default: '',
				},
				btnTarget: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-pricing-table__item__btn',
					attribute: 'target',
					default: '_self',
				},
				btnBackgroundColor: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-pricing-table__item__btn',
					attribute: 'data-background-color',
					default: null,
				},
				btnTextColor: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-pricing-table__item__btn',
					attribute: 'data-color',
					default: null,
				},
			},
		},
		columns: {
			type: 'number',
			default: 1,
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { content, columns } = attributes;

		const generateUpdatedAttribute = ( parent, index, attribute, value ) => {
			const newParent = [ ...parent ];
			newParent[ index ] = get( newParent, index, {} );
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
							max="6"
						/>
					</PanelBody>

					{ times( columns, ( index ) => {
						const btnURL = get( content, [ index, 'btnURL' ], '' );
						const btnTarget = get( content, [ index, 'btnTarget' ], '_self' );
						const btnBackgroundColor = get( content, [ index, 'btnBackgroundColor' ], '' );
						const btnTextColor = get( content, [ index, 'btnTextColor' ], '' );

						return (
							<PanelBody
								title={ sprintf( __( '(%d) Button Settings', 'snow-monkey-blocks' ), index + 1 ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'URL', 'snow-monkey-blocks' ) }
									value={ btnURL }
									onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'btnURL', value ) } ) }
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
									onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'btnTarget', value ) } ) }
								/>

								<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
									<ColorPalette
										value={ btnBackgroundColor }
										onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'btnBackgroundColor', value ) } ) }
									/>
								</BaseControl>

								<BaseControl label={ __( 'Text Color', 'snow-monkey-blocks' ) }>
									<ColorPalette
										value={ btnTextColor }
										onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'btnTextColor', value ) } ) }
									/>
								</BaseControl>
							</PanelBody>
						);
					} ) }
				</InspectorControls>

				<div className={ `smb-pricing-table smb-pricing-table--${ columns }` }>
					<div className="smb-pricing-table__row">
						{ times( columns, ( index ) => {
							const title = get( content, [ index, 'title' ], [] );
							const price = get( content, [ index, 'price' ], [] );
							const lede = get( content, [ index, 'lede' ], [] );
							const list = get( content, [ index, 'list' ], [] );
							const btnLabel = get( content, [ index, 'btnLabel' ], [] );
							const btnURL = get( content, [ index, 'btnURL' ], '' );
							const btnTarget = get( content, [ index, 'btnTarget' ], '_self' );
							const btnBackgroundColor = get( content, [ index, 'btnBackgroundColor' ], '' );
							const btnTextColor = get( content, [ index, 'btnTextColor' ], '' );

							return (
								<div className="smb-pricing-table__col">
									<div className="smb-pricing-table__item">
										<RichText
											className="smb-pricing-table__item__title"
											placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
											value={ title }
											formattingControls={ [] }
											onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'title', value ) } ) }
										/>

										{ ( price.length > 0 || isSelected ) &&
											<RichText
												className="smb-pricing-table__item__price"
												placeholder={ __( 'Write price…', 'snow-monkey-blocks' ) }
												value={ price }
												formattingControls={ [] }
												onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'price', value ) } ) }
											/>
										}

										{ ( lede.length > 0 || isSelected ) &&
											<RichText
												className="smb-pricing-table__item__lede"
												placeholder={ __( 'Write lede…', 'snow-monkey-blocks' ) }
												value={ lede }
												formattingControls={ [] }
												onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'lede', value ) } ) }
											/>
										}

										<RichText
											tagName="ul"
											multiline="li"
											value={ list }
											onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'list', value ) } ) }
										/>

										{ ( btnLabel.length > 0 || !! btnURL || isSelected ) &&
											<div className="smb-pricing-table__item__action">
												<span className="smb-pricing-table__item__btn smb-btn"
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
														onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'btnLabel', value ) } ) }
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
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { content, columns } = attributes;

		return (
			<div className={ `smb-pricing-table smb-pricing-table--${ columns }` }>
				<div className="smb-pricing-table__row">
					{ times( columns, ( index ) => {
						const title = get( content, [ index, 'title' ], [] );
						const price = get( content, [ index, 'price' ], [] );
						const lede = get( content, [ index, 'lede' ], [] );
						const list = get( content, [ index, 'list' ], [] );
						const btnLabel = get( content, [ index, 'btnLabel' ], [] );
						const btnURL = get( content, [ index, 'btnURL' ], '' );
						const btnTarget = get( content, [ index, 'btnTarget' ], '_self' );
						const btnBackgroundColor = get( content, [ index, 'btnBackgroundColor' ], '' );
						const btnTextColor = get( content, [ index, 'btnTextColor' ], '' );

						return (
							<div className="smb-pricing-table__col">
								<div className="smb-pricing-table__item">
									<div className="smb-pricing-table__item__title">
										{ title }
									</div>

									{ price.length > 0 &&
										<div className="smb-pricing-table__item__price">
											{ price }
										</div>
									}

									{ lede.length > 0 &&
										<div className="smb-pricing-table__item__lede">
											{ lede }
										</div>
									}

									<ul>
										{ list }
									</ul>

									{ ( btnLabel.length > 0 || btnURL ) &&
										<div className="smb-pricing-table__item__action">
											<a className="smb-pricing-table__item__btn smb-btn"
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
		);
	},
} );
