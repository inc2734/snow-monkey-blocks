'use strict';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

import { InspectorControls } from '@wordpress/block-editor';

import {
	BaseControl,
	PanelBody,
	SelectControl,
	Placeholder,
	Spinner,
} from '@wordpress/components';

export default function( { attributes, setAttributes } ) {
	const { taxonomy, orderby, order } = attributes;

	const { taxonomies } = useSelect( ( select ) => {
		const { getTaxonomies } = select( 'core' );
		const allTaxonomies = getTaxonomies( { per_page: -1 } ) || [];
		const shownTaxonomies = allTaxonomies.filter(
			( _taxonomy ) => _taxonomy.visibility.show_ui
		);

		return {
			taxonomies: shownTaxonomies,
		};
	}, [] );

	const taxonomyOptions = taxonomies.map( ( _taxonomy ) => {
		return {
			value: _taxonomy.slug,
			label: _taxonomy.name,
		};
	} );

	const onChangeTaxonomy = ( value ) =>
		setAttributes( {
			taxonomy: value,
		} );

	const onChangeOrderby = ( value ) =>
		setAttributes( {
			orderby: value,
		} );

	const onChangeOrder = ( value ) =>
		setAttributes( {
			order: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					{ ! taxonomies.length ? (
						<BaseControl
							label={ __(
								'Loading taxonomies…',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/taxonomy-terms/taxonomies"
						>
							<Spinner />
						</BaseControl>
					) : (
						<SelectControl
							label={ __( 'Taxonomy', 'snow-monkey-blocks' ) }
							value={ taxonomy }
							onChange={ onChangeTaxonomy }
							options={ taxonomyOptions }
						/>
					) }

					<SelectControl
						label={ __( 'orderby', 'snow-monkey-blocks' ) }
						value={ orderby }
						options={ [
							{
								label: __(
									'category id',
									'snow-monkey-blocks'
								),
								value: 'id',
							},
							{
								label: __(
									'category name',
									'snow-monkey-blocks'
								),
								value: 'name',
							},
							{
								label: __(
									'category slug',
									'snow-monkey-blocks'
								),
								value: 'slug',
							},
							{
								label: __(
									'category post count',
									'snow-monkey-blocks'
								),
								value: 'count',
							},
						] }
						onChange={ onChangeOrderby }
					/>

					<SelectControl
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
						onChange={ onChangeOrder }
					/>
				</PanelBody>
			</InspectorControls>

			{ ! taxonomies.length ? (
				<Placeholder
					icon="editor-ul"
					label={ __( 'Taxonomy terms', 'snow-monkey-blocks' ) }
				>
					<Spinner />
				</Placeholder>
			) : (
				<ServerSideRender
					block="snow-monkey-blocks/taxonomy-terms"
					attributes={ attributes }
					className="components-disabled"
				/>
			) }
		</>
	);
}
