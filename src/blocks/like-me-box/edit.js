import {
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
	const { pageName } = attributes;

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
							pageName !== metadata.attributes.pageName.default
						}
						isShownByDefault
						label={ __(
							'Facebook page name',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								pageName: metadata.attributes.pageName.default,
							} )
						}
					>
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __(
								'Facebook page name',
								'snow-monkey-blocks'
							) }
							value={ pageName }
							onChange={ ( value ) =>
								setAttributes( {
									pageName: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...useBlockProps() }>
				{ ! pageName ? (
					<Placeholder
						icon="thumbs-up"
						label={ __( 'Like me box', 'snow-monkey-blocks' ) }
					>
						{ __(
							'Please input "Facebook page name"',
							'snow-monkey-blocks'
						) }
					</Placeholder>
				) : (
					<ServerSideRender
						block="snow-monkey-blocks/like-me-box"
						attributes={ attributes }
					/>
				) }
			</div>
		</>
	);
}
