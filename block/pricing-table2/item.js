'use strict';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
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
    }
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { title, price, lede, list, btnLabel, btnURL, btnTarget } = attributes;

    const onChangeTitle = (value) => {
      setAttributes({
        title: value
      });
    };

    const onChangePrice = (value) => {
      setAttributes({
        price: value
      });
    };

    const onChangeLede = (value) => {
      setAttributes({
        lede: value
      });
    };

    const onChangeList = (value) => {
      setAttributes({
        list: value
      });
    };

    const onChangeBtnLabel = (value) => {
      setAttributes({
        btnLabel: value
      });
    };

    const onChangebtnURL = (value) => {
      setAttributes({
        btnURL: value
      });
    };

    const onChangeBtnTarget = (value) => {
      setAttributes({
        btnTarget: value
      });
    };

    const optionsBtnTarget = [
      {
        value: '_self',
        label: __('_self', 'snow-monkey-awesome-custom-blocks')
      },
      {
        value: '_blank',
        label: __('_blank', 'snow-monkey-awesome-custom-blocks')
      }
    ];

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Button Settings', 'snow-monkey-awesome-custom-blocks') }>
            <TextControl
              label={ __('URL', 'snow-monkey-awesome-custom-blocks') }
              value={ btnURL }
              onChange={ onChangebtnURL }
            />
            <SelectControl
              label={ __('Target', 'snow-monkey-awesome-custom-blocks') }
              value={ btnTarget }
              options={ optionsBtnTarget }
              onChange={ onChangeBtnTarget }
            />
          </PanelBody>
        </InspectorControls>

        <div className="smacb-pricing-table__item">
          <div className="smacb-pricing-table__item__title">
            <RichText
              format="string"
              tagName="div"
              placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
              value={ title }
              onChange={ onChangeTitle }
            />
          </div>

          <div className="smacb-pricing-table__item__price">
            <RichText
              format="string"
              tagName="div"
              placeholder={ __('Write price…', 'snow-monkey-awesome-custom-blocks') }
              value={ price }
              onChange={ onChangePrice }
            />
          </div>

          <div className="smacb-pricing-table__item__lede">
            <RichText
              format="string"
              tagName="div"
              placeholder={ __('Write lede…', 'snow-monkey-awesome-custom-blocks') }
              value={ lede }
              onChange={ onChangeLede }
            />
          </div>

          <RichText
            tagName="ul"
            multiline="li"
            value={ list }
            onChange={ onChangeList }
          />

          <div class="smacb-pricing-table__item__action">
            <span class="smacb-pricing-table__item__btn smacb-btn" href={ btnURL } target={ btnTarget }>
              <span className="smacb-btn__label">
                <RichText
                  format="string"
                  value={ btnLabel }
                  placeholder={ __('Button', 'snow-monkey-awesome-custom-blocks') }
                  formattingControls={ [] }
                  onChange={ onChangeBtnLabel }
                />
              </span>
            </span>
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { title, price, lede, list, btnLabel, btnURL, btnTarget } = attributes;

    return (
      <div className="smacb-pricing-table__item">
        <div className="smacb-pricing-table__item__title">
          { title }
        </div>

        <div className="smacb-pricing-table__item__price">
          { price }
        </div>

        { lede && lede.length > 0 &&
          <div className="smacb-pricing-table__item__lede">
            { lede }
          </div>
        }

        <ul>
          { list }
        </ul>

        { btnLabel && btnLabel.length > 0 && btnURL && btnURL.length > 0 && btnTarget && btnTarget.length > 0 &&
          <div class="smacb-pricing-table__item__action">
            <a class="smacb-pricing-table__item__btn smacb-btn" href={ btnURL } target={ btnTarget }>
              <span className="smacb-btn__label">
                { btnLabel }
              </span>
            </a>
          </div>
        }
      </div>
    );
  },
} );
