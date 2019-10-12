'use strict';

import BlockTemplatesCategories from './block-templates-categories';

import {
	Component,
	Fragment,
} from '@wordpress/element';

export default class BlockTemplates extends Component {
	render() {
		return (
			<Fragment>
				<BlockTemplatesCategories />
			</Fragment>
		);
	}
}
