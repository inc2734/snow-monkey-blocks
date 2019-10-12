'use strict';

import blockConfig from '../../src/js/config/block';
import BlocksPanel from './blocks-panel';

import {
	getCategories,
} from '@wordpress/blocks';

import {
	PanelBody,
	Spinner,
} from '@wordpress/components';

import {
	Component,
	Fragment,
} from '@wordpress/element';

export default class BlocksCategories extends Component {
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
						<BlocksPanel
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
