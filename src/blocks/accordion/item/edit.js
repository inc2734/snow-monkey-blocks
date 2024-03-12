import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className } ) {
	const { title, initialState, templateLock } = attributes;

	const classes = classnames( 'smb-accordion__item', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-accordion__item__body',
		},
		{ templateLock }
	);

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							initialState !==
							metadata.attributes.initialState.default
						}
						isShownByDefault
						label={ __(
							'Display in open state',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								initialState:
									metadata.attributes.initialState.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Display in open state',
								'snow-monkey-blocks'
							) }
							checked={ initialState }
							onChange={ ( value ) =>
								setAttributes( {
									initialState: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-accordion__item__title">
					<RichText
						className="smb-accordion__item__title__label"
						value={ title }
						onChange={ ( value ) =>
							setAttributes( {
								title: value,
							} )
						}
						placeholder={ __(
							'Enter title here',
							'snow-monkey-blocks'
						) }
					/>
					<div className="smb-accordion__item__title__icon">
						<i className="fa-solid fa-angle-down"></i>
					</div>
				</div>

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
