'use strict';

import {
	getBlockTypes,
} from '@wordpress/blocks';

import {
	Button,
	Spinner,
	Dashicon,
} from '@wordpress/components';

import {
	createElement,
} from '@wordpress/element';

export default function( { slug, setupResultDetail } ) {
	const getBlocksFromCategory = ( category ) => {
		const result = [];
		const blocks = getBlockTypes();

		blocks.forEach( ( block ) => {
			if (
				block.category === category &&
				! ( block.parent && block.parent.length ) &&
				! ( block.supports && 'undefined' !== typeof block.supports.inserter && ! block.supports.inserter )
			) {
				let icon = block.icon.src ? block.icon.src : block.icon;

				if ( 'function' === typeof icon ) {
					icon = icon();
				} else if ( 'string' === typeof icon ) {
					icon = createElement( Dashicon, { icon: icon } );
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
	};

	const resultList = [];
	const categoryBlocks = getBlocksFromCategory( slug );

	categoryBlocks.forEach( ( categoryBlock ) => {
		resultList.push(
			<li>
				<Button
					className="smb-menu__template-block__button"
					onClick={ () => {
						setupResultDetail( categoryBlock.block.name );
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

	if ( null !== resultList ) {
		return (
			<ul>
				{ resultList }
			</ul>
		);
	}

	return (
		<Spinner />
	);
}
