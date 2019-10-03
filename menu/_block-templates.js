'use strict';

import { ScreenshotImg } from './component/screenshotImg';

const { first, last } = lodash;
const { Component } = wp.element;
const { PanelBody, Button, Spinner } = wp.components;
const { Fragment } = wp.element;
const { parse } = wp.blocks;
const { apiFetch } = wp;

class PanelBlockTemplates extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.state = {
			loading: false,
			parts: null,
			resultParts: null,
		};
		this.getResultParts = this.getResultParts.bind( this );
	}

	getInsertIndex() {
		const { clientId, rootClientId, getBlockIndex } = this.props;
		if ( clientId !== undefined ) {
			const index = getBlockIndex( clientId, rootClientId );
			return index + 1;
		}
	}

	getParts() {
		apiFetch( {
			path: `/snow-monkey-blocks/v3/block-templates/?slug=${ this.props.slug }`,
			method: 'GET',
			parse: true,
		} ).then( ( result ) => {
			this.setState( { parts: result } );
		} );
	}

	getResultParts() {
		const {
			insertBlocks,
			multiSelect,
		} = wp.data.dispatch( 'core/editor' );

		const {
			getSelectedBlock,
//			getSelectedBlockClientId,
			getBlockIndex,
			getBlockRootClientId,
			getBlockInsertionPoint,
//			isMultiSelecting,
//			isSelectionEnabled,
		} = wp.data.select( 'core/block-editor' );

		if ( this.state.resultParts !== null ) {
			return;
		}
		if ( this.state.loading === false ) {
			this.setState( { loading: true } );
			this.getParts();
			return;
		}
		if ( this.state.parts !== null ) {
			const resultParts = [];
			this.state.parts.map( ( part ) => {
				if ( ! smb.isPro && part.isPro ) {
					return;
				}

				resultParts.push(
					<li>
						<Button
							className="smb-menu__template-part__button"
							onClick={ () => {
								const parsedBlocks = parse( part.content );
								if ( parsedBlocks.length ) {
									const selectedBlock = getSelectedBlock();
									if ( null === selectedBlock ) {
										// ブロック未選択時は最後に挿入
										insertBlocks( parsedBlocks );
									} else {
										// 選択されているブロックの次に挿入
										const rootClientId = getBlockRootClientId( selectedBlock.clientId );
										const insertionPoint = getBlockInsertionPoint();
										insertBlocks( parsedBlocks, insertionPoint.index, insertionPoint.rootClientId );
									}
									multiSelect(
										first( parsedBlocks ).clientId,
										last( parsedBlocks ).clientId
									);
								}
							} }
						>
							<ScreenshotImg
								className="smb-menu__template-part__button__screenshot"
								src={ part.screenshot }
								loader={
									<div className="smb-menu__template-part__button__screenshot__loading">
										<Spinner />
									</div>
								}
							/>
							<span className="smb-menu__template-part__button__title">
								{ part.title }
							</span>
						</Button>
					</li>
				);
			} );
			this.setState( { resultParts: resultParts } );
		}
	}

	render() {
		this.getResultParts();
		if ( this.state.resultParts !== null ) {
			return (
				<ul>
					{ this.state.resultParts }
				</ul>
			);
		}
		return (
			<div className="smb-menu__template-part__loading">
				<Spinner />
			</div>
		);
	}
}

class TemplateCategories extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			loading: false,
			categories: null,
			resultCategories: null,
		};

		this.getResultCategories = this.getResultCategories.bind( this );
	}

	getCategories() {
		apiFetch( {
			path: '/snow-monkey-blocks/v3/template-categories/',
			method: 'GET',
			parse: true,
		} ).then( ( result ) => {
			this.setState( { categories: result } );
		} );
	}

	getResultCategories() {
		if ( this.state.resultCategories !== null ) {
			return;
		}
		if ( this.state.loading === false ) {
			this.setState( { loading: true } );
			this.getCategories();
			return;
		}
		if ( this.state.categories !== null ) {
			const resultCategories = [];
			this.state.categories.map( ( category ) => {
				if ( ! smb.isPro && category.isPro ) {
					return;
				}

				resultCategories.push(
					<PanelBody
						title={ category.title }
					>
						<PanelBlockTemplates
							slug={ category.slug }
						/>
					</PanelBody>
				);
			} );
			this.setState( { resultCategories: resultCategories } );
		}
	}

	render() {
		this.getResultCategories();
		if ( this.state.resultCategories !== null ) {
			return (
				<Fragment>
					{ this.state.resultCategories }
				</Fragment>
			);
		}
		return (
			<div className="smb-menu__template-part__loading">
				<Spinner />
			</div>
		);
	}
}

export class MenuBlockTemplates extends Component {
	render() {
		return (
			<Fragment>
				<TemplateCategories />
			</Fragment>
		);
	}
}
