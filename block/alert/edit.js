'use strict';

import classnames from 'classnames';
import FontAwesome from '../../src/js/component/font-awesome';

import {
	times,
} from 'lodash';

import {
	PanelBody,
	SelectControl,
	BaseControl,
	Button,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
} from '@wordpress/editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, isSelected, className } ) {
	const { title, content, modifier, icon } = attributes;

	const iconList = [
		{
			value: 'exclamation-circle',
			label: __( 'exclamation-circle', 'snow-monkey-blocks' ),
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
			value: 'hand-point-right',
			label: __( 'hand-point-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'edit',
			label: __( 'edit', 'snow-monkey-blocks' ),
		},
		{
			value: 'lightbulb',
			label: __( 'lightbulb', 'snow-monkey-blocks' ),
		},
	];

	const classes = classnames(
		'smb-alert',
		{
			[ className ]: !! className,
			[ `smb-alert--${ modifier }` ]: !! modifier,
		}
	);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<SelectControl
						label={ __( 'Type', 'snow-monkey-blocks' ) }
						value={ modifier }
						onChange={ ( value ) => setAttributes( { modifier: value } ) }
						options={ [
							{
								value: '',
								label: __( 'Normal alert', 'snow-monkey-blocks' ),
							},
							{
								value: 'warning',
								label: __( 'Warning alert', 'snow-monkey-blocks' ),
							},
							{
								value: 'success',
								label: __( 'Success alert', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<BaseControl label={ __( 'Icon', 'snow-monkey-blocks' ) }>
						<div className="smb-list-icon-selector">
							{ times( iconList.length, ( index ) => {
								return (
									<Button
										isDefault
										isPrimary={ icon === iconList[ index ].value }
										onClick={ () => setAttributes( { icon: iconList[ index ].value } ) }
									>
										<i className={ `fas fa-${ iconList[ index ].value }` } title={ iconList[ index ].label } />
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				{ ( ! RichText.isEmpty( title ) || isSelected ) &&
					<div className="smb-alert__title">
						<FontAwesome icon={ icon } />

						<strong>
							<RichText
								multiline={ false }
								value={ title }
								placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
								onChange={ ( value ) => setAttributes( { title: value } ) }
							/>
						</strong>
					</div>
				}

				<RichText
					className="smb-alert__body"
					multiline="p"
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
				/>
			</div>
		</Fragment>
	);
}
