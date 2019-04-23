'use strict';

import classnames from 'classnames';
import moment from 'moment';
import { schema } from './_schema.js';

const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, BaseControl, DateTimePicker, CheckboxControl, Placeholder } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/limited-datetime', {
	title: __( 'Limited DateTime', 'snow-monkey-blocks' ),
	description: __( 'Only the set period is displayed', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#bd3c4f',
		src: 'calendar-alt',
	},
	category: 'smb',
	attributes: schema,
	supports: {
		alignWide: false,
		customClassName: false,
		className: false,
	},

	edit( { attributes, setAttributes, className } ) {
		const { isUseStartDate, startDate, isUseEndDate, endDate } = attributes;

		const classes = classnames( 'smb-limited-datetime', className );

		let formatedStartDate = __( 'Not been set.', 'snow-monkey-blocks' );
		if ( isUseStartDate ) {
			if ( startDate !== null ) {
				formatedStartDate = moment( startDate ).format( 'YYYY/MM/DD ddd HH:mm' );
			} else {
				formatedStartDate = __( 'Not initialized properly.', 'snow-monkey-blocks' );
			}
		}

		let formatedEndDate = __( 'Not been set.', 'snow-monkey-blocks' );
		if ( isUseEndDate ) {
			if ( endDate !== null ) {
				formatedEndDate = moment( endDate ).format( 'YYYY/MM/DD ddd HH:mm' );
			} else {
				formatedEndDate = __( 'Not initialized properly.', 'snow-monkey-blocks' );
			}
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Datetime setting', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Start datetime', 'snow-monkey-blocks' ) }>
							<CheckboxControl
								label={ __( 'Use start datetime', 'snow-monkey-blocks' ) }
								checked={ isUseStartDate }
								onChange={ ( value ) => setAttributes( { isUseStartDate: value } ) }
							/>
							<DateTimePicker
								currentDate={ startDate }
								onChange={ ( value ) => setAttributes( { startDate: value } ) }
							/>
						</BaseControl>
						<BaseControl label={ __( 'End datetime', 'snow-monkey-blocks' ) }>
							<CheckboxControl
								label={ __( 'Use end datetime', 'snow-monkey-blocks' ) }
								checked={ isUseEndDate }
								onChange={ ( value ) => setAttributes( { isUseEndDate: value } ) }
							/>
							<DateTimePicker
								currentDate={ endDate }
								onChange={ ( value ) => setAttributes( { endDate: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<Placeholder
						className="smb-limited-datetime__placeholder"
						icon="calendar-alt"
						label={ __( 'Only the set period is displayed', 'snow-monkey-blocks' ) }
					>
						<div className="c-row c-row--lg-margin">
							<div className="c-row__col c-row__col--1-1 c-row__col--lg-1-2">
								<dl>
									<dt>{ __( 'Start datetime', 'snow-monkey-blocks' ) }</dt>
									<dd>{ formatedStartDate }</dd>
								</dl>
							</div>
							<div className="c-row__col c-row__col--1-1 c-row__col--lg-1-2">
								<dl>
									<dt>{ __( 'End datetime', 'snow-monkey-blocks' ) }</dt>
									<dd>{ formatedEndDate }</dd>
								</dl>
							</div>
						</div>
					</Placeholder>
					<InnerBlocks />
				</div>
			</Fragment>
		);
	},

	save() {
		return (
			<InnerBlocks.Content />
		);
	},
} );
