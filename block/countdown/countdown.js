'use strict';

import moment from 'moment';
import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class Countdown {
	constructor() {
		let daysDiff = 0;
		let hoursDiff = 0;
		let minutesDiff = 0;
		let secondsDiff = 0;

		const renderCountdownTimes = ( countdownNode ) => {
			countdownNode.querySelector( '.smb-countdown__list-item__days .smb-countdown__list-item__numeric' ).innerText = daysDiff;
			countdownNode.querySelector( '.smb-countdown__list-item__hours .smb-countdown__list-item__numeric' ).innerText = ( '00' + hoursDiff ).slice( -2 );
			countdownNode.querySelector( '.smb-countdown__list-item__minutes .smb-countdown__list-item__numeric' ).innerText = ( '00' + minutesDiff ).slice( -2 );
			countdownNode.querySelector( '.smb-countdown__list-item__seconds .smb-countdown__list-item__numeric' ).innerText = ( '00' + secondsDiff ).slice( -2 );
		};

		const countdownNodes = document.querySelectorAll( '.smb-countdown__list' );
		forEachHtmlNodes(
			countdownNodes,
			( countdownNode ) => {
				const dataTime = countdownNode.getAttribute( 'data-time' );
				if ( dataTime === undefined ) {
					renderCountdownTimes( countdownNode );
				}
				const countDownTime = moment( dataTime );
				if ( countDownTime === undefined ) {
					renderCountdownTimes( countdownNode );
				}
				setInterval( function() {
					const nowTime = moment();
					daysDiff = Math.floor( countDownTime.diff( nowTime, 'days' ) );
					if ( isNaN( daysDiff ) || daysDiff < 0 ) {
						daysDiff = 0;
					}
					hoursDiff = Math.floor( countDownTime.diff( nowTime, 'hours' ) % 24 );
					if ( isNaN( hoursDiff ) || hoursDiff < 0 ) {
						hoursDiff = 0;
					}
					minutesDiff = Math.floor( countDownTime.diff( nowTime, 'minutes' ) % 60 );
					if ( isNaN( minutesDiff ) || minutesDiff < 0 ) {
						minutesDiff = 0;
					}
					secondsDiff = Math.floor( countDownTime.diff( nowTime, 'seconds' ) % 60 );
					if ( isNaN( secondsDiff ) || secondsDiff < 0 ) {
						secondsDiff = 0;
					}
					renderCountdownTimes( countdownNode );
				}, 1000 );
			}
		);
	}
}
