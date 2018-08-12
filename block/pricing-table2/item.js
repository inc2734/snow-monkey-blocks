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
      type: 'string',
    },
    price: {
      type: 'string',
    },
    lede: {
      type: 'string',
    },
    list: {
      type: 'array',
      source: 'children',
      selector: 'ul',
    },
    btnLabel: {
      type: 'string',
    },
    btnURL: {
      type: 'string',
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
    const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor } = attributes;

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

        <div className="smacb-pricing-table__item">
          <div className="smacb-pricing-table__item__title">
            <RichText
              format="string"
              tagName="div"
              placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
              value={ title }
              onChange={ value => setAttributes({ title: value }) }
            />
          </div>

          <div className="smacb-pricing-table__item__price">
            <RichText
              format="string"
              tagName="div"
              placeholder={ __('Write price…', 'snow-monkey-awesome-custom-blocks') }
              value={ price }
              onChange={ value => setAttributes({ price: value }) }
            />
          </div>

          <div className="smacb-pricing-table__item__lede">
            <RichText
              format="string"
              tagName="div"
              placeholder={ __('Write lede…', 'snow-monkey-awesome-custom-blocks') }
              value={ lede }
              onChange={ value => setAttributes({ lede: value }) }
            />
          </div>

          <RichText
            tagName="ul"
            multiline="li"
            value={ list }
            onChange={ value => setAttributes({ list: value }) }
          />

          <div class="smacb-pricing-table__item__action">
            <span class="smacb-pricing-table__item__btn smacb-btn" href={ btnURL } target={ btnTarget }
              style={ { backgroundColor: btnBackgroundColor } }
              >
              <span className="smacb-btn__label">
                <RichText
                  format="string"
                  placeholder={ __('Button', 'snow-monkey-awesome-custom-blocks') }
                  formattingControls={ [] }
                  value={ btnLabel }
                  onChange={ value => setAttributes({ btnLabel: value }) }
                  style={ { color: btnTextColor } }
                />
              </span>
            </span>
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor } = attributes;

    return (
      <div className="smacb-pricing-table__item">
        <div className="smacb-pricing-table__item__title">
          { title }
        </div>

        <div className="smacb-pricing-table__item__price">
          { price }
        </div>

        { lede &&
          <div className="smacb-pricing-table__item__lede">
            { lede }
          </div>
        }

        <ul>
          { list }
        </ul>

        { btnLabel && btnURL && btnTarget &&
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
