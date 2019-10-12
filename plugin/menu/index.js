'use strict';

import logoIcon from '../../src/svg/logo.svg';

import Sidebar from './sidebar';

export const name = 'snow-monkey-blocks';

export const settings = {
	icon: logoIcon(),
	render: Sidebar,
};
