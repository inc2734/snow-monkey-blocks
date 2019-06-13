'use strict';

import Img from 'react-image';

import { blockConfig } from '../src/js/config/block.js';

const { Component } = wp.element;
const { compose } = wp.compose;
const { PanelBody, Modal, Button, Spinner } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { parse } = wp.blocks;

class MenuBlocks extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			loading: false,
			data: [],
			selectBlock: null,
			selectScreenShot: 'https://snow-monkey.2inc.org/wp-content/uploads/2018/10/screenshot-1-1920x1440.png',
		};
		// カテゴリーのロード
		this.getBlocksFromCategory = this.getBlocksFromCategory.bind( this );
	}

	render() {
		const {
			insertBlocks,
		} = wp.data.dispatch( 'core/editor' );

		const categories = wp.blocks.getCategories();
		const smbCategories = blockConfig.blockCategories;
		const resultCategories = [];
		categories.map( ( category ) => {
			Object.keys( smbCategories ).map( ( name ) => {
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
				{ this.state.selectBlock !== null && (
					<Modal
						title={ __( 'Block Image', 'snow-monkey-blocks' ) }
						onRequestClose={ () => this.setDetailState( null ) }
					>
						<Img
							src={ this.state.selectScreenShot }
							loader={
								<Spinner />
							}
						/>
						<Button
							isDefault
							onClick={ () => {
								const parsedBlocks = parse( '<!-- wp:snow-monkey-blocks/balloon {"balloonName":"Test"} --><div class="wp-block-snow-monkey-blocks-balloon smb-balloon"><div class="smb-balloon__person"><div class="smb-balloon__figure"><img src="https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&amp;d=mp&amp;r=g" alt="" class="wp-image-0"/></div><div class="smb-balloon__name">Test</div></div><div class="smb-balloon__body"></div></div><!-- /wp:snow-monkey-blocks/balloon -->' );
								if ( parsedBlocks.length ) {
									insertBlocks( parsedBlocks );
								}
								this.setDetailState( null );
							} }
						>
							{ __( 'Insert Block', 'snow-monkey-blocks' ) }
						</Button>
					</Modal>
				) }
			</Fragment>
		);
	}

	setDetailState( selectBlock ) {
		this.setState( { selectBlock: selectBlock } );
	}

	setBlockScreenShot() {
		if ( this.state.selectBlock !== null ) {
			// 読み込んだデータの中にある場合、そのURLを返却
			this.setState( { selectScreenShot: selectScreenShot } );
			return;
		}
		this.setState( { selectScreenShot: null } );
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
						<Button
							isDefault
							onClick={ () => this.setDetailState( block.name ) }
						>
							<p>{ icon }{ block.title }</p>
							<p>{ block.description }</p>
						</Button>
					</li>
				);
			}
		} );
		return result;
	}
}

export { MenuBlocks };
