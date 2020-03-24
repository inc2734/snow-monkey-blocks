'use strict';

import moment from 'moment';

export function apply( countdownNode ) {
	const dataTime = countdownNode.getAttribute( 'data-time' );
	if ( undefined === dataTime ) {
		return;
	}

	const limitedTime = moment( dataTime );
	if ( undefined === limitedTime ) {
		return;
	}

	const day = countdownNode.querySelector(
		'.smb-countdown__list-item__days .smb-countdown__list-item__numeric'
	);

	const hour = countdownNode.querySelector(
		'.smb-countdown__list-item__hours .smb-countdown__list-item__numeric'
	);

	const minute = countdownNode.querySelector(
		'.smb-countdown__list-item__minutes .smb-countdown__list-item__numeric'
	);

	const second = countdownNode.querySelector(
		'.smb-countdown__list-item__seconds .smb-countdown__list-item__numeric'
	);

	const sanitizeDiff = ( diff ) => {
		return isNaN( diff ) || 0 > diff ? 0 : diff;
	};

	const setDaysDiff = ( currentTime ) => {
		const diff = Math.floor( limitedTime.diff( currentTime, 'days' ) );
		return sanitizeDiff( diff );
	};

	const setHoursDiff = ( currentTime ) => {
		const diff = Math.floor(
			limitedTime.diff( currentTime, 'hours' ) % 24
		);
		return sanitizeDiff( diff );
	};

	const setMinutesDiff = ( currentTime ) => {
		const diff = Math.floor(
			limitedTime.diff( currentTime, 'minutes' ) % 60
		);
		return sanitizeDiff( diff );
	};

	const setSecondsDiff = ( currentTime ) => {
		const diff = Math.floor(
			limitedTime.diff( currentTime, 'seconds' ) % 60
		);
		return sanitizeDiff( diff );
	};

	const countdown = () => {
		const currentTime = moment();
		const daysDiff = setDaysDiff( currentTime );
		const hoursDiff = setHoursDiff( currentTime );
		const minutesDiff = setMinutesDiff( currentTime );
		const secondsDiff = setSecondsDiff( currentTime );

		day.innerText = daysDiff;
		hour.innerText = ( '00' + hoursDiff ).slice( -2 );
		minute.innerText = ( '00' + minutesDiff ).slice( -2 );
		second.innerText = ( '00' + secondsDiff ).slice( -2 );
	};

	setInterval( countdown, 1000 );
}
