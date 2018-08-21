'use strict';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/faq', {
  title: __('FAQ', 'snow-monkey-awesome-custom-blocks'),
  icon: 'businessman',
  category: 'smacb',
  attributes: {
    content: {
      source: 'query',
      selector: '.smacb-faq__item',
      query: {
        question: {
          type: 'array',
          source: 'children',
          selector: '.smacb-faq__item__question',
          default: [],
        },
        answer: {
          type: 'array',
          source: 'children',
          selector: '.smacb-faq__item__answer',
          default: [],
        }
      }
    },
    rows: {
      type: 'number',
      default: 1,
    },
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { rows, content } = attributes;

    const generateUpdatedAttribute = (parent, index, attribute, value) => {
      let newParent = [...parent];
      newParent[ index ] = get(newParent, index, {});
      newParent[ index ][ attribute ] = value;
      return newParent;
    }

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('FAQ Settings', 'snow-monkey-awesome-custom-blocks') }>
            <RangeControl
              label={ __('Rows', 'snow-monkey-awesome-custom-blocks') }
              value={ rows }
              onChange={ value => setAttributes({ rows: value }) }
              min="1"
              max="50"
            />
          </PanelBody>
        </InspectorControls>

        <div className="smacb-faq">
          <div className="smacb-faq__body">
            { times(rows, (index) => {
              const question = get(content, [index, 'question'], []);
              const answer   = get(content, [index, 'answer'], []);

              return (
                <div className="smacb-faq__item">
                  <RichText
                    className="smacb-faq__item__question"
                    placeholder={ __('Write question…', 'snow-monkey-awesome-custom-blocks') }
                    value={ question }
                    formattingControls={ [] }
                    multiline={ false }
                    onChange={ value => setAttributes({ content: generateUpdatedAttribute(content, index, 'question', value) }) }
                  />

                  <RichText
                    className="smacb-faq__item__answer"
                    placeholder={ __('Write answer…', 'snow-monkey-awesome-custom-blocks') }
                    value={ answer }
                    formattingControls={ [] }
                    multiline="p"
                    onChange={ value => setAttributes({ content: generateUpdatedAttribute(content, index, 'answer', value) }) }
                  />
                </div>
              );
            } ) }
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { rows, content } = attributes;

    return (
      <div className="smacb-faq">
        <div className="smacb-faq__body">
          { times(rows, (index) => {
            const question = get(content, [index, 'question'], []);
            const answer   = get(content, [index, 'answer'], []);

            return (
              <div className="smacb-faq__item">
                <div className="smacb-faq__item__question">
                  { question }
                </div>
                <div className="smacb-faq__item__answer">
                  { answer }
                </div>
              </div>
            );
          } ) }
        </div>
      </div>
    );
  },
} );
