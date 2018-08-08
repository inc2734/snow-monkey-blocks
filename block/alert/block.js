'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/alert', {
  title: __('Alert', 'snow-monkey-awesome-custom-blocks'),
  icon: 'warning',
  category: 'smacb',
  attributes: {
    content: {
      type: 'array',
      source: 'children',
      selector: '.smacb-alert__body'
    },
    modifier: {
      type: 'string',
      default: ''
    }
  },

  edit({ attributes, setAttributes }) {
    const { content, modifier } = attributes;

    const optionsModifier = [
      {
        value: '',
        label: __('Normal alert', 'snow-monkey-awesome-custom-blocks')
      },
      {
        value: 'warning',
        label: __('Warning alert', 'snow-monkey-awesome-custom-blocks')
      },
      {
        value: 'success',
        label: __('Success alert', 'snow-monkey-awesome-custom-blocks')
      }
    ];

    const onChangeContent = (value) => {
      setAttributes({ content: value });
    };

    const onChangeModifier = (value) => {
      setAttributes({ modifier: value });
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Alert Settings', 'snow-monkey-awesome-custom-blocks') }>
            <SelectControl
              label={ __('Type', 'snow-monkey-awesome-custom-blocks') }
              value={ modifier }
              onChange={ onChangeModifier }
              options={ optionsModifier }
            />
          </PanelBody>
        </InspectorControls>
        <div className={ classnames('smacb-alert', { [`smacb-alert--${modifier}`]: !! modifier }) }>
          <div className="smacb-alert__body">
            <RichText
              tagName="div"
              multiline="p"
              value={ content }
              onChange={ onChangeContent }
            />
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { content, modifier } = attributes;

    return (
      <div className={ classnames('smacb-alert', { [`smacb-alert--${modifier}`]: !! modifier }) }>
        <div className="smacb-alert__body">
          { content }
        </div>
      </div>
    );
  },
} );
