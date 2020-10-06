'use select';

import { Button, DateTimePicker } from '@wordpress/components';
import { __experimentalGetSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

export default function ( { currentDate, onChange, onReset } ) {
	// @see https://developer.wordpress.org/block-editor/components/date-time/#usage
	const settings = __experimentalGetSettings();
	const is12HourTime = /a(?!\\)/i.test(
		settings.formats.time
			.toLowerCase()
			.replace( /\\\\/g, '' )
			.split( '' )
			.reverse()
			.join( '' )
	);

	return (
		<div className="smb-date-time-picker">
			<DateTimePicker
				currentDate={ currentDate }
				onChange={ onChange }
				is12Hour={ is12HourTime }
			/>

			<div className="smb-date-time-picker__action">
				<div>{ currentDate }</div>
				<Button isSmall onClick={ onReset }>
					{ __( 'Clear', 'snow-monkey-editor' ) }
				</Button>
			</div>
		</div>
	);
}
