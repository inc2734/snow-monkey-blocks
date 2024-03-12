import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	RangeControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import { useMigrateDoubleHyphenToSingleHyphen } from '@smb/hooks';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/testimonial-item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/testimonial-item' ] ];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	useMigrateDoubleHyphenToSingleHyphen( clientId, [
		{
			oldBlockName: 'snow-monkey-blocks/testimonial--item',
			newBlockName: 'snow-monkey-blocks/testimonial-item',
		},
	] );

	const { md, lg, templateLock } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-testimonial', className );
	const rowClasses = classnames( 'c-row', 'c-row--margin' );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: rowClasses,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
			orientation: 'horizontal',
		}
	);

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							lg !== metadata.attributes.lg.default ||
							md !== metadata.attributes.md.default
						}
						isShownByDefault
						label={ __( 'Columns per row', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								lg: metadata.attributes.lg.default,
								md: metadata.attributes.md.default,
							} )
						}
					>
						<ResponsiveTabPanel
							desktop={ () => (
								<RangeControl
									label={ __(
										'Columns per row (Large window)',
										'snow-monkey-blocks'
									) }
									value={ lg }
									onChange={ ( value ) =>
										setAttributes( {
											lg: toNumber( value, 1, 4 ),
										} )
									}
									min="1"
									max="4"
								/>
							) }
							tablet={ () => (
								<RangeControl
									label={ __(
										'Columns per row (Medium window)',
										'snow-monkey-blocks'
									) }
									value={ md }
									onChange={ ( value ) =>
										setAttributes( {
											md: toNumber( value, 1, 2 ),
										} )
									}
									min="1"
									max="2"
								/>
							) }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-testimonial__body">
					<div
						{ ...innerBlocksProps }
						data-columns="1"
						data-md-columns={ md }
						data-lg-columns={ lg }
					/>
				</div>
			</div>
		</>
	);
}
