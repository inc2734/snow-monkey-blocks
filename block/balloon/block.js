'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { PlainText, RichText, MediaUpload, InspectorControls } = wp.editor;
const { Button, PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/balloon', {
  title: __('Balloon', 'snow-monkey-awesome-custom-blocks'),
  icon: 'admin-comments',
  category: 'smacb',
  attributes: {
    avatarID: {
      type: 'number'
    },
    avatarURL: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
      default: 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g'
    },
    balloonName: {
      type: 'string'
    },
    balloonBody: {
      type: 'array',
      source: 'children',
      selector: '.smacb-balloon__body',
      default: []
    },
    modifier: {
      type: 'string',
    }
  },

  edit({ attributes, setAttributes }) {
    const { avatarID, avatarURL, balloonName, balloonBody, modifier } = attributes;

    const renderAvatar = (obj) => {
      return (
        <Button className="image-button" onClick={ obj.open } style={{ padding: 0 }}>
          <img src={ avatarURL } />
        </Button>
      );
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Balloon Settings', 'snow-monkey-awesome-custom-blocks') }>
            <SelectControl
              label={ __('Type', 'snow-monkey-awesome-custom-blocks') }
              value={ modifier }
              onChange={ value => setAttributes({ modifier: value }) }
              options={ [
                {
                  value: '',
                  label: __('Normal balloon', 'snow-monkey-awesome-custom-blocks')
                },
                {
                  value: 'reverse',
                  label: __('Reverse Balloon', 'snow-monkey-awesome-custom-blocks')
                }
              ] }
            />
          </PanelBody>
        </InspectorControls>
        <div className={ classnames('smacb-balloon', { [`smacb-balloon--${modifier}`]: !! modifier }) }>
          <div className="smacb-balloon__person">
            <div className="smacb-balloon__figure">
              <MediaUpload
                onSelect={ media => setAttributes({ avatarURL: media.url, avatarID: media.id, }) }
                type="image"
                value={ avatarID }
                render={ renderAvatar }
              />
            </div>
            <div className="smacb-balloon__name">
              <PlainText
                value={ balloonName }
                placeholder={ __('Name', 'snow-monkey-awesome-custom-blocks') }
                onChange={ value => setAttributes({ balloonName: value }) }
              />
            </div>
          </div>
          <div className="smacb-balloon__body">
            <RichText
              tagName="div"
              multiline="p"
              value={ balloonBody }
              onChange={ value => setAttributes({ balloonBody: value }) }
            />
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { avatarURL, balloonName, balloonBody, modifier } = attributes;

    return (
      <div className={ classnames('smacb-balloon', { [`smacb-balloon--${modifier}`]: !! modifier }) }>
        <div className="smacb-balloon__person">
          <div className="smacb-balloon__figure">
            <img src={ avatarURL } alt="" />
          </div>
          <div className="smacb-balloon__name">
            { balloonName }
          </div>
        </div>
        <div className="smacb-balloon__body">
          { balloonBody }
        </div>
      </div>
    );
  },
} );
