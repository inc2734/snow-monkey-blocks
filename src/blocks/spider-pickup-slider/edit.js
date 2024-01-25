import {
	RangeControl,
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
	const {
		random,
		postsPerPage,
		arrows,
		dots,
		dotsToThumbnail,
		fade,
		interval,
		autoplayButton,
	} = attributes;

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
						label={ __( 'Shuffle slides', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								random: metadata.attributes.random.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Shuffle slides',
								'snow-monkey-blocks'
							) }
							checked={ random }
							onChange={ ( value ) =>
								setAttributes( {
									random: value,
								} )
							}
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

					<ToolsPanelItem
						hasValue={ () =>
							arrows !== metadata.attributes.arrows.default
						}
						isShownByDefault
						label={ __( 'Display arrows', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								arrows: metadata.attributes.arrows.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Display arrows',
								'snow-monkey-blocks'
							) }
							checked={ arrows }
							onChange={ ( value ) =>
								setAttributes( {
									arrows: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							dots !== metadata.attributes.dots.default
						}
						isShownByDefault
						label={ __( 'Display dots', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								dots: metadata.attributes.dots.default,
							} )
						}
					>
						<ToggleControl
							label={ __( 'Display dots', 'snow-monkey-blocks' ) }
							checked={ dots }
							onChange={ ( value ) =>
								setAttributes( {
									dots: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ dots && (
						<ToolsPanelItem
							hasValue={ () =>
								dotsToThumbnail !==
								metadata.attributes.dotsToThumbnail.default
							}
							isShownByDefault
							label={ __(
								'Change dots to thumbnails',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									dotsToThumbnail:
										metadata.attributes.dotsToThumbnail
											.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Change dots to thumbnails',
									'snow-monkey-blocks'
								) }
								checked={ dotsToThumbnail }
								onChange={ ( value ) =>
									setAttributes( {
										dotsToThumbnail: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							fade !== metadata.attributes.fade.default
						}
						isShownByDefault
						label={ __( 'Fade', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								fade: metadata.attributes.fade.default,
							} )
						}
					>
						<ToggleControl
							label={ __( 'Fade', 'snow-monkey-blocks' ) }
							checked={ fade }
							onChange={ ( value ) =>
								setAttributes( {
									fade: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							interval !== metadata.attributes.interval.default
						}
						isShownByDefault
						label={ __(
							'Autoplay Speed in seconds',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								interval: metadata.attributes.interval.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Autoplay Speed in seconds',
								'snow-monkey-blocks'
							) }
							help={ __(
								'If "0", no scroll.',
								'snow-monkey-blocks'
							) }
							value={ interval }
							onChange={ ( value ) =>
								setAttributes( {
									interval: toNumber( value, 0, 10 ),
								} )
							}
							min="0"
							max="10"
						/>
					</ToolsPanelItem>

					{ 0 < interval && (
						<ToolsPanelItem
							hasValue={ () =>
								autoplayButton !==
								metadata.attributes.autoplayButton.default
							}
							isShownByDefault
							label={ __(
								'Autoplay Speed in seconds',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									autoplayButton:
										metadata.attributes.autoplayButton
											.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Display pause button for autoplay',
									'snow-monkey-blocks'
								) }
								checked={ autoplayButton }
								onChange={ ( value ) =>
									setAttributes( {
										autoplayButton: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }
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
