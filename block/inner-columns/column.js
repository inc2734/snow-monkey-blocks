'use strict';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/inner-columns--column', {
  title: __('Column', 'snow-monkey-awesome-custom-blocks'),
  icon: 'columns',
  category: 'smacb',
  supports: {
    inserter: false
  },
  attributes: {
    customClassName: {
      type: 'string',
      default: 'smacb-inner-columns__col'
    },
  },

  edit({ attributes }) {
    return (
      <div className="smacb-inner-columns__col">
        <InnerBlocks
          allowedBlocks={ [] }
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
