'use strict';

import classnames from 'classnames';

import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const { isSlim } = attributes;

	const classes = classnames( 'smb-container', 'c-container', className );

	const bodyClasses = classnames( 'smb-container__body', {
		'u-slim-width': !! isSlim,
	} );

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<ToggleControl
						label={ __(
							'Make the content width slim',
							'snow-monkey-blocks'
						) }
						checked={ isSlim }
						onChange={ onChangeIsSlim }
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div className={ bodyClasses }>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
