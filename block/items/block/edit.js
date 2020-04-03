'use strict';

import classnames from 'classnames';

import { PanelBody, RangeControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { toNumber } from '../../../src/js/helper/helper';
import ResponsiveTabPanel from '../../../src/js/component/responsive-tab-panel';

export default function( { attributes, setAttributes, className } ) {
	const { sm, md, lg } = attributes;

	const allowedBlocks = [
		'snow-monkey-blocks/items--item--standard',
		'snow-monkey-blocks/items--item--block-link',
		'snow-monkey-blocks/items--banner',
	];
	const template = [ [ 'snow-monkey-blocks/items--item--standard' ] ];

	const classes = classnames( 'smb-items', className );

	const onChangeLg = ( value ) =>
		setAttributes( {
			lg: toNumber( value, 1, 6 ),
		} );

	const onChangeMd = ( value ) =>
		setAttributes( {
			md: toNumber( value, 1, 6 ),
		} );

	const onChangeSm = ( value ) =>
		setAttributes( {
			sm: toNumber( value, 1, 6 ),
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<ResponsiveTabPanel
						desktop={ () => (
							<RangeControl
								label={ __(
									'Columns per row (Large window)',
									'snow-monkey-blocks'
								) }
								value={ lg }
								onChange={ onChangeLg }
								min="1"
								max="6"
							/>
						) }
						tablet={ () => (
							<RangeControl
								label={ __(
									'Columns per row (Medium window)',
									'snow-monkey-blocks'
								) }
								value={ md }
								onChange={ onChangeMd }
								min="1"
								max="6"
							/>
						) }
						mobile={ () => (
							<RangeControl
								label={ __(
									'Columns per row (Small window)',
									'snow-monkey-blocks'
								) }
								value={ sm }
								onChange={ onChangeSm }
								min="1"
								max="6"
							/>
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div
					className="c-row c-row--margin"
					data-columns={ sm }
					data-md-columns={ md }
					data-lg-columns={ lg }
				>
					<InnerBlocks
						allowedBlocks={ allowedBlocks }
						template={ template }
						templateLock={ false }
					/>
				</div>
			</div>
		</>
	);
}
