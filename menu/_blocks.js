'use strict';

import { blockConfig } from '../src/js/config/block.js';

const { Component } = wp.element;
const { PanelBody } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

export class MenuBlocks extends Component {
	constructor() {
		super( ...arguments );
		this.getBlocksFromCategory = this.getBlocksFromCategory.bind( this );
	}

	render() {
		const categories = wp.blocks.getCategories();
		const smbCategories = blockConfig.blockCategories;
		const resultCategories = [];
		categories.map( ( category ) => {
			Object.keys( smbCategories ).map( ( name ) => {
				console.log( smbCategories[ name ] );
				if ( category.slug === smbCategories[ name ] ) {
					const resultBlocks = this.getBlocksFromCategory( category.slug );
					resultCategories.push(
						<PanelBody
							title={ category.title }
						>
							<ul>
								{ resultBlocks }
							</ul>
						</PanelBody>
					);
				}
			} );
		} );

		return (
			<Fragment>
				{ resultCategories }
			</Fragment>
		);
	}

	getBlocksFromCategory( category ) {
		const result = [];
		const blocks = wp.blocks.getBlockTypes();
		blocks.forEach( ( block ) => {
			if (
				block.category === category &&
				! ( block.parent && block.parent.length ) &&
				! ( block.supports && typeof block.supports.inserter !== 'undefined' && ! block.supports.inserter )
			) {
				let icon = block.icon.src ? block.icon.src : block.icon;
				if ( typeof icon === 'function' ) {
					icon = icon();
				} else if ( typeof icon === 'string' ) {
					icon = wp.element.createElement( wp.components.Dashicon, { icon: icon } );
				}
				result.push(
					<li>
						<p>{ icon }{ block.title }</p>
						<p>{ block.description }</p>
					</li>
				);
			}
		} );
		return result;
	}

}
