'use strict';

import classnames from 'classnames';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/inner-columns', {
  title: __('Columns', 'snow-monkey-awesome-custom-blocks'),
  icon: 'columns',
  category: 'smacb',
  supports: {
    inserter: false
  },
  attributes: {
    customClassName: {
      type: 'string',
      default: 'smacb-inner-columns'
    },
    direction: {
      type: 'string',
      default: 'row' // or column
    }
  },

  edit({ attributes, setAttributes }) {
    const { customClassName, direction } = attributes;

    return (
      <div className={ classnames('smacb-inner-columns', [`smacb-inner-columns--${direction}`]) }>
        <InnerBlocks
          allowedBlocks={ [ 'snow-monkey-awesome-custom-blocks/inner-columns--column' ] }
          templateLock="all"
        />
      </div>
    );
  },

  save({ attributes }) {
    const { customClassName } = attributes;

    return (
      <div className={ customClassName }>
        <InnerBlocks.Content />
      </div>
    );
  },
} );
