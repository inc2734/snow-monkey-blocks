import { PanelBody, TextControl, Placeholder } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, setAttributes } ) {
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

			<Placeholder
				icon="screenoptions"
				label={ __( 'Child pages', 'snow-monkey-blocks' ) }
			>
				{ __(
					'In the actual screen, it is displayed when the page have child pages.',
					'snow-monkey-blocks'
				) }
			</Placeholder>
		</>
	);
}
