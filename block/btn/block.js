'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { Button, PanelBody, SelectControl, TextControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/btn', {
  title: __('Button', 'snow-monkey-awesome-custom-blocks'),
  icon: 'embed-generic',
  category: 'smacb',
  attributes: {
    content: {
      type: 'string',
      default: __('Button', 'snow-monkey-awesome-custom-blocks')
    },
    url: {
      type: 'string',
      default: ''
    },
    target: {
      type: 'string',
      default: '_self'
    },
    modifier: {
      type: 'string',
      default: ''
    }
  },

  edit({ attributes, setAttributes }) {
    const { content, url, target, modifier } = attributes;

    const optionsTarget = [
      {
        value: '_self',
        label: __('_self', 'snow-monkey-awesome-custom-blocks')
      },
      {
        value: '_blank',
        label: __('_blank', 'snow-monkey-awesome-custom-blocks')
      }
    ];

    const optionsModifier = [
      {
        value: '',
        label: __('Normal button', 'snow-monkey-awesome-custom-blocks')
      },
      {
        value: 'full',
        label: __('Full button', 'snow-monkey-awesome-custom-blocks')
      }
    ];

    const onChangeContent = (value) => {
      value ? value : __('Button', 'snow-monkey-awesome-custom-blocks');
      setAttributes({ content: value });
    };

    const onChangeURL = (value) => {
      setAttributes({ url: value });
    };

    const onChangeTarget = (value) => {
      setAttributes({ target: value });
    };

    const onChangeModifier = (value) => {
      setAttributes({ modifier: value });
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Button Settings', 'snow-monkey-awesome-custom-blocks') }>
            <TextControl
              label={ __('URL', 'snow-monkey-awesome-custom-blocks') }
              value={ url }
              onChange={ onChangeURL }
            />
            <SelectControl
              label={ __('Target', 'snow-monkey-awesome-custom-blocks') }
              value={ target }
              onChange={ onChangeTarget }
              options={ optionsTarget }
            />
            <SelectControl
              label={ __('Type', 'snow-monkey-awesome-custom-blocks') }
              value={ modifier }
              onChange={ onChangeModifier }
              options={ optionsModifier }
            />
          </PanelBody>
        </InspectorControls>

        <span className={ classnames('smacb-btn', { [`smacb-btn--${modifier}`]: !! modifier }) } href={ url } target={ target }>
          <span className="smacb-btn__label">
            <RichText
              format="string"
              value={ content }
              onChange={ onChangeContent }
            />
          </span>
        </span>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { content, url, target, modifier } = attributes;

    return (
      <a className={ classnames('smacb-btn', { [`smacb-btn--${modifier}`]: !! modifier }) } href={ url } target={ target }>
        <span className="smacb-btn__label">
          { content }
        </span>
      </a>
    );
  },
} );
