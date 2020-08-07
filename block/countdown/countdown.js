export function apply( countdownNode ) {
	const dataTime = countdownNode.getAttribute( 'data-time' );
	if ( undefined === dataTime ) {
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

	const getTimeDiff = ( dist, src ) => {
		return new Date( dist ).getTime() - new Date( src ).getTime();
	};

	const sanitizeDiff = ( diff ) => {
		return isNaN( diff ) || 0 > diff ? 0 : diff;
	};

	const getDaysDiff = ( currentTime ) => {
		const timeDiff = getTimeDiff( dataTime, currentTime );
		const diff = Math.floor( timeDiff / ( 1000 * 60 * 60 * 24 ) );
		return sanitizeDiff( diff );
	};

	const getHoursDiff = ( currentTime ) => {
		const timeDiff = getTimeDiff( dataTime, currentTime );
		const diff = Math.floor( ( timeDiff / ( 1000 * 60 * 60 ) ) % 24 );
		return sanitizeDiff( diff );
	};

	const getMinutesDiff = ( currentTime ) => {
		const timeDiff = getTimeDiff( dataTime, currentTime );
		const diff = Math.floor( ( timeDiff / ( 1000 * 60 ) ) % 60 );
		return sanitizeDiff( diff );
	};

	const getSecondsDiff = ( currentTime ) => {
		const timeDiff = getTimeDiff( dataTime, currentTime );
		const diff = Math.floor( ( timeDiff / 1000 ) % 60 );
		return sanitizeDiff( diff );
	};

	const countdown = () => {
		const currentTime = Date.now();
		const daysDiff = getDaysDiff( currentTime );
		const hoursDiff = getHoursDiff( currentTime );
		const minutesDiff = getMinutesDiff( currentTime );
		const secondsDiff = getSecondsDiff( currentTime );

		day.innerText = daysDiff;
		hour.innerText = ( '00' + hoursDiff ).slice( -2 );
		minute.innerText = ( '00' + minutesDiff ).slice( -2 );
		second.innerText = ( '00' + secondsDiff ).slice( -2 );
	};

	setInterval( countdown, 1000 );
}
