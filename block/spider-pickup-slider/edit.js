import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	Placeholder,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

export default function ( { attributes, setAttributes } ) {
	const { random, postsPerPage, interval } = attributes;

	const onChangeRandom = ( value ) =>
		setAttributes( {
			random: value,
		} );

	const onChangePostsPerPage = ( value ) =>
		setAttributes( {
			postsPerPage: toNumber( value, 0, 10 ),
		} );

	const onChangeInterval = ( value ) =>
		setAttributes( {
			interval: toNumber( value, 0, 10 ),
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
						onChange={ onChangeRandom }
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
						onChange={ onChangeInterval }
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
