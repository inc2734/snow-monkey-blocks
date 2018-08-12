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
  },

  edit({ attributes, setAttributes }) {
    const { customClassName } = attributes;

    return (
      <div className="smacb-inner-columns">
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
