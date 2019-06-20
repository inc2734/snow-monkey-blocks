'use strict';

import { ScreenshotImg } from './component/screenshotImg.js';

const { Component } = wp.element;
const { PanelBody, Button, Spinner } = wp.components;
const { Fragment } = wp.element;
const { parse } = wp.blocks;
const { apiFetch } = wp;

class MenuTemplatesParts extends Component {
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

	getParts() {
		// パーツの情報を取得（内部API）
		apiFetch( {
			path: `/snow-monkey-blocks/v3/template-parts/?slug=${ this.props.slug }`,
			method: 'GET',
			parse: true,
		} ).then( ( result ) => {
			this.setState( { parts: result } );
		} );
	}

	getResultParts() {
		const {
			insertBlocks,
		} = wp.data.dispatch( 'core/editor' );

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
					// プロじゃ無い場合の対応
					return;
				}
				resultParts.push(
					// プレビュー付きのボタンを配置（押下時insert）
					<li>
						<Button
							className="smb-menu__template-part__button"
							onClick={ () => {
								const parsedBlocks = parse( part.content );
								if ( parsedBlocks.length ) {
									insertBlocks( parsedBlocks );
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

export { MenuTemplatesParts };

class MenuTemplatesCategories extends Component {
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
		// JSONからカテゴリの情報を取得
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
					// プロじゃ無い場合の対応
					return;
				}
				resultCategories.push(
					<PanelBody
						title={ category.title }
					>
						<MenuTemplatesParts
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

export { MenuTemplatesCategories };

export class MenuTemplates extends Component {
	render() {
		return (
			<Fragment>
				<MenuTemplatesCategories />
			</Fragment>
		);
	}
}
