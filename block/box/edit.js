'use strict';

import classnames from 'classnames';
import { toNumber } from '../../src/js/helper/helper';

import {
	PanelBody,
	RangeControl,
} from '@wordpress/components';

import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
} from '@wordpress/editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const { backgroundColor, borderColor, textColor, borderWidth } = attributes;

	const boxStyles = {
		backgroundColor: backgroundColor || undefined,
		borderColor: borderColor || undefined,
		color: textColor || undefined,
		borderWidth: borderWidth || undefined,
	};

	const classes = classnames( 'smb-box', className );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<RangeControl
						label={ __( 'Border width', 'snow-monkey-blocks' ) }
						value={ borderWidth }
						onChange={ ( value ) => setAttributes( { borderWidth: toNumber( value, 1, 5 ) } ) }
						min="1"
						max="5"
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor,
							onChange: ( value ) => setAttributes( { backgroundColor: value } ),
							label: __( 'Background Color', 'snow-monkey-blocks' ),
						},
						{
							value: borderColor,
							onChange: ( value ) => setAttributes( { borderColor: value } ),
							label: __( 'Border Color', 'snow-monkey-blocks' ),
						},
						{
							value: textColor,
							onChange: ( value ) => setAttributes( { textColor: value } ),
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorSettings>
			</InspectorControls>

			<div className={ classes } style={ boxStyles }>
				<div className="smb-box__body">
					<InnerBlocks />
				</div>
			</div>
		</Fragment>
	);
}
