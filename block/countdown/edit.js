'use strict';

import classnames from 'classnames';

import {
	PanelBody,
	DateTimePicker,
} from '@wordpress/components';

import {
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const blockClasses = classnames( 'smb-countdown', className );

	const listClasses = classnames(
		'smb-countdown__list',
		{
			[ `align-${ attributes.alignment }` ]: !! attributes.alignment,
		}
	);

	const numericStyles = {
		color: attributes.numericColor || undefined,
	};

	const clockStyles = {
		color: attributes.clockColor || undefined,
	};

	return (
		<Fragment>
			<BlockControls>
				<AlignmentToolbar
					value={ attributes.alignment }
					onChange={ ( value ) => setAttributes( { alignment: value } ) }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<DateTimePicker
						currentDate={ attributes.countdownTime }
						onChange={ ( value ) => {
							setAttributes( { countdownTime: value } );
						} }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.numericColor,
							onChange: ( value ) => setAttributes( { numericColor: value } ),
							label: __( 'Numeric Color', 'snow-monkey-blocks' ),
						},
						{
							value: attributes.clockColor,
							onChange: ( value ) => setAttributes( { clockColor: value } ),
							label: __( 'Clock Color', 'snow-monkey-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
			<div className={ blockClasses }>

				<ul className={ listClasses } data-time={ attributes.countdownTime }>
					<li className="smb-countdown__list-item smb-countdown__list-item__days">
						<span className="smb-countdown__list-item__numeric" style={ numericStyles }>-</span><span className="smb-countdown__list-item__clock" style={ clockStyles }>{ __( 'Days', 'snow-monkey-blocks' ) }</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__hours">
						<span className="smb-countdown__list-item__numeric" style={ numericStyles }>--</span><span className="smb-countdown__list-item__clock" style={ clockStyles }>{ __( 'Hours', 'snow-monkey-blocks' ) }</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__minutes">
						<span className="smb-countdown__list-item__numeric" style={ numericStyles }>--</span><span className="smb-countdown__list-item__clock" style={ clockStyles }>{ __( 'Minutes', 'snow-monkey-blocks' ) }</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__seconds">
						<span className="smb-countdown__list-item__numeric" style={ numericStyles }>--</span><span className="smb-countdown__list-item__clock" style={ clockStyles }>{ __( 'Seconds', 'snow-monkey-blocks' ) }</span>
					</li>
				</ul>
			</div>
		</Fragment>
	);
}
