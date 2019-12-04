'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const { isSlim } = attributes;

	const classes = classnames( 'smb-container', 'c-container', className );

	const bodyClasses = classnames(
		'smb-container__body',
		{
			'u-slim-width': !! isSlim,
		}
	);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<ToggleControl
						label={ __( 'Make the content width slim', 'snow-monkey-blocks' ) }
						checked={ isSlim }
						onChange={ ( value ) => setAttributes( { isSlim: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div className={ bodyClasses }>
					<InnerBlocks />
				</div>
			</div>
		</Fragment>
	);
}
