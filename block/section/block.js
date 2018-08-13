'use strict';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, PanelColorSettings } = wp.editor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/section', {
  title: __('Section', 'snow-monkey-awesome-custom-blocks'),
  icon: 'text',
  category: 'smacb',
  attributes: {
    title: {
      type: 'string',
      selector: '.smacb-section__title'
    },
    backgroundColor: {
      type: 'string'
    }
  },
  supports: {
    align: ['wide', 'full']
  },

  edit({ attributes, setAttributes }) {
    const { title, backgroundColor } = attributes;

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
            ] }
            >
          </PanelColorSettings>
        </InspectorControls>
        <div className="smacb-section" style={ { backgroundColor: backgroundColor } }>
          <div className="c-container">
            <RichText
              className="smacb-section__title"
              format="string"
              tagName="h2"
              value={ title }
              onChange={ value => setAttributes({ title: value }) }
              formattingControls={ [] }
              placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
            />

            <div className="smacb-section__body">
              <InnerBlocks />
            </div>
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { title, backgroundColor } = attributes;

    return (
      <div className="smacb-section" style={ { backgroundColor: backgroundColor } }>
        <div className="c-container">
          <h2 className="smacb-section__title">
            { title }
          </h2>

          <div className="smacb-section__body">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    );
  },
} );
