import classnames from 'classnames';

import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { tabs, matchHeight, tabsId } = attributes;

	const classes = classnames( 'smb-tabs', className, {
		'smb-tabs--match-height': matchHeight,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-tabs-id={ tabsId }
		>
			{ 0 < tabs.length && (
				<div className="smb-tabs__tabs">
					{ tabs.map( ( tab, index ) => {
						return (
							<div
								className="smb-tabs__tab-wrapper"
								key={ index }
							>
								<button
									className="smb-tabs__tab"
									role="tab"
									aria-controls={ tab.tabPanelId }
									aria-selected={
										0 === index ? 'true' : 'false'
									}
								>
									<RichText.Content value={ tab.title } />
								</button>
							</div>
						);
					} ) }
				</div>
			) }
			<div className="smb-tabs__body">
				<InnerBlocks.Content />
			</div>
			{ matchHeight && (
				<style>
					{ tabs.map(
						( tab, index ) =>
							`[data-tabs-id="${ tabsId }"] > .smb-tabs__body > .smb-tab-panel:nth-child(${
								index + 1
							}) {left: ${ -100 * index }%}`
					) }
				</style>
			) }
		</div>
	);
}
