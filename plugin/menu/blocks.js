'use strict';

import ScreenshotImg from './screenshot-img';
import BlockCategories from './block-categories';

import {
	Fragment,
	useState,
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

export default function() {
	const [ resultDetail, setResultDetail ] = useState( null );

	const setupResultDetail = ( blockName ) => {
		const block = getBlockType( blockName );
		const proMessage = ! smb.isPro && block.snowMonkeyBlocks.isPro ? (
			<p className="smb-menu__template-block__modal__pro-message">
				{ __( 'This block is for pro users only', 'snow-monkey-blocks' ) }
			</p>
		) : '';

		setResultDetail(
			<Modal
				className="smb-menu__template-block__modal"
				title={ block.title }
				onRequestClose={ () => setResultDetail( null ) }
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
	};

	return (
		<Fragment>
			<BlockCategories
				setupResultDetail={ setupResultDetail }
			/>
			{ resultDetail }
		</Fragment>
	);
}
