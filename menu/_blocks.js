'use strict';

import { blockConfig } from '../src/js/config/block.js';
import { ScreenshotImg } from './component/screenshotImg.js';

const { Component } = wp.element;
const { PanelBody, Modal, Button, Spinner } = wp.components;
const { Fragment } = wp.element;
const { getCategories, getBlockType, getBlockTypes } = wp.blocks;
const { __ } = wp.i18n;

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
							className="smb-menu__template-block__button"
							onClick={ () => {
								this.props.rootMenu.setupResultDetail( categoryBlock.block.name );
							} }
						>
							{ categoryBlock.icon }
							<span className="smb-menu__template-block__button__title">
								{ categoryBlock.block.title }
							</span>
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
		this.setupResultDetail = this.setupResultDetail.bind( this );
	}

	setupResultDetail( blockName ) {
		const block = getBlockType( blockName );
		let proMessage = '';
		if ( ! smb.isPro && block.snowMonkey.isPro ) {
			proMessage = (
				<p className="smb-menu__template-block__modal__pro-message">{ __( 'This Block is for pro use only', 'snow-monkey-blocks' ) }</p>
			);
		}
		const resultDetail = (
			<Modal
				className="smb-menu__template-block__modal"
				title={ block.title }
				onRequestClose={ () => this.setState( { resultDetail: null } ) }
			>
				{ proMessage }
				<p className="smb-menu__template-block__modal__description">{ block.description }</p>
				<ScreenshotImg
					className="smb-menu__template-block__modal__screenshot"
					src={ block.snowMonkey.screenshot }
					loader={
						<div className="smb-menu__template-block__modal__screenshot__loading">
							<Spinner />
						</div>
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
