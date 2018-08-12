'use strict';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, PanelColorSettings } = wp.editor;
const { Button, PanelBody } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/box', {
  title: __('Box', 'snow-monkey-awesome-custom-blocks'),
  icon: 'admin-comments',
  category: 'smacb',
  attributes: {
    backgroundColor: {
      type: 'string'
    },
    borderColor: {
      type: 'string'
    },
    textColor: {
      type: 'string'
    }
  },

  edit({ attributes, setAttributes }) {
    const { backgroundColor, borderColor, textColor } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelColorSettings
            title={ __('Color Settings', 'snow-monkey-awesome-custom-blocks') }
            initialOpen={ false }
            colorSettings={ [
              {
                value: backgroundColor,
                onChange: value => setAttributes({ backgroundColor: value }),
                label: __('Background Color', 'snow-monkey-awesome-custom-blocks'),
              },
              {
                value: borderColor,
                onChange: value => setAttributes({ borderColor: value }),
                label: __('Border Color', 'snow-monkey-awesome-custom-blocks'),
              },
              {
                value: textColor,
                onChange: value => setAttributes({ textColor: value }),
                label: __('Text Color', 'snow-monkey-awesome-custom-blocks'),
              },
            ] }
            >
          </PanelColorSettings>
        </InspectorControls>

        <div className="smacb-box" style={ { backgroundColor: backgroundColor, borderColor: borderColor, color: textColor } }>
          <div className="smacb-box__body">
            <InnerBlocks
              allowedBlocks={ [ 'core/image', 'core/paragraph', 'core/list' ] }
            />
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { backgroundColor, borderColor, textColor } = attributes;

    return (
      <div className="smacb-box" style={ { backgroundColor: backgroundColor, borderColor: borderColor, color: textColor } }>
        <div className="smacb-box__body">
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
} );
