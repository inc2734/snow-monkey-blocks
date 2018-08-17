'use strict';

import classnames from 'classnames';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/pricing-table2', {
  title: __('Pricing table2', 'snow-monkey-awesome-custom-blocks'),
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

    const TEMPLATE = [
      [
        'snow-monkey-awesome-custom-blocks/inner-columns',
        {
          customClassName: 'c-row c-row--margin',
          sm: columns,
        },
        times(columns, () => [
          'snow-monkey-awesome-custom-blocks/inner-columns--column',
          {
            customClassName: `c-row__col ${columns}`,
          },
          [
            [ 'snow-monkey-awesome-custom-blocks/pricing-table--item' ]
          ]
        ])

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
            templateLock="all"
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
