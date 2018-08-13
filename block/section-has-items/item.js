'use strict';

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/section-has-items--item', {
  title: __('Item', 'snow-monkey-awesome-custom-blocks'),
  category: 'smacb',
  supports: {
    inserter: false
  },
  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: '.smacb-section-has-items__item__title',
      default: []
    },
    lede: {
      type: 'array',
      source: 'children',
      selector: '.smacb-section-has-items__item__lede',
      default: []
    },
    content: {
      type: 'array',
      source: 'children',
      selector: '.smacb-section-has-items__item__content',
      default: []
    },
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { title, lede, content } = attributes;

    return (
      <div className="smacb-section-has-items__item">
        <RichText
          className="smacb-section-has-items__item__title"
          tagName="div"
          placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
          value={ title }
          onChange={ value => setAttributes({ title: value }) }
        />

        { (lede.length > 0 || isSelected) &&
          <RichText
            className="smacb-section-has-items__item__lede"
            tagName="div"
            placeholder={ __('Write lede…', 'snow-monkey-awesome-custom-blocks') }
            value={ lede }
            onChange={ value => setAttributes({ lede: value }) }
          />
        }

        { (content.length > 0 || isSelected) &&
          <RichText
            className="smacb-section-has-items__item__content"
            tagName="div"
            placeholder={ __('Write content…', 'snow-monkey-awesome-custom-blocks') }
            value={ content }
            onChange={ value => setAttributes({ content: value }) }
          />
        }
      </div>
    );
  },

  save({ attributes }) {
    const { title, lede, content } = attributes;

    return (
      <div className="smacb-section-has-items__item">
        <div className="smacb-section-has-items__item__title">
          { title }
        </div>

        { lede.length > 0 &&
          <div className="smacb-section-has-items__item__lede">
            { lede }
          </div>
        }

        { content.length > 0 &&
          <div className="smacb-section-has-items__item__content">
            { content }
          </div>
        }
      </div>
    );
  },
} );
