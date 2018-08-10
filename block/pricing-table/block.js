'use strict';

import classnames from 'classnames';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/pricing-table', {
  title: __('Pricing table', 'snow-monkey-awesome-custom-blocks'),
  icon: 'warning',
  category: 'smacb',
  attributes: {
    content: {
      type: 'array',
      source: 'query',
      selector: '.smacb-pricing-table__item',
      default: [ [] ],
      query: {
        title: {
          type: 'string',
          source: 'children',
          selector: '.smacb-pricing-table__item__title',
        },
        price: {
          type: 'string',
          source: 'children',
          selector: '.smacb-pricing-table__item__price',
        },
        lede: {
          type: 'string',
          source: 'children',
          selector: '.smacb-pricing-table__item__lede',
        },
        list: {
          type: 'array',
          source: 'children',
          selector: 'ul',
        },
        btnLabel: {
          type: 'string',
          source: 'children',
          selector: '.smacb-pricing-table__item__btn .smacb-btn__label',
          default: __('Button', 'snow-monkey-awesome-custom-blocks')
        },
        btnUrl: {
          type: 'string',
          source: 'attribute',
          selector: '.smacb-pricing-table__item__btn',
          attribute: 'href'
        },
        btnTarget: {
          type: 'string',
          source: 'attribute',
          selector: '.smacb-pricing-table__item__btn',
          attribute: 'target'
        }
      }
    },
    columns: {
      type: 'number',
      default: 1,
    },
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { content, columns } = attributes;

    const onChangeItemTitle = (newContent, index) => {
      let _content = [...content];
      _content[ index ] = !! _content[ index ] ? _content[ index ] : [];
      _content[ index ].title = newContent;
      setAttributes( {
        content: _content,
      } );
    };

    const onChangeItemPrice = (newContent, index) => {
      let _content = [...content];
      _content[ index ] = !! _content[ index ] ? _content[ index ] : [];
      _content[ index ].price = newContent;
      setAttributes( {
        content: _content,
      } );
    };

    const onChangeItemLede = (newContent, index) => {
      let _content = [...content];
      _content[ index ] = !! _content[ index ] ? _content[ index ] : [];
      _content[ index ].lede = newContent;
      setAttributes( {
        content: _content,
      } );
    };

    const onChangeItemList = (newContent, index) => {
      let _content = [...content];
      _content[ index ] = !! _content[ index ] ? _content[ index ] : [];
      _content[ index ].list = newContent;
      setAttributes( {
        content: _content,
      } );
    };

    const onChangeItemBtnLabel = (newContent, index) => {
      let _content = [...content];
      _content[ index ] = !! _content[ index ] ? _content[ index ] : [];
      _content[ index ].btnLabel = newContent;
      setAttributes( {
        content: _content,
      } );
    };

    const onChangeItemBtnUrl = (newContent, index) => {
      let _content = [...content];
      _content[ index ] = !! _content[ index ] ? _content[ index ] : [];
      _content[ index ].btnUrl = newContent;
      console.log(_content);
      setAttributes( {
        content: _content,
      } );
    };

    const onChangeItemBtnTarget = (newContent, index) => {
      let _content = [...content];
      _content[ index ] = !! _content[ index ] ? _content[ index ] : [];
      _content[ index ].btnTarget = newContent;
      setAttributes( {
        content: _content,
      } );
    };

    const optionsItemBtnTarget = [
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
          <PanelBody title={ __('Columns Settings', 'snow-monkey-awesome-custom-blocks') }>
            <RangeControl
              label={ __('Columns', 'snow-monkey-awesome-custom-blocks') }
              value={ columns }
              onChange={ ( value ) => setAttributes( { columns: value } ) }
              min="1"
              max="6"
            />
          </PanelBody>

          { times(columns, (index) => {
            return (
              <PanelBody title={ sprintf( __('(%s) Button Settings', 'snow-monkey-awesome-custom-blocks'), index + 1) }>
                <TextControl
                  label={ __('URL', 'snow-monkey-awesome-custom-blocks') }
                  value={ get(content, [ index, 'btnUrl' ]) }
                  onChange={ (newContent) => {
                    onChangeItemBtnUrl(newContent, index);
                  } }
                />
                <SelectControl
                  label={ __('Target', 'snow-monkey-awesome-custom-blocks') }
                  value={ get(content, [ index, 'btnTarget' ]) }
                  options={ optionsItemBtnTarget }
                  onChange={ (newContent) => {
                    onChangeItemBtnTarget(newContent, index);
                  } }
                />
              </PanelBody>
            );
          } ) }
        </InspectorControls>

        <div className={ classnames('smacb-pricing-table', [`smacb-pricing-table--${columns}`]) }>
          <div className="smacb-pricing-table__row">
            { times(columns, (index) => {
              const title     = get(content, [ index, 'title' ]);
              const price     = get(content, [ index, 'price' ]);
              const lede      = get(content, [ index, 'lede' ]);
              const list      = get(content, [ index, 'list' ]);
              const btnLabel  = get(content, [ index, 'btnLabel' ]);
              const btnUrl    = get(content, [ index, 'btnUrl' ]);
              const btnTarget = get(content, [ index, 'btnTarget' ]);

              return (
                <div className="smacb-pricing-table__col">
                  <div className="smacb-pricing-table__item">
                    <div className="smacb-pricing-table__item__title">
                      <RichText
                        format="string"
                        tagName="div"
                        placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
                        value={ title }
                        onChange={ (newContent) => {
                          onChangeItemTitle(newContent, index);
                        } }
                      />
                    </div>

                    <div className="smacb-pricing-table__item__price">
                      <RichText
                        format="string"
                        tagName="div"
                        placeholder={ __('Write price…', 'snow-monkey-awesome-custom-blocks') }
                        value={ price }
                        onChange={ (newContent) => {
                          onChangeItemPrice(newContent, index);
                        } }
                      />
                    </div>

                    <div className="smacb-pricing-table__item__lede">
                      <RichText
                        format="string"
                        tagName="div"
                        placeholder={ __('Write lede…', 'snow-monkey-awesome-custom-blocks') }
                        value={ lede }
                        onChange={ (newContent) => {
                          onChangeItemLede(newContent, index);
                        } }
                      />
                    </div>

                    <RichText
                      tagName="ul"
                      multiline="li"
                      placeholder={ __('Write item…', 'snow-monkey-awesome-custom-blocks') }
                      value={ list }
                      onChange={ (newContent) => {
                        onChangeItemList(newContent, index);
                      } }
                    />

                    <div class="smacb-pricing-table__item__action">
                      <span class="smacb-pricing-table__item__btn smacb-btn" href={ btnUrl } target={ btnTarget }>
                        <span className="smacb-btn__label">
                          <RichText
                            format="string"
                            value={ btnLabel }
                            placeholder={ __('Button', 'snow-monkey-awesome-custom-blocks') }
                            formattingControls={ [] }
                            onChange={ (newContent) => {
                              onChangeItemBtnLabel(newContent, index);
                            } }
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            } ) }
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { content, columns } = attributes;

    return (
      <div className={ classnames('smacb-pricing-table', [`smacb-pricing-table--${columns}`]) }>
        <div className="smacb-pricing-table__row">
          { times(columns, (index) => {
            const title     = get(content, [ index, 'title' ]);
            const price     = get(content, [ index, 'price' ]);
            const lede      = get(content, [ index, 'lede' ]);
            const list      = get(content, [ index, 'list' ]);
            const btnLabel  = get(content, [ index, 'btnLabel' ]);
            const btnUrl    = get(content, [ index, 'btnUrl' ]);
            const btnTarget = get(content, [ index, 'btnTarget' ]);

            return (
              <div className="smacb-pricing-table__col">
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

                  { btnLabel && btnLabel.length > 0 && btnUrl && btnUrl.length > 0 && btnTarget && btnTarget.length > 0 &&
                    <div class="smacb-pricing-table__item__action">
                      <a class="smacb-pricing-table__item__btn smacb-btn" href={ btnUrl } target={ btnTarget }>
                        <span className="smacb-btn__label">
                          { btnLabel }
                        </span>
                      </a>
                    </div>
                  }
                </div>
              </div>
            )
          }) }
        </div>
      </div>
    );
  },
} );
