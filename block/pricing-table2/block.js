'use strict';

import classnames from 'classnames';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/pricing-table2', {
  title: __('Pricing table', 'snow-monkey-awesome-custom-blocks'),
  icon: 'warning',
  category: 'smacb',
  attributes: {
    columns: {
      type: 'number',
      default: 1,
    },
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { columns } = attributes;

    const getColumnsTemplate = (columns) => {
      return times(columns, () => [
        'snow-monkey-awesome-custom-blocks/inner-columns--column',
        {
          customClassName: 'smacb-pricing-table__col'
        },
        [
          [ 'snow-monkey-awesome-custom-blocks/pricing-table--item' ]
        ]
      ]);
    };

    const TEMPLATE = [
      [
        'snow-monkey-awesome-custom-blocks/inner-columns',
        {
          customClassName: 'smacb-pricing-table__row'
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
              max="6"
            />
          </PanelBody>
        </InspectorControls>

        <div className={ classnames('smacb-pricing-table', [`smacb-pricing-table--${columns}`]) }>
          <InnerBlocks
            template={ TEMPLATE }
            allowedBlocks={ [] }
            templateLock="insert"
          />
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { columns } = attributes;

    return (
      <div className={ classnames('smacb-pricing-table', [`smacb-pricing-table--${columns}`]) }>
        <InnerBlocks.Content />
      </div>
    );
  },
} );
