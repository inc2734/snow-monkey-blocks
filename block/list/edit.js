'use strict';

import classnames from 'classnames';

import {
	times,
} from 'lodash';

import {
	PanelBody,
	BaseControl,
	Button,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const { content, icon, iconColor } = attributes;

	const iconList = [
		{
			value: 'angle-right',
			label: __( 'angle-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'angle-double-right',
			label: __( 'angle-double-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'arrow-alt-circle-right',
			label: __( 'arrow-alt-circle-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'arrow-right',
			label: __( 'arrow-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'check',
			label: __( 'check', 'snow-monkey-blocks' ),
		},
		{
			value: 'check-circle',
			label: __( 'check-circle', 'snow-monkey-blocks' ),
		},
		{
			value: 'check-square',
			label: __( 'check-square', 'snow-monkey-blocks' ),
		},
		{
			value: 'chevron-circle-right',
			label: __( 'chevron-circle-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'hand-point-right',
			label: __( 'hand-point-right', 'snow-monkey-blocks' ),
		},
	];

	const classes = classnames( 'smb-list', className );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<BaseControl label={ __( 'Icon', 'snow-monkey-blocks' ) }>
						<div className="smb-list-icon-selector">
							{ times( iconList.length, ( index ) => {
								const value = iconList[ index ].value;

								return (
									<Button
										isDefault
										isPrimary={ icon === value }
										onClick={ () => setAttributes( { icon: value } ) }
									>
										<i className={ `fas fa-${ iconList[ index ].value }` } title={ iconList[ index ].label } />
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: iconColor,
							onChange: ( value ) => setAttributes( { iconColor: value } ),
							label: __( 'Icon Color', 'snow-monkey-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>

			<div className={ classes } data-icon={ icon } data-icon-color={ iconColor }>
				<RichText
					tagName="ul"
					multiline="li"
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
				/>
			</div>
		</Fragment>
	);
}
