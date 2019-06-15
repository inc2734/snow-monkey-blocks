'use strict';

import Img from 'react-image';

import { blockConfig } from '../src/js/config/block.js';

const { Component } = wp.element;
const { compose } = wp.compose;
const { PanelBody, Modal, Button, Spinner } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { parse, getCategories, getBlockType, getBlockTypes } = wp.blocks;

class MenuBlocksList extends Component {
	constructor( props ) {
		super( ...arguments );

		this.props = props;
		this.state = {
			loading: false,
			resultList: null,
		};
		this.setupResultList = this.setupResultList.bind( this );
	}

	getBlocksFromCategory( category ) {
		const result = [];
		const blocks = getBlockTypes();
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
					{
						block,
						icon: icon,
					}
				);
			}
		} );
		return result;
	}

	setupResultList() {
		if ( this.state.resultList === null ) {
			const resultList = [];
			const categoryBlocks = this.getBlocksFromCategory( this.props.slug );
			categoryBlocks.forEach( ( categoryBlock ) => {
				resultList.push(
					<li>
						<Button
							onClick={ () => {
								this.props.rootMenu.test( categoryBlock.block.name );
							} }
						>
							{ categoryBlock.icon } { categoryBlock.block.title }
						</Button>
					</li>
				);
			} );
			this.setState( { resultList: resultList } );
		}
	}

	render() {
		this.setupResultList();
		if ( this.state.resultList !== null ) {
			return (
				<ul>
					{ this.state.resultList }
				</ul>
			);
		}
		return (
			<Spinner />
		);
	}
}

export { MenuBlocksList };

class MenuBlocksCategories extends Component {
	constructor( props ) {
		super( ...arguments );

		this.props = props;
		this.state = {
			smbCategories: null,
			resultCategories: null,
		};
		this.setupSmbCategories = this.setupSmbCategories.bind( this );
		this.setupResultCategories = this.setupResultCategories.bind( this );
	}

	setupSmbCategories() {
		const allBlockCategories = getCategories();
		const smbConfigCategories = blockConfig.blockCategories;
		const categories = [];
		allBlockCategories.map( ( category ) => {
			Object.keys( smbConfigCategories ).map( ( name ) => {
				if ( category.slug === smbConfigCategories[ name ] ) {
					categories.push( category );
				}
			} );
		} );
		this.setState( { smbCategories: categories } );
	}

	setupResultCategories() {
		if ( this.state.smbCategories === null ) {
			this.setupSmbCategories();
			return;
		}
		if ( this.state.resultCategories === null ) {
			const resultCategories = [];
			this.state.smbCategories.map( ( category ) => {
				resultCategories.push(
					<PanelBody
						title={ category.title }
					>
						<MenuBlocksList
							rootMenu={ this.props.rootMenu }
							slug={ category.slug }
						/>
					</PanelBody>
				);
			} );
			this.setState( { resultCategories: resultCategories } );
		}
	}

	render() {
		this.setupResultCategories();
		if ( this.state.resultCategories !== null ) {
			return (
				<Fragment>
					{ this.state.resultCategories }
				</Fragment>
			);
		}
		return (
			<Spinner />
		);
	}
}

export { MenuBlocksCategories };

export class MenuBlocks extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			resultDetail: null,
		};
		this.test = this.test.bind( this );
	}

	test( blockName ) {
		const block = getBlockType( blockName );
		const resultDetail = (
			<Modal
				title={ block.title }
				onRequestClose={ () => this.setState( { resultDetail: null } ) }
			>
				<p>{ block.description }</p>
				<Img
					src={ block.snowMonkey.screenshot }
					loader={
						<Spinner />
					}
				/>
			</Modal>
		);
		this.setState( { resultDetail: resultDetail } );
	}

	render() {
		return (
			<Fragment>
				<MenuBlocksCategories
					rootMenu={ this }
				/>
				{ this.state.resultDetail }
			</Fragment>
		);
	}
}
