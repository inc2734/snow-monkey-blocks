'use strict';

import ScreenshotImg from './screenshot-img';

import apiFetch from '@wordpress/api-fetch';

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
	useState,
} from '@wordpress/element';

import {
	dispatch,
	select,
} from '@wordpress/data';

export default function( { slug } ) {
	const [ parts, setParts ] = useState( null );
	const [ resultParts, setResultParts ] = useState( null );

	const setupParts = () => {
		if ( parts ) {
			return;
		}

		apiFetch( {
			path: `/snow-monkey-blocks/v5/block-template-panel/?slug=${ slug }`,
			method: 'GET',
			parse: true,
		} ).then( ( result ) => {
			setParts( result );
		} );
	};

	const setupResultParts = () => {
		if ( resultParts ) {
			return;
		}

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

		setupParts();
		if ( ! parts ) {
			return;
		}

		const newResultParts = parts.map( ( part ) => {
			if ( smb.isPro || ! part.isPro ) {
				return (
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
			}
		} );

		setResultParts( newResultParts.filter( ( resultPart ) => resultPart ) );
	};

	setupResultParts();

	if ( resultParts ) {
		return (
			<ul>
				{ resultParts }
			</ul>
		);
	}

	return (
		<div className="smb-menu__template-part__loading">
			<Spinner />
		</div>
	);
}
