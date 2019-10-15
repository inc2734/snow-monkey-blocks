'use strict';

import BlockTemplateCategories from './block-template-categories';

import {
	Component,
} from '@wordpress/element';

export default class BlockTemplates extends Component {
	render() {
		return (
			<BlockTemplateCategories />
		);
	}
}
