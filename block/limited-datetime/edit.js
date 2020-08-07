import classnames from 'classnames';
import moment from 'moment';

import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	BaseControl,
	CheckboxControl,
	Placeholder,
} from '@wordpress/components';

import DateTimePicker from '../../src/js/component/date-time-picker';

export default function( { attributes, setAttributes, className } ) {
	const { isUseStartDate, startDate, isUseEndDate, endDate } = attributes;

	const classes = classnames( 'smb-limited-datetime', className );

	let formatedStartDate = __( 'Not been set.', 'snow-monkey-blocks' );
	if ( isUseStartDate ) {
		if ( startDate !== null ) {
			formatedStartDate = moment( startDate ).format(
				'YYYY/MM/DD ddd HH:mm'
			);
		} else {
			formatedStartDate = __(
				'Not initialized properly.',
				'snow-monkey-blocks'
			);
		}
	}

	let formatedEndDate = __( 'Not been set.', 'snow-monkey-blocks' );
	if ( isUseEndDate ) {
		if ( endDate !== null ) {
			formatedEndDate = moment( endDate ).format(
				'YYYY/MM/DD ddd HH:mm'
			);
		} else {
			formatedEndDate = __(
				'Not initialized properly.',
				'snow-monkey-blocks'
			);
		}
	}

	const onChangeIsUseStartDate = ( value ) =>
		setAttributes( {
			isUseStartDate: value,
		} );

	const onChangeStartDate = ( value ) =>
		setAttributes( {
			startDate: value,
		} );

	const onResetStartDate = () => setAttributes( { startDate: null } );

	const onChangeIsUseEndDate = ( value ) =>
		setAttributes( {
			isUseEndDate: value,
		} );

	const onChangeEndDate = ( value ) =>
		setAttributes( {
			endDate: value,
		} );

	const onResetEndDate = () => setAttributes( { startDate: null } );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Start datetime', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/limited-datetime/is-use-start-date"
					>
						<CheckboxControl
							label={ __(
								'Use start datetime',
								'snow-monkey-blocks'
							) }
							checked={ isUseStartDate }
							onChange={ onChangeIsUseStartDate }
						/>
						<DateTimePicker
							currentDate={ startDate }
							onChange={ onChangeStartDate }
							onReset={ onResetStartDate }
						/>
					</BaseControl>
					<BaseControl
						label={ __( 'End datetime', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/limited-datetime/is-use-end-date"
					>
						<CheckboxControl
							label={ __(
								'Use end datetime',
								'snow-monkey-blocks'
							) }
							checked={ isUseEndDate }
							onChange={ onChangeIsUseEndDate }
						/>
						<DateTimePicker
							currentDate={ endDate }
							onChange={ onChangeEndDate }
							onReset={ onResetEndDate }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<Placeholder
					className="smb-limited-datetime__placeholder"
					icon="calendar-alt"
					label={ __(
						'Only the set period is displayed',
						'snow-monkey-blocks'
					) }
				>
					<div className="c-row c-row--lg-margin">
						<div className="c-row__col c-row__col--1-1 c-row__col--lg-1-2">
							<dl>
								<dt>
									{ __(
										'Start datetime',
										'snow-monkey-blocks'
									) }
								</dt>
								<dd>{ formatedStartDate }</dd>
							</dl>
						</div>
						<div className="c-row__col c-row__col--1-1 c-row__col--lg-1-2">
							<dl>
								<dt>
									{ __(
										'End datetime',
										'snow-monkey-blocks'
									) }
								</dt>
								<dd>{ formatedEndDate }</dd>
							</dl>
						</div>
					</div>
				</Placeholder>
				<InnerBlocks />
			</div>
		</>
	);
}
