'use strict';

const { times, get } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks, RichText, MediaUpload, ColorPalette } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl, Button, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/section-has-items', {
  title: __('Section (has items)', 'snow-monkey-awesome-custom-blocks'),
  icon: 'text',
  category: 'smacb',
  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: '.smacb-section__title',
      default: []
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
      type: 'string'
    },
    items: {
      type: 'array',
      default: [
        {
          title: [],
          lede: [],
          summary: [],
          btnLabel: [],
          btnURL: '',
          btnTarget: '',
          btnBackgroundColor: '',
          btnTextColor: '',
          imageID: '',
          imageURL: smacb.pluginURL + 'block/section-has-items/image.png',
        }
      ]
    }
  },
  supports: {
    align: ['wide', 'full']
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { columns, lg, title, backgroundColor, items } = attributes;

    const generateUpdatedAttribute = (parent, index, attribute, value) => {
      let newParent = [...parent];
      newParent[ index ] = get(newParent, index, {});
      if (null === newParent[ index ]) {
        newParent[ index ] = {};
      }
      newParent[ index ][ attribute ] = value;
      return newParent;
    }

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Columns Settings', 'snow-monkey-awesome-custom-blocks') }>
            <RangeControl
              label={ __('Columns', 'snow-monkey-awesome-custom-blocks') }
              value={ columns }
              onChange={ value => setAttributes({ columns: value }) }
              min="1"
              max="24"
            />

            <RangeControl
              label={ __('Columns per row (large window)', 'snow-monkey-awesome-custom-blocks') }
              value={ lg }
              onChange={ value => setAttributes({ lg: value }) }
              min="1"
              max="4"
            />

            <BaseControl label={ __('Background Color', 'snow-monkey-awesome-custom-blocks') }>
              <ColorPalette
                value={ backgroundColor }
                onChange={ value => setAttributes({ backgroundColor: value }) }
              />
            </BaseControl>
          </PanelBody>

          { times(columns, (index) => {
            const btnURL             = get(items, [index, 'btnURL']);
            const btnTarget          = get(items, [index, 'btnTarget']);
            const btnBackgroundColor = get(items, [index, 'btnBackgroundColor']);
            const btnTextColor       = get(items, [index, 'btnTextColor']);

            return (
              <PanelBody
                title={ sprintf( __('(%s) Button Settings', 'snow-monkey-awesome-custom-blocks'), index + 1) }
                initialOpen={ false }
                >
                <TextControl
                  label={ __('URL', 'snow-monkey-awesome-custom-blocks') }
                  value={ btnURL }
                  onChange={ value => setAttributes({ items: generateUpdatedAttribute(items, index, 'btnURL', value) }) }
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
                  onChange={ value => setAttributes({ items: generateUpdatedAttribute(items, index, 'btnTarget', value) }) }
                />

                <BaseControl label={ __('Background Color', 'snow-monkey-awesome-custom-blocks') }>
                  <ColorPalette
                    value={ btnBackgroundColor }
                    onChange={ value => setAttributes({ items: generateUpdatedAttribute(items, index, 'btnBackgroundColor', value) }) }
                  />
                </BaseControl>

                <BaseControl label={ __('Text Color', 'snow-monkey-awesome-custom-blocks') }>
                  <ColorPalette
                    value={ btnTextColor }
                    onChange={ value => setAttributes({ items: generateUpdatedAttribute(items, index, 'btnTextColor', value) }) }
                  />
                </BaseControl>
              </PanelBody>
            );
          }) }
        </InspectorControls>

        <div
          className={ `smacb-section smacb-section-has-items smacb-section-has-items--lg-${lg}` }
          style={ { backgroundColor: backgroundColor } }
          >
          <div className="c-container">
            { (title.length > 0 || isSelected) &&
              <RichText
                className="smacb-section__title"
                tagName="h2"
                value={ title }
                onChange={ value => setAttributes({ title: value }) }
                formattingControls={ [] }
                placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
              />
            }

            <div className="c-row c-row--margin">
              { times(columns, (index) => {
                const title              = get(items, [index, 'title'], []);
                const lede               = get(items, [index, 'lede'], []);
                const summary            = get(items, [index, 'summary'], []);
                const btnLabel           = get(items, [index, 'btnLabel'], []);
                const btnURL             = get(items, [index, 'btnURL']);
                const btnTarget          = get(items, [index, 'btnTarget']);
                const btnBackgroundColor = get(items, [index, 'btnBackgroundColor']);
                const btnTextColor       = get(items, [index, 'btnTextColor']);
                const imageID            = get(items, [index, 'imageID']);
                const imageURL           = get(items, [index, 'imageURL'], smacb.pluginURL + 'block/section-has-items/image.png');

                const renderImage = (obj) => {
                  return (
                    <Button className="image-button" onClick={ obj.open } style={{ padding: 0 }}>
                      <img src={ imageURL } />
                    </Button>
                  );
                };

                return (
                  <div className={ `c-row__col c-row__col--1-1 c-row__col--lg-1-${lg}` }>
                    <div className="smacb-section-has-items__item">
                      { (!! imageID || isSelected) &&
                        <div className="smacb-section-has-items__item__figure">
                          <MediaUpload
                            onSelect={ media => {
                              const imageURL = !! media.sizes.large ? media.sizes.large.url : media.url;
                              setAttributes({ items: generateUpdatedAttribute(items, index, 'imageURL', imageURL) });
                              setAttributes({ items: generateUpdatedAttribute(items, index, 'imageID', media.id) });
                            } }
                            type="image"
                            value={ imageID }
                            render={ renderImage }
                          />
                        </div>
                      }

                      <RichText
                        className="smacb-section-has-items__item__title"
                        placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
                        value={ title }
                        onChange={ value => setAttributes({ items: generateUpdatedAttribute(items, index, 'title', value) }) }
                      />

                      { (lede.length > 0 || isSelected) &&
                        <RichText
                          className="smacb-section-has-items__item__lede"
                          placeholder={ __('Write lede…', 'snow-monkey-awesome-custom-blocks') }
                          value={ lede }
                          onChange={ value => setAttributes({ items: generateUpdatedAttribute(items, index, 'lede', value) }) }
                        />
                      }

                      { (summary.length > 0 || isSelected) &&
                        <RichText
                          className="smacb-section-has-items__item__content"
                          placeholder={ __('Write content…', 'snow-monkey-awesome-custom-blocks') }
                          value={ summary }
                          onChange={ value => setAttributes({ items: generateUpdatedAttribute(items, index, 'summary', value) }) }
                        />
                      }

                      { (btnLabel.length > 0 || !! btnURL || isSelected) &&
                        <div className="smacb-section-has-items__item__action">
                          <span className="smacb-section-has-items__item__btn smacb-btn"
                            href={ btnURL }
                            target={ btnTarget }
                            style={ { backgroundColor: btnBackgroundColor } }
                            >
                            <RichText
                              className="smacb-btn__label"
                              style={ { color: btnTextColor } }
                              value={ btnLabel }
                              placeholder={ __('Button', 'snow-monkey-awesome-custom-blocks') }
                              formattingControls={ [] }
                              onChange={ value => setAttributes({ items: generateUpdatedAttribute(items, index, 'btnLabel', value) }) }
                            />
                          </span>
                        </div>
                      }
                    </div>
                  </div>
                );
              }) }
            </div>
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { columns, lg, title, backgroundColor, items } = attributes;

    return (
      <div
        className={ `smacb-section smacb-section-has-items smacb-section-has-items--lg-${lg}` }
        style={ { backgroundColor: backgroundColor } }
        >
        <div className="c-container">
          { title.length > 0 &&
            <h2 className="smacb-section__title">
              { title }
            </h2>
          }

          <div className="c-row c-row--margin">
            { times(columns, (index) => {
              const title              = get(items, [index, 'title'], []);
              const lede               = get(items, [index, 'lede'], []);
              const summary            = get(items, [index, 'summary'], []);
              const btnLabel           = get(items, [index, 'btnLabel'], []);
              const btnURL             = get(items, [index, 'btnURL']);
              const btnTarget          = get(items, [index, 'btnTarget']);
              const btnBackgroundColor = get(items, [index, 'btnBackgroundColor']);
              const btnTextColor       = get(items, [index, 'btnTextColor']);
              const imageID            = get(items, [index, 'imageID']);
              const imageURL           = get(items, [index, 'imageURL'], smacb.pluginURL + 'block/section-has-items/image.png');

              return (
                <div className={ `c-row__col c-row__col--1-1 c-row__col--lg-1-${lg}` }>
                  <div className="smacb-section-has-items__item">
                    { !! imageID &&
                      <div className="smacb-section-has-items__item__figure">
                        <img src={ imageURL } alt="" />
                      </div>
                    }

                    <div className="smacb-section-has-items__item__title">
                      { title }
                    </div>

                    { lede.length > 0 &&
                      <div className="smacb-section-has-items__item__lede">
                        { lede }
                      </div>
                    }

                    { summary.length > 0 &&
                      <div className="smacb-section-has-items__item__content">
                        { summary }
                      </div>
                    }

                    { (btnLabel.length > 0 || btnURL) &&
                      <div className="smacb-section-has-items__item__action">
                        <a className="smacb-section-has-items__item__btn smacb-btn"
                          href={ btnURL }
                          target={ btnTarget }
                          style={ { backgroundColor: btnBackgroundColor } }
                          >
                          <span className="smacb-btn__label" style={ { color: btnTextColor } }>
                            { btnLabel }
                          </span>
                        </a>
                      </div>
                    }
                  </div>
                </div>
              );
            }) }
          </div>
        </div>
      </div>
    );
  },
} );
