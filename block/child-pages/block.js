'use strict';

const { registerBlockType } = wp.blocks;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/child-pages', {
	title: __( 'Child pages', 'snow-monkey-blocks' ),
	description: __( 'You can display child pages of this page.', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',

	edit() {
		return (
			<div className="components-placeholder">
				<div className="components-placeholder__label">
					<Dashicon icon="screenoptions" />
					{ __( 'Child pages', 'snow-monkey-blocks' ) }
				</div>
				<div className="components-placeholder__instructions">
					{ __( 'In the actual screen, it is displayed when the page have child pages.', 'snow-monkey-blocks' ) }
				</div>
			</div>
		);
	},

	save() {
		return null;
	},
} );
