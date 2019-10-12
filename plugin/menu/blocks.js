'use strict';

import ScreenshotImg from './screenshot-img';
import BlocksCategories from './blocks-categories';

import {
	Component,
	Fragment,
} from '@wordpress/element';

import {
	Modal,
	Spinner,
} from '@wordpress/components';

import {
	getBlockType,
} from '@wordpress/blocks';

import {
	__,
} from '@wordpress/i18n';

export default class Blocks extends Component {
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
		if ( ! smb.isPro && block.snowMonkeyBlocks.isPro ) {
			proMessage = (
				<p className="smb-menu__template-block__modal__pro-message">{ __( 'This block is for pro users only', 'snow-monkey-blocks' ) }</p>
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
					src={ block.snowMonkeyBlocks.screenshot }
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
				<BlocksCategories
					rootMenu={ this }
				/>
				{ this.state.resultDetail }
			</Fragment>
		);
	}
}
