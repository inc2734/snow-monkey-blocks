import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		tabs: _tabs,
		matchHeight,
		tabsJustification,
		tabsId,
		orientation,
	} = attributes;
	const tabs = JSON.parse( _tabs );

	const dataMatchHeightBoolean =
		'vertical' === orientation ||
		( 'horizontal' === orientation && 'true' === matchHeight );

	const classes = classnames( 'smb-tabs', className );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-tabs-id={ tabsId }
			data-orientation={ orientation }
			data-match-height={ dataMatchHeightBoolean ? 'true' : matchHeight }
			data-tabs-justification={
				'horizontal' === orientation ? tabsJustification : undefined
			}
		>
			{ 0 < tabs.length && (
				<div className="smb-tabs__tabs" role="tablist">
					{ tabs.map( ( tab, index ) => {
						const colorProps = getColorClassesAndStyles( tab );

						return (
							<div
								className="smb-tabs__tab-wrapper"
								key={ index }
								id={ `smb-tab-for-${ tab?.anchor }` }
							>
								<RichText.Content
									tagName="button"
									value={ tab.title }
									className={ classnames(
										'smb-tabs__tab',
										colorProps?.className
									) }
									style={ colorProps?.style }
									role="tab"
									aria-controls={ tab?.anchor }
									aria-selected={
										0 === index ? 'true' : 'false'
									}
								/>
							</div>
						);
					} ) }
				</div>
			) }

			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-tabs__body',
				} ) }
			/>

			{ dataMatchHeightBoolean && (
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
