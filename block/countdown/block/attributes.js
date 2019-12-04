'use strict';

import moment from 'moment';

const now = moment();
const nowTime = moment( {
	y: now.year(),
	M: now.month(),
	d: now.date(),
	h: now.hours(),
	m: now.minutes(),
	s: 0,
	ms: 0,
} );

export default {
	alignment: {
		type: 'string',
	},
	countdownTime: {
		type: 'date',
		default: nowTime,
	},
	numericColor: {
		type: 'string',
	},
	clockColor: {
		type: 'string',
	},
};
