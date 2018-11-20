'use strict';

const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl, RangeControl, ServerSideRender } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/recent-posts', {
	title: __( 'Recent posts', 'snow-monkey-blocks' ),
	icon: 'editor-ul',
	category: 'smb',

	edit( { attributes, setAttributes } ) {
		const { postsPerPage, layout } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Recent Posts Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Number of posts', 'snow-monkey-blocks' ) }
							value={ postsPerPage }
							onChange={ ( value ) => setAttributes( { postsPerPage: value } ) }
							min="1"
							max="12"
						/>

						<SelectControl
							label={ __( 'Layout', 'snow-monkey-blocks' ) }
							value={ layout }
							onChange={ ( value ) => setAttributes( { layout: value } ) }
							options={ [
								{
									value: 'rich-media',
									label: __( 'Rich media', 'snow-monkey-blocks' ),
								},
								{
									value: 'simple',
									label: __( 'Simple', 'snow-monkey-blocks' ),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>

				<ServerSideRender
					block="snow-monkey-blocks/recent-posts"
					attributes={ attributes }
				/>
			</Fragment>
		);
	},

	save() {
		return null;
	},
} );
