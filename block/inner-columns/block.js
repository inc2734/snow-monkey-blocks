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
    sm: {
      type: 'number',
      default: 1
    },
    md: {
      type: 'number',
    },
    lg: {
      type: 'number',
    }
  },

  edit({ attributes, setAttributes }) {
    const { sm, md, lg, customClassName } = attributes;

    return (
      <div
        className={ classnames(
          'smacb-inner-columns',
          [`smacb-inner-columns--${sm}`],
          { [`smacb-inner-columns--md-${md}`]: !! md },
          { [`smacb-inner-columns--lg-${lg}`]: !! lg }
        ) }>
        <InnerBlocks
          templateLock="false"
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
