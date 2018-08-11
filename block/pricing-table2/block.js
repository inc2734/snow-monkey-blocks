'use strict';

import classnames from 'classnames';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl } = wp.components;
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

    let columnsTemplate = [];
    for ( let i = columns; i > 0; i--) {
      columnsTemplate.push(
        [
          'core/column',
          {},
          [
            [ 'snow-monkey-awesome-custom-blocks/pricing-table-item', {} ]
          ]
        ]
      );
    }

    const TEMPLATE = [
      [
        'core/columns',
        {
          columns: columns
        },
        columnsTemplate
      ]
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
        </InspectorControls>

        <div className={ classnames('smacb-pricing-table', [`smacb-pricing-table--${columns}`]) }>
          <InnerBlocks
            template={ TEMPLATE }
            allowedBlocks={ [] }
          />
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { columns } = attributes;

    return (
      <div className={ classnames('smacb-pricing-table', [`smacb-pricing-table--${columns}`]) }>
        <div className="smacb-pricing-table__row">
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
} );
