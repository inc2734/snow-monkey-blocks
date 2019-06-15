'use strict';

import logoIcon from '../src/svg/logo.svg';

import { MenuBlocks } from './_blocks.js';
import { MenuTemplates } from './_templates.js';

const { Component } = wp.element;
const { Fragment } = wp.element;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { PanelBody, TabPanel } = wp.components;
const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;
const { applyFilters } = wp.hooks;

const onMenuSelect = ( tabName ) => {
	applyFilters( 'snow-monkey-blocks.select-menu', tabName );
};

export class PluginMenu extends Component {
	constructor() {
		super( ...arguments );

		this.tabMenus = [
			{
				name: 'blocks',
				title: __( 'Blocks', 'snow-monkey-blocks' ),
				className: 'edit-post-sidebar__panel-tab',
			},
			{
				name: 'templates',
				title: __( 'Templates', 'snow-monkey-blocks' ),
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
						onSelect={ onMenuSelect }
						tabs={ this.tabMenus }
					>
						{
							( tabData ) => {
								const tabType = tabData.name;
								switch ( tabType ) {
									case 'blocks':
										return (
											<MenuBlocks></MenuBlocks>
										);
									case 'templates':
										return (
											<MenuTemplates></MenuTemplates>
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

registerPlugin(
	'snow-monkey-blocks',
	{
		icon: logoIcon(),
		render: PluginMenu,
	}
);
