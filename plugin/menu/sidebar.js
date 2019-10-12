'use strict';

import {
	TabPanel,
} from '@wordpress/components';

import {
	Component,
	Fragment,
} from '@wordpress/element';

import {
	PluginSidebar,
	PluginSidebarMoreMenuItem,
} from '@wordpress/editPost';

import {
	applyFilters,
} from '@wordpress/hooks';

import {
	__,
} from '@wordpress/i18n';

import Blocks from './blocks';
import BlockTemplates from './block-templates';

export default class Sidebar extends Component {
	constructor() {
		super( ...arguments );

		this.tabMenus = [
			{
				name: 'block-templates',
				title: __( 'Block templates', 'snow-monkey-blocks' ),
				className: 'edit-post-sidebar__panel-tab',
			},
			{
				name: 'blocks',
				title: __( 'Blocks', 'snow-monkey-blocks' ),
				className: 'edit-post-sidebar__panel-tab',
			},
		];
	}

	render() {
		return (
			<Fragment>
				<PluginSidebarMoreMenuItem
					target="smbSidebar"
				>
					{ __( 'Snow Monkey Blocks', 'snow-monkey-blocks' ) }
				</PluginSidebarMoreMenuItem>
				<PluginSidebar
					name="smbSidebar"
					title={ __( 'Snow Monkey Blocks', 'snow-monkey-blocks' ) }
				>
					<TabPanel
						className="edit-post-sidebar__panel-tabs"
						activeClass="is-active"
						onSelect={ ( tabName ) => applyFilters( 'snow-monkey-blocks.select-menu', tabName ) }
						tabs={ this.tabMenus }
					>
						{
							( tabData ) => {
								switch ( tabData.name ) {
									case 'block-templates':
										return (
											<BlockTemplates />
										);
									case 'blocks':
										return (
											<Blocks />
										);
								}
								return null;
							}
						}
					</TabPanel>
				</PluginSidebar>
			</Fragment>
		);
	}
}
