'use strict';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/pricing-table--item', {
  title: __('Pricing table item', 'snow-monkey-awesome-custom-blocks'),
  category: 'smacb',
  supports: {
    inserter: false
  },
  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: '.smacb-pricing-table__item__title',
      default: []
    },
    className: {
      type: 'string',
      source: 'children',
      default: ''
    },
    price: {
      type: 'array',
      source: 'children',
      selector: '.smacb-pricing-table__item__price',
      default: []
    },
    lede: {
      type: 'array',
      source: 'children',
      selector: '.smacb-pricing-table__item__lede',
      default: []
    },
    list: {
      type: 'array',
      source: 'children',
      selector: 'ul',
      default: []
    },
    btnLabel: {
      type: 'array',
      source: 'children',
      selector: '.smacb-btn__label',
      default: []
    },
    btnURL: {
      type: 'string',
      default: '',
    },
    btnTarget: {
      type: 'string',
      default: '_self',
    },
    btnBackgroundColor: {
      type: 'string',
    },
    btnTextColor: {
      type: 'string',
    }
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, className } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Button Settings', 'snow-monkey-awesome-custom-blocks') }>
            <TextControl
              label={ __('URL', 'snow-monkey-awesome-custom-blocks') }
              value={ btnURL }
              onChange={ value => setAttributes({ btnURL: value }) }
            />

            <SelectControl
              label={ __('Target', 'snow-monkey-awesome-custom-blocks') }
              value={ btnTarget }
              options={ [
                {
                  value: '_self',
                  label: __('_self', 'snow-monkey-awesome-custom-blocks')
                },
                {
                  value: '_blank',
                  label: __('_blank', 'snow-monkey-awesome-custom-blocks')
                }
              ] }
              onChange={ value => setAttributes({ optionsBtnTarget: value }) }
            />
          </PanelBody>
          <PanelColorSettings
            title={ __('Color Settings', 'snow-monkey-awesome-custom-blocks') }
            initialOpen={ false }
            colorSettings={ [
              {
                value: btnBackgroundColor,
                onChange: value => setAttributes({ btnBackgroundColor: value }),
                label: __('Background Color', 'snow-monkey-awesome-custom-blocks'),
              },
              {
                value: btnTextColor,
                onChange: value => setAttributes({ btnTextColor: value }),
                label: __('Text Color', 'snow-monkey-awesome-custom-blocks'),
              },
            ] }
          >
          </PanelColorSettings>
        </InspectorControls>

        <div className={`smacb-pricing-table__item ${className}`}>
          <RichText
            tagName="div"
            className="smacb-pricing-table__item__title"
            placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
            value={ title }
            onChange={ value => setAttributes({ title: value }) }
          />

          { (price.length > 0 || isSelected) &&
            <RichText
              tagName="div"
              className="smacb-pricing-table__item__price"
              placeholder={ __('Write price…', 'snow-monkey-awesome-custom-blocks') }
              value={ price }
              onChange={ value => setAttributes({ price: value }) }
            />
          }

          { (lede.length > 0 || isSelected) &&
            <RichText
              tagName="div"
              className="smacb-pricing-table__item__lede"
              placeholder={ __('Write lede…', 'snow-monkey-awesome-custom-blocks') }
              value={ lede }
              onChange={ value => setAttributes({ lede: value }) }
            />
          }
          {
            (className || isSelected) &&
              <RichText
              tagName="div"
              className="smacb-pricing-table__item__className"
              placeholder={ __('Write className (It is not shown html view)', 'snow-monkey-awesome-custom-blocks') }
              value={ className }
              onChange={ className => setAttributes({ className }) }
            />
          }

          <RichText
            tagName="ul"
            multiline="li"
            value={ list }
            onChange={ value => setAttributes({ list: value }) }
          />

          { (btnLabel.length > 0 && btnURL && btnTarget || isSelected) &&
            <div class="smacb-pricing-table__item__action">
              <span class="smacb-pricing-table__item__btn smacb-btn" href={ btnURL } target={ btnTarget }
                style={ { backgroundColor: btnBackgroundColor } }
                >
                <RichText
                  tagName="span"
                  className="smacb-btn__label"
                  placeholder={ __('Button', 'snow-monkey-awesome-custom-blocks') }
                  formattingControls={ [] }
                  value={ btnLabel }
                  onChange={ value => setAttributes({ btnLabel: value }) }
                  style={ { color: btnTextColor } }
                />
              </span>
            </div>
          }
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, className } = attributes;

    return (
      <div className={`smacb-pricing-table__item ${className}`}>
        <div className="smacb-pricing-table__item__title">
          { title }
        </div>

        { price.length > 0 &&
          <div className="smacb-pricing-table__item__price">
            { price }
          </div>
        }

        { lede.length > 0 &&
          <div className="smacb-pricing-table__item__lede">
            { lede }
          </div>
        }

        <ul>
          { list }
        </ul>

        { btnLabel.length > 0 && btnURL && btnTarget &&
          <div class="smacb-pricing-table__item__action">
            <a class="smacb-pricing-table__item__btn smacb-btn" href={ btnURL } target={ btnTarget }
              style={ { backgroundColor: btnBackgroundColor } }
              >
              <span className="smacb-btn__label" style={ { color: btnTextColor } }>
                { btnLabel }
              </span>
            </a>
          </div>
        }
      </div>
    );
  },
} );
