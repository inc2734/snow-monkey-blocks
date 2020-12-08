import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Placeholder,
} from '@wordpress/components';

import { toNumber } from '@smb/helper';

export default function ( { attributes, setAttributes } ) {
	const { random, linkType, postsPerPage } = attributes;

	const onChangeLinkType = ( value ) =>
		setAttributes( {
			linkType: value,
		} );

	const onChangePostsPerPage = ( value ) =>
		setAttributes( {
			postsPerPage: toNumber( value, 0, 10 ),
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
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

					<SelectControl
						label={ __( 'Link type', 'snow-monkey-blocks' ) }
						value={ linkType }
						onChange={ onChangeLinkType }
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
						onChange={ onChangePostsPerPage }
						min="0"
						max="10"
					/>
				</PanelBody>
			</InspectorControls>

			<Placeholder
				icon="format-gallery"
				label={ __( 'Pickup slider', 'snow-monkey-blocks' ) }
			>
				{ __(
					'Posts with "pickup" tag are displayed as sliders.',
					'snow-monkey-blocks'
				) }
			</Placeholder>
		</>
	);
}
