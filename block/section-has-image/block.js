'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, MediaUpload, ColorPalette } = wp.editor;
const { Button, PanelBody, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/section-has-image', {
  title: __('Section (has image)', 'snow-monkey-awesome-custom-blocks'),
  icon: 'text',
  category: 'smacb',
  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: '.smacb-section__title',
      default: []
    },
    backgroundColor: {
      type: 'string'
    },
    imageID: {
      type: 'number'
    },
    imageURL: {
      type: 'string',
      source: 'attribute',
      selector: '.smacb-section-has-image__figure > img',
      attribute: 'src',
      default: smacb.pluginURL + 'block/section-has-image/image.png'
    },
    imagePosition: {
      type: 'string',
      default: 'right',
    },
    imageColumnSize: {
      type: 'number',
      default: '2',
    }
  },
  supports: {
    align: ['wide', 'full']
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { title, backgroundColor, imageID, imageURL, imagePosition, imageColumnSize } = attributes;

    const renderImage = (obj) => {
      return (
        <Button className="image-button" onClick={ obj.open } style={{ padding: 0 }}>
          <img src={ imageURL } />
        </Button>
      );
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Section Settings', 'snow-monkey-awesome-custom-blocks') }>
            <SelectControl
              label={ __('Image Position', 'snow-monkey-awesome-custom-blocks') }
              value={ imagePosition }
              options={ [
                {
                  value: 'right',
                  label: __('Right side', 'snow-monkey-awesome-custom-blocks')
                },
                {
                  value: 'left',
                  label: __('Left side', 'snow-monkey-awesome-custom-blocks')
                }
              ] }
              onChange={ value => setAttributes({ imagePosition: value }) }
            />

            <SelectControl
              label={ __('Image Column Size', 'snow-monkey-awesome-custom-blocks') }
              value={ imageColumnSize }
              options={ [
                {
                  value: '2',
                  label: __('75%', 'snow-monkey-awesome-custom-blocks')
                },
                {
                  value: '1',
                  label: __('33%', 'snow-monkey-awesome-custom-blocks')
                }
              ] }
              onChange={ value => setAttributes({ imageColumnSize: value }) }
            />

            <BaseControl label={ __('Background Color', 'snow-monkey-awesome-custom-blocks') }>
              <ColorPalette
                value={ backgroundColor }
                onChange={ value => setAttributes({ backgroundColor: value }) }
              />
            </BaseControl>
          </PanelBody>
        </InspectorControls>

        <div className="smacb-section smacb-section-has-image" style={ { backgroundColor: backgroundColor } }>
          <div className="c-container">
            <div className={ classnames('c-row', 'c-row--margin', 'c-row--middle', { 'c-row--reverse': 'left' === imagePosition }) }>
              <div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${3 - imageColumnSize}-3` }>
                { (title.length > 0 || isSelected) &&
                  <RichText
                    className="smacb-section__title"
                    tagName="h2"
                    value={ title }
                    onChange={ value => setAttributes({ title: value }) }
                    formattingControls={ [] }
                    placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
                  />
                }

                <div className="smacb-section__body">
                  <InnerBlocks />
                </div>
              </div>
              <div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${imageColumnSize}-3` }>
                <div className="smacb-section-has-image__figure">
                  <MediaUpload
                    onSelect={ media => setAttributes({ imageURL: media.url, imageID: media.id, }) }
                    type="image"
                    value={ imageID }
                    render={ renderImage }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { title, backgroundColor, imageURL, imagePosition, imageColumnSize } = attributes;

    return (
      <div className="smacb-section smacb-section-has-image" style={ { backgroundColor: backgroundColor } }>
        <div className="c-container">
          <div className={ classnames('c-row', 'c-row--margin', 'c-row--middle', { 'c-row--reverse': 'left' === imagePosition }) }>
            <div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${3 - imageColumnSize}-3` }>
              { title.length > 0 &&
                <h2 className="smacb-section__title">
                  { title }
                </h2>
              }
              <div className="smacb-section__body">
                <InnerBlocks.Content />
              </div>
            </div>
            <div className={ `c-row__col c-row__col--1-1 c-row__col--lg-${imageColumnSize}-3` }>
              <div className="smacb-section-has-image__figure">
                <img src={ imageURL } alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
} );
