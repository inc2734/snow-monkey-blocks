'use strict';

import classnames from 'classnames';
import blockIcon from './block-icon.svg';

import { blockConfig } from '../../src/js/config/block';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/directory-structure', {
	title: __( 'Directory structure', 'snow-monkey-blocks' ),
	description: __( 'Display a list of directories and files', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: blockIcon,
	},
	category: blockConfig.blockCategories.common,
	keywords: [
		__( 'Directory structure', 'snow-monkey-blocks' ),
	],
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/directory-structure.png`,
	},

	edit( { className } ) {
		const allowedBlocks = [
			'snow-monkey-blocks/directory-structure--item--directory',
			'snow-monkey-blocks/directory-structure--item--file',
		];

		const blockClasses = classnames( 'smb-directory-structure', className );

		return (
			<Fragment>
				<div className={ blockClasses }>
					<InnerBlocks
						allowedBlocks={ allowedBlocks }
						templateLock={ false }
					/>
				</div>
			</Fragment>
		);
	},

	save( { className } ) {
		const blockClasses = classnames( 'smb-directory-structure', className );

		return (
			<div className={ blockClasses }>
				<InnerBlocks.Content />
			</div>
		);
	},

} );
