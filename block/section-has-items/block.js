'use strict';

import classnames from 'classnames';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks, RichText, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/section-has-items', {
  title: __('Section (has items)', 'snow-monkey-awesome-custom-blocks'),
  icon: 'warning',
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
    perRowLarge: {
      type: 'number',
      default: 2,
    },
    backgroundColor: {
      type: 'string'
    },
  },
  supports: {
    align: ['wide', 'full']
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { columns, perRowLarge, title, backgroundColor } = attributes;

    const getColumnsTemplate = (columns) => {
      return times(columns, () => [
        'snow-monkey-awesome-custom-blocks/inner-columns--column',
        {
          customClassName: 'smacb-section-has-items__col'
        },
        [
          [ 'snow-monkey-awesome-custom-blocks/section-has-items--item' ]
        ]
      ]);
    };

    const TEMPLATE = [
      [
        'snow-monkey-awesome-custom-blocks/inner-columns',
        {
          customClassName: 'smacb-section-has-items__row',
          direction: 'row'
        },
        getColumnsTemplate(columns)
      ]
    ];

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
              value={ perRowLarge }
              onChange={ value => setAttributes({ perRowLarge: value }) }
              min="1"
              max="4"
            />
          </PanelBody>
          <PanelColorSettings
            title={ __('Color Settings', 'snow-monkey-awesome-custom-blocks') }
            initialOpen={ false }
            colorSettings={ [
              {
                value: backgroundColor,
                onChange: value => setAttributes({ backgroundColor: value }),
                label: __('Background Color', 'snow-monkey-awesome-custom-blocks'),
              },
            ] }
            >
          </PanelColorSettings>
        </InspectorControls>

        <div
          className={ classnames('smacb-section', 'smacb-section-has-items', [`smacb-section-has-items--lg-${perRowLarge}`]) }
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

            <InnerBlocks
              template={ TEMPLATE }
              allowedBlocks={ [] }
              templateLock="all"
            />
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { perRowLarge, title, backgroundColor } = attributes;

    return (
      <div
        className={ classnames('smacb-section', 'smacb-section-has-items', [`smacb-section-has-items--lg-${perRowLarge}`]) }
        style={ { backgroundColor: backgroundColor } }
        >
        <div className="c-container">
          { title.length > 0 &&
            <h2 className="smacb-section__title">
              { title }
            </h2>
          }

          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
} );
