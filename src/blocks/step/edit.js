import classnames from 'classnames';
import { times } from 'lodash';

import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { useToolsPanelDropdownMenuProps } from '@smb/helper';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/step-item-free' ];

const TEMPLATE = [ [ 'snow-monkey-blocks/step-item-free' ] ];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { tagName, templateLock } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const dropdownMenuProps = useToolsPanelDropdownMenuProps();

	const TagName = tagName;
	const tagNames = [ 'div', 'ul', 'ol' ];

	const classes = classnames( 'smb-step', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-step__body',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock,
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
					dropdownMenuProps={ dropdownMenuProps }
				>
					<ToolsPanelItem
						hasValue={ () =>
							tagName !== metadata.attributes.tagName.default
						}
						isShownByDefault
						label={ __( 'Tag', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								tagName: metadata.attributes.tagName.default,
							} )
						}
					>
						<BaseControl
							__nextHasNoMarginBottom
							label={ __( 'Tag', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/step/tag-name"
						>
							<div className="smb-list-icon-selector">
								{ times( tagNames.length, ( index ) => {
									const onClicktagName = () =>
										setAttributes( {
											tagName: tagNames[ index ],
										} );

									return (
										<Button
											variant={
												tagName === tagNames[ index ]
													? 'primary'
													: 'secondary'
											}
											onClick={ onClicktagName }
											key={ index }
										>
											{ tagNames[ index ] }
										</Button>
									);
								} ) }
							</div>
						</BaseControl>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<TagName { ...innerBlocksProps } />
			</div>
		</>
	);
}
