'use strict';

import {
	TabPanel,
} from '@wordpress/components';

import {
	Fragment,
} from '@wordpress/element';

import {
	PluginSidebar,
	PluginSidebarMoreMenuItem,
} from '@wordpress/edit-post';

import {
	applyFilters,
} from '@wordpress/hooks';

import {
	__,
} from '@wordpress/i18n';

import BlockTemplates from './block-templates';

export default function() {
	const tabMenus = [
		{
			name: 'block-templates',
			title: __( 'Block templates', 'snow-monkey-blocks' ),
			className: 'edit-post-sidebar__panel-tab',
		},
	];

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
					tabs={ tabMenus }
				>
					{
						( tabData ) => {
							switch ( tabData.name ) {
								case 'block-templates':
									return (
										<BlockTemplates />
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
