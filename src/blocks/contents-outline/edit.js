import { indexOf } from 'lodash';

import {
	InspectorControls,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';

import {
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalVStack as VStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { useToolsPanelDropdownMenuProps } from '@smb/helper';

import metadata from './block.json';

export default function ( { attributes, setAttributes } ) {
	const {
		title,
		headings,
		moveToBefore1stHeading,
		includesSectionTitle,
		includesSectionHeadings,
	} = attributes;

	const _generateNewHeadings = ( isChecked, heading ) => {
		let newHeadings = headings.split( ',' );

		if ( isChecked ) {
			newHeadings.push( heading );
		} else {
			newHeadings = newHeadings.filter( ( value ) => heading !== value );
		}

		return newHeadings.filter( Boolean ).join( ',' );
	};

	const blockProps = useBlockProps( {
		className: 'wpco-wrapper smb-contents-outline',
	} );

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
							headings !== metadata.attributes.headings.default
						}
						isShownByDefault
						label={ __( 'Headings', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								headings: metadata.attributes.headings.default,
							} )
						}
					>
						<VStack spacing="16px">
							<ToggleControl
								__nextHasNoMarginBottom
								name="headings[]"
								value="h2"
								label={ __( 'Show h2', 'snow-monkey-blocks' ) }
								checked={
									-1 !==
									indexOf( headings.split( ',' ), 'h2' )
								}
								onChange={ ( isChecked ) =>
									setAttributes( {
										headings: _generateNewHeadings(
											isChecked,
											'h2'
										),
									} )
								}
							/>

							<ToggleControl
								__nextHasNoMarginBottom
								name="headings[]"
								value="h3"
								label={ __( 'Show h3', 'snow-monkey-blocks' ) }
								checked={
									-1 !==
									indexOf( headings.split( ',' ), 'h3' )
								}
								onChange={ ( isChecked ) =>
									setAttributes( {
										headings: _generateNewHeadings(
											isChecked,
											'h3'
										),
									} )
								}
							/>

							<ToggleControl
								__nextHasNoMarginBottom
								name="headings[]"
								value="h4"
								label={ __( 'Show h4', 'snow-monkey-blocks' ) }
								checked={
									-1 !==
									indexOf( headings.split( ',' ), 'h4' )
								}
								onChange={ ( isChecked ) =>
									setAttributes( {
										headings: _generateNewHeadings(
											isChecked,
											'h4'
										),
									} )
								}
							/>
						</VStack>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							includesSectionTitle !==
							metadata.attributes.includesSectionTitle.default
						}
						isShownByDefault
						label={ __(
							'Show section block titles',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								includesSectionTitle:
									metadata.attributes.includesSectionTitle
										.default,
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							value={ true }
							label={ __(
								'Show section block titles',
								'snow-monkey-blocks'
							) }
							checked={ includesSectionTitle }
							onChange={ ( value ) =>
								setAttributes( {
									includesSectionTitle: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							includesSectionHeadings !==
							metadata.attributes.includesSectionHeadings.default
						}
						isShownByDefault
						label={ __(
							'Show heading blocks in section blocks',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								includesSectionHeadings:
									metadata.attributes.includesSectionHeadings
										.default,
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							value={ true }
							label={ __(
								'Show heading blocks in section blocks',
								'snow-monkey-blocks'
							) }
							checked={ includesSectionHeadings }
							onChange={ ( value ) =>
								setAttributes( {
									includesSectionHeadings: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							moveToBefore1stHeading !==
							metadata.attributes.moveToBefore1stHeading.default
						}
						isShownByDefault
						label={ __(
							'Move to before 1st heading',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								moveToBefore1stHeading:
									metadata.attributes.moveToBefore1stHeading
										.default,
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __(
								'Move to before 1st heading',
								'snow-monkey-blocks'
							) }
							checked={ moveToBefore1stHeading }
							onChange={ ( value ) =>
								setAttributes( {
									moveToBefore1stHeading: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps } aria-hidden="false">
				<div className="wpco">
					<RichText
						tagName="h2"
						className="wpco__title"
						value={ title }
						placeholder={ __(
							'Contents outline',
							'snow-monkey-blocks'
						) }
						onChange={ ( value ) =>
							setAttributes( {
								title:
									value ||
									__(
										'Contents outline',
										'snow-monkey-blocks'
									),
							} )
						}
						allowedFormats={ [] }
					/>
					<div className="contents-outline">
						<ol>
							<li>
								{ __(
									'In the actual screen, it is displayed when headings exists on the page.',
									'snow-monkey-blocks'
								) }
							</li>
						</ol>
					</div>
				</div>
			</div>
		</>
	);
}
