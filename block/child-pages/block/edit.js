'use strict';

import { Dashicon, PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function( { attributes, setAttributes } ) {
	const { title } = attributes;

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<TextControl
						label={ __( 'Title', 'snow-monkey-blocks' ) }
						value={ title }
						placeholder={ __(
							'Child pages',
							'snow-monkey-blocks'
						) }
						onChange={ onChangeTitle }
					/>
				</PanelBody>
			</InspectorControls>

			<div className="components-placeholder">
				<div className="components-placeholder__label">
					<Dashicon icon="screenoptions" />
					{ __( 'Child pages', 'snow-monkey-blocks' ) }
				</div>
				<div className="components-placeholder__instructions">
					{ __(
						'In the actual screen, it is displayed when the page have child pages.',
						'snow-monkey-blocks'
					) }
				</div>
			</div>
		</>
	);
}
