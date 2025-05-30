import {
	BaseControl,
	Disabled,
	Placeholder,
	SelectControl,
	ToggleControl,
	Spinner,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import ServerSideRender from '@wordpress/server-side-render';

import { useToolsPanelDropdownMenuProps } from '@smb/helper';

import metadata from './block.json';

const EMPTY_ARRAY = [];

export default function ( { attributes, setAttributes } ) {
	const { taxonomy, orderby, order, displayCount } = attributes;

	const dropdownMenuProps = useToolsPanelDropdownMenuProps();

	const { allTaxonomies } = useSelect( ( select ) => {
		const { getTaxonomies } = select( 'core' );

		return {
			allTaxonomies: getTaxonomies( { per_page: -1 } ) || EMPTY_ARRAY,
		};
	}, [] );

	const taxonomies = useMemo( () => {
		return allTaxonomies.filter(
			( _taxonomy ) => _taxonomy.visibility.show_ui
		);
	}, [ allTaxonomies ] );

	const taxonomyOptions = taxonomies.map( ( _taxonomy ) => {
		return {
			value: _taxonomy.slug,
			label: _taxonomy.name,
		};
	} );
	taxonomyOptions.unshift( {
		value: null,
		label: '-',
	} );

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
					dropdownMenuProps={ dropdownMenuProps }
				>
					{ ! taxonomies.length ? (
						<div style={ { gridColumn: '1/-1' } }>
							<BaseControl
								__nextHasNoMarginBottom
								label={ __(
									'Loading taxonomies…',
									'snow-monkey-blocks'
								) }
								id="snow-monkey-blocks/taxonomy-terms/taxonomies"
							>
								<Spinner />
							</BaseControl>
						</div>
					) : (
						<ToolsPanelItem
							hasValue={ () =>
								taxonomy !==
								metadata.attributes.taxonomy.default
							}
							isShownByDefault
							label={ __( 'Taxonomy', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setAttributes( {
									taxonomy:
										metadata.attributes.taxonomy.default,
								} )
							}
						>
							<SelectControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Taxonomy', 'snow-monkey-blocks' ) }
								value={ taxonomy }
								onChange={ ( value ) =>
									setAttributes( {
										taxonomy: value,
									} )
								}
								options={ taxonomyOptions }
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							orderby !== metadata.attributes.orderby.default
						}
						isShownByDefault
						label={ __( 'orderby', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								orderby: metadata.attributes.orderby.default,
							} )
						}
					>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __( 'orderby', 'snow-monkey-blocks' ) }
							value={ orderby }
							options={ [
								{
									label: __(
										'Category id',
										'snow-monkey-blocks'
									),
									value: 'id',
								},
								{
									label: __(
										'Category name',
										'snow-monkey-blocks'
									),
									value: 'name',
								},
								{
									label: __(
										'Category slug',
										'snow-monkey-blocks'
									),
									value: 'slug',
								},
								{
									label: __(
										'Category post count',
										'snow-monkey-blocks'
									),
									value: 'count',
								},
								{
									label: __(
										'Category description',
										'snow-monkey-blocks'
									),
									value: 'description',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									orderby: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							order !== metadata.attributes.order.default
						}
						isShownByDefault
						label={ __( 'order', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								order: metadata.attributes.order.default,
							} )
						}
					>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __( 'order', 'snow-monkey-blocks' ) }
							value={ order }
							options={ [
								{
									label: __( 'asc', 'snow-monkey-blocks' ),
									value: 'asc',
								},
								{
									label: __( 'desc', 'snow-monkey-blocks' ),
									value: 'desc',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									order: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							displayCount !==
							metadata.attributes.displayCount.default
						}
						isShownByDefault
						label={ __( 'Display count', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								displayCount:
									metadata.attributes.displayCount.default,
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __(
								'Display count',
								'snow-monkey-blocks'
							) }
							checked={ displayCount }
							onChange={ ( value ) =>
								setAttributes( {
									displayCount: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...useBlockProps() }>
				{ ! taxonomies.length ? (
					<Placeholder
						icon="tag"
						label={ __( 'Taxonomy', 'snow-monkey-blocks' ) }
					>
						<Spinner />
					</Placeholder>
				) : (
					<Disabled>
						<ServerSideRender
							block="snow-monkey-blocks/taxonomy-terms"
							attributes={ attributes }
						/>
					</Disabled>
				) }
			</div>
		</>
	);
}
