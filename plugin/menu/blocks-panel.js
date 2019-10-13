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
	Component,
	createElement,
} from '@wordpress/element';

export default class BlocksPanel extends Component {
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
	}

	setupResultList() {
		if ( null === this.state.resultList ) {
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
		if ( null !== this.state.resultList ) {
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
