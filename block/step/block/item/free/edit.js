'use strict';

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	InnerBlocks,
} from '@wordpress/block-editor';

export default function( { attributes, setAttributes, className } ) {
	const { title, numberColor } = attributes;

	const classes = classnames( 'smb-step__item', className );

	const itemNumberStyles = {
		backgroundColor: numberColor || undefined,
	};

	const onChangeNumberColor = ( value ) =>
		setAttributes( {
			numberColor: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: numberColor,
							onChange: onChangeNumberColor,
							label: __( 'Number Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-step__item__title">
					<div
						className="smb-step__item__number"
						style={ itemNumberStyles }
					/>

					<RichText
						tagName="span"
						placeholder={ __(
							'Write title...',
							'snow-monkey-blocks'
						) }
						value={ title }
						multiline={ false }
						onChange={ onChangeTitle }
					/>
				</div>

				<div className="smb-step__item__body">
					<div className="smb-step__item__summary">
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);
}
