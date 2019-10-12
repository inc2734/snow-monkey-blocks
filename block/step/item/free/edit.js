'use strict';

import classnames from 'classnames';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	InnerBlocks,
} from '@wordpress/editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const { title, numberColor } = attributes;

	const classes = classnames(
		'smb-step__item',
		className
	);

	const itemNumberStyles = {
		backgroundColor: numberColor || undefined,
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: numberColor,
							onChange: ( value ) => setAttributes( { numberColor: value } ),
							label: __( 'Number Color', 'snow-monkey-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-step__item__title">
					<div className="smb-step__item__number" style={ itemNumberStyles } />
					<span>
						<RichText
							placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
							value={ title }
							formattingControls={ [] }
							multiline={ false }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</span>
				</div>

				<div className="smb-step__item__body">
					<div className="smb-step__item__summary">
						<InnerBlocks />
					</div>
				</div>
			</div>
		</Fragment>
	);
}
