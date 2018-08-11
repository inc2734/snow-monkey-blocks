'use strict';

import classnames from 'classnames';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/inner-columns', {
  title: __('Inner columns', 'snow-monkey-awesome-custom-blocks'),
  icon: 'columns',
  category: 'smacb',
  supports: {
    inserter: false
  },
  attributes: {
    columns: {
      type: 'number',
      default: 1,
    },
    customClassName: {
      type: 'string',
      default: 'smacb-inner-columns'
    },
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { columns } = attributes;

    const getColumnsTemplate = (columns) => {
      return times(columns, () => [ 'snow-monkey-awesome-custom-blocks/inner-columns--column' ]);
    };

    return (
      <div className="smacb-inner-columns">
        <InnerBlocks
          template={ getColumnsTemplate(columns) }
          allowedBlocks={ [] }
        />
      </div>
    );
  },

  save({ attributes }) {
    const { columns, customClassName } = attributes;

    return (
      <div className={ customClassName }>
        <InnerBlocks.Content />
      </div>
    );
  },
} );
