'use strict';

import { remove, union, indexOf, compact } from 'lodash';

import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	CheckboxControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

export default function( { attributes, setAttributes } ) {
	const { headings, moveToBefore1stHeading, myAnchor } = attributes;

	const _generateNewHeadings = ( isChecked, heading ) => {
		let newHeadings = headings.split( ',' );

		if ( isChecked ) {
			newHeadings.push( heading );
		} else {
			newHeadings = remove( newHeadings, ( value ) => heading !== value );
		}

		return compact( union( newHeadings ) ).join( ',' );
	};

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

	const onChangeMoveToBefore1stHeading = ( value ) =>
		setAttributes( {
			moveToBefore1stHeading: value,
		} );

	const onChangeMyAnchor = ( value ) =>
		setAttributes( {
			myAnchor: value.replace( /[\s#]/g, '-' ),
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

			<InspectorAdvancedControls>
				<TextControl
					label={ __( 'HTML Anchor', 'snow-monkey-blocks' ) }
					help={ __(
						'Anchors lets you link directly to a section on a page.',
						'snow-monkey-blocks'
					) }
					value={ myAnchor || '' }
					onChange={ onChangeMyAnchor }
				/>
			</InspectorAdvancedControls>

			<div className="wpco-wrapper" aria-hidden="false">
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
