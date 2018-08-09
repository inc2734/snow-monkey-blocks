'use strict';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, PanelColorSettings, ContrastChecker } = wp.editor;
const { Button, PanelBody, SelectControl, TextControl } = wp.components;
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

    const onChangeBackgroundColor = (value) => {
      setAttributes({ backgroundColor: value });
    };

    const onChangeBorderColor = (value) => {
      setAttributes({ borderColor: value });
    };

    const onChangeTextColor = (value) => {
      setAttributes({ textColor: value });
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelColorSettings
            title={ __('Color Settings', 'snow-monkey-awesome-custom-blocks') }
            initialOpen={ false }
            colorSettings={ [
              {
                value: backgroundColor,
                onChange: onChangeBackgroundColor,
                label: __('Background Color', 'snow-monkey-awesome-custom-blocks'),
              },
              {
                value: borderColor,
                onChange: onChangeBorderColor,
                label: __('Border Color', 'snow-monkey-awesome-custom-blocks'),
              },
              {
                value: textColor,
                onChange: onChangeTextColor,
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
