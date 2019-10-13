'use strict';

import BlockTemplatesCategories from './block-templates-categories';

import {
	Component,
} from '@wordpress/element';

export default class BlockTemplates extends Component {
	render() {
		return (
			<BlockTemplatesCategories />
		);
	}
}
