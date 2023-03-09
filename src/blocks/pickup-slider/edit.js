import {
	RangeControl,
	SelectControl,
	ToggleControl,
	Placeholder,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

import metadata from './block.json';

export default function ( { attributes, setAttributes } ) {
	const { random, linkType, postsPerPage } = attributes;

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							random !== metadata.attributes.random.default
						}
						isShownByDefault
						label={ __(
							'Display in random order',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								random: metadata.attributes.random.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Display in random order',
								'snow-monkey-blocks'
							) }
							checked={ random }
							onChange={ ( value ) =>
								setAttributes( { random: value } )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							linkType !== metadata.attributes.linkType.default
						}
						isShownByDefault
						label={ __( 'Link type', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								linkType: metadata.attributes.linkType.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Link type', 'snow-monkey-blocks' ) }
							value={ linkType }
							onChange={ ( value ) =>
								setAttributes( {
									linkType: value,
								} )
							}
							options={ [
								{
									value: 'button',
									label: __(
										'Button link',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'overall',
									label: __(
										'Overall link',
										'snow-monkey-blocks'
									),
								},
							] }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							postsPerPage !==
							metadata.attributes.postsPerPage.default
						}
						isShownByDefault
						label={ __(
							'Maximum number of displays',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								postsPerPage:
									metadata.attributes.postsPerPage.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Maximum number of displays',
								'snow-monkey-blocks'
							) }
							help={ __(
								'If "0", all items are displayed.',
								'snow-monkey-blocks'
							) }
							value={ postsPerPage }
							onChange={ ( value ) =>
								setAttributes( {
									postsPerPage: toNumber( value, 0, 10 ),
								} )
							}
							min="0"
							max="10"
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<Placeholder
					icon="format-gallery"
					label={ __( 'Pickup slider', 'snow-monkey-blocks' ) }
				>
					{ __(
						'Posts with "pickup" tag are displayed as sliders.',
						'snow-monkey-blocks'
					) }
				</Placeholder>
			</div>
		</>
	);
}
