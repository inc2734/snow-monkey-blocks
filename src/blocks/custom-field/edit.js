import {
	Disabled,
	Placeholder,
	TextControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

import metadata from './block.json';

export default function ( { attributes, setAttributes } ) {
	const { name } = attributes;

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							name !== metadata.attributes.name.default
						}
						isShownByDefault
						label={ __(
							'Custom field name',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								name: metadata.attributes.name.default,
							} )
						}
					>
						<TextControl
							label={ __(
								'Custom field name',
								'snow-monkey-blocks'
							) }
							value={ name }
							onChange={ ( value ) =>
								setAttributes( {
									name: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...useBlockProps() }>
				{ ! name ? (
					<Placeholder
						instructions={ __(
							'Specify a custom field name.',
							'snow-monkey-blocks'
						) }
					/>
				) : (
					<Disabled>
						<ServerSideRender
							block="snow-monkey-blocks/custom-field"
							attributes={ attributes }
						/>
					</Disabled>
				) }
			</div>
		</>
	);
}
