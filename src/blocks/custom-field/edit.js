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

import { useToolsPanelDropdownMenuProps } from '@smb/helper';

import metadata from './block.json';

export default function ( { attributes, setAttributes } ) {
	const { name } = attributes;

	const dropdownMenuProps = useToolsPanelDropdownMenuProps();

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
					dropdownMenuProps={ dropdownMenuProps }
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
							__next40pxDefaultSize
							__nextHasNoMarginBottom
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
