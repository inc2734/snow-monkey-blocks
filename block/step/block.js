'use strict';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-awesome-custom-blocks/step', {
	title: __( 'Step', 'snow-monkey-awesome-custom-blocks' ),
	icon: 'editor-ol',
	category: 'smacb',
	attributes: {
		content: {
			type: 'array',
			source: 'query',
			selector: '.smacb-step__item',
			default: [],
			query: {
				title: {
					type: 'array',
					source: 'children',
					selector: '.smacb-step__item__title',
					default: [],
				},
				summary: {
					type: 'array',
					source: 'children',
					selector: '.smacb-step__item__summary',
					default: [],
				},
			},
		},
		rows: {
			type: 'number',
			default: 1,
		},
	},

	edit( { attributes, setAttributes } ) {
		const { rows, content } = attributes;

		const generateUpdatedAttribute = ( parent, index, attribute, value ) => {
			const newParent = [ ...parent ];
			newParent[ index ] = get( newParent, index, {} );
			newParent[ index ][ attribute ] = value;
			return newParent;
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Step Settings', 'snow-monkey-awesome-custom-blocks' ) }>
						<RangeControl
							label={ __( 'Rows', 'snow-monkey-awesome-custom-blocks' ) }
							value={ rows }
							onChange={ ( value ) => setAttributes( { rows: value } ) }
							min="1"
							max="50"
						/>
					</PanelBody>
				</InspectorControls>

				<div className="smacb-step">
					<div className="smacb-step__body">
						{ times( rows, ( index ) => {
							const title = get( content, [ index, 'title' ], [] );
							const summary = get( content, [ index, 'summary' ], [] );

							return (
								<div className="smacb-step__item">
									<RichText
										className="smacb-step__item__title"
										placeholder={ __( 'Write title…', 'snow-monkey-awesome-custom-blocks' ) }
										value={ title }
										formattingControls={ [] }
										multiline={ false }
										onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'title', value ) } ) }
									/>

									<RichText
										className="smacb-step__item__summary"
										placeholder={ __( 'Write content…', 'snow-monkey-awesome-custom-blocks' ) }
										value={ summary }
										multiline="p"
										onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'summary', value ) } ) }
									/>
								</div>
							);
						} ) }
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { rows, content } = attributes;

		return (
			<div className="smacb-step">
				<div className="smacb-step__body">
					{ times( rows, ( index ) => {
						const title = get( content, [ index, 'title' ], [] );
						const summary = get( content, [ index, 'summary' ], [] );

						return (
							<div className="smacb-step__item">
								<div className="smacb-step__item__title">
									{ title }
								</div>
								<div className="smacb-step__item__summary">
									{ summary }
								</div>
							</div>
						);
					} ) }
				</div>
			</div>
		);
	},
} );
