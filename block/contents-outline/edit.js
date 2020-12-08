import { compact, indexOf, remove, union } from 'lodash';

import { __ } from '@wordpress/i18n';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import {
	CheckboxControl,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';

export default function ( { attributes, setAttributes } ) {
	const {
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
			newHeadings = remove( newHeadings, ( value ) => heading !== value );
		}

		return compact( union( newHeadings ) ).join( ',' );
	};

	const blockProps = useBlockProps( {
		className: 'wpco-wrapper',
	} );

	const onChangeHeadings2 = ( isChecked ) =>
		setAttributes( {
			headings: _generateNewHeadings( isChecked, 'h2' ),
		} );

	const onChangeHeadings3 = ( isChecked ) =>
		setAttributes( {
			headings: _generateNewHeadings( isChecked, 'h3' ),
		} );

	const onChangeHeadings4 = ( isChecked ) =>
		setAttributes( {
			headings: _generateNewHeadings( isChecked, 'h4' ),
		} );

	const onChangeIncludesSectionTitle = ( value ) =>
		setAttributes( {
			includesSectionTitle: value,
		} );

	const onChangeIncludesSectionHeadings = ( value ) =>
		setAttributes( {
			includesSectionHeadings: value,
		} );

	const onChangeMoveToBefore1stHeading = ( value ) =>
		setAttributes( {
			moveToBefore1stHeading: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<CheckboxControl
						name="headings[]"
						value="h2"
						label={ __( 'Show h2', 'snow-monkey-blocks' ) }
						checked={
							-1 !== indexOf( headings.split( ',' ), 'h2' )
						}
						onChange={ onChangeHeadings2 }
					/>

					<CheckboxControl
						name="headings[]"
						value="h3"
						label={ __( 'Show h3', 'snow-monkey-blocks' ) }
						checked={
							-1 !== indexOf( headings.split( ',' ), 'h3' )
						}
						onChange={ onChangeHeadings3 }
					/>

					<CheckboxControl
						name="headings[]"
						value="h4"
						label={ __( 'Show h4', 'snow-monkey-blocks' ) }
						checked={
							-1 !== indexOf( headings.split( ',' ), 'h4' )
						}
						onChange={ onChangeHeadings4 }
					/>

					<CheckboxControl
						value={ true }
						label={ __(
							'Show section block titles',
							'snow-monkey-blocks'
						) }
						checked={ includesSectionTitle }
						onChange={ onChangeIncludesSectionTitle }
					/>

					<CheckboxControl
						value={ true }
						label={ __(
							'Show heading blocks in section blocks',
							'snow-monkey-blocks'
						) }
						checked={ includesSectionHeadings }
						onChange={ onChangeIncludesSectionHeadings }
					/>

					<ToggleControl
						label={ __(
							'Move to before 1st heading',
							'snow-monkey-blocks'
						) }
						checked={ moveToBefore1stHeading }
						onChange={ onChangeMoveToBefore1stHeading }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } aria-hidden="false">
				<div className="wpco">
					<h2 className="wpco__title">
						{ __( 'Contents outline', 'snow-monkey-blocks' ) }
					</h2>
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
