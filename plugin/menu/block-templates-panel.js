'use strict';

const { apiFetch } = wp;

import ScreenshotImg from './screenshot-img';

import {
	first,
	last,
} from 'lodash';

import {
	parse,
} from '@wordpress/blocks';

import {
	Button,
	Spinner,
} from '@wordpress/components';

import {
	Component,
} from '@wordpress/element';

import {
	dispatch,
	select,
} from '@wordpress/data';

export default class BlockTemplatesPanel extends Component {
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

	getPanel() {
		apiFetch( {
			path: `/snow-monkey-blocks/v5/block-templates-panel/?slug=${ this.props.slug }`,
			method: 'GET',
			parse: true,
		} ).then( ( result ) => {
			this.setState( { parts: result } );
		} );
	}

	getResultParts() {
		const {
			insertBlocks,
			replaceBlocks,
			multiSelect,
		} = dispatch( 'core/editor' );

		const {
			getBlocks,
			getBlockCount,
			getSelectedBlock,
			getBlockInsertionPoint,
		} = select( 'core/block-editor' );

		if ( null !== this.state.resultParts ) {
			return;
		}
		if ( false === this.state.loading ) {
			this.setState( { loading: true } );
			this.getPanel();
			return;
		}
		if ( null !== this.state.parts ) {
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
									if ( null === selectedBlock ) {	// when not selected block
										// get last root block
										const lastRootBlock = last( getBlocks() );
										const isEmpty = undefined !== lastRootBlock && ( null === lastRootBlock.rootClientId && ( ! getBlockCount( lastRootBlock.clientId ) || ( 'core/paragraph' === lastRootBlock.name && '' === lastRootBlock.attributes.content ) ) );
										if ( isEmpty ) {
											// Replace when last block is empty
											replaceBlocks( lastRootBlock.clientId, parsedBlocks );
										} else {
											// Insert at the end when block is not empty
											insertBlocks( parsedBlocks );
										}
									} else {	// when selected block
										// isEmpty is true when blocktype is paragraph and content is empty
										const isEmpty = 'core/paragraph' === selectedBlock.name && '' === selectedBlock.attributes.content;
										if ( ! isEmpty ) {
											// Insert after block
											const insertionPoint = getBlockInsertionPoint();
											insertBlocks( parsedBlocks, insertionPoint.index, insertionPoint.rootClientId );
										} else {
											// Replace at the block when block is empty
											replaceBlocks( selectedBlock.clientId, parsedBlocks );
										}
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
		if ( null !== this.state.resultParts ) {
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
