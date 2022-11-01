import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { PanelBody, ToggleControl, BaseControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import WidthPicker from '@smb/component/width-picker';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { contentsMaxWidth, isSlim } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const classes = classnames( 'smb-container', 'c-container', className );

	const bodyClasses = classnames( 'smb-container__body', {
		'u-slim-width': isSlim && ! contentsMaxWidth,
	} );

	const bodyStyles = {
		width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: bodyClasses,
			style: bodyStyles,
		},
		{
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeContentsMaxWidth = ( value ) =>
		setAttributes( {
			contentsMaxWidth: value,
		} );

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
		} );

	const disableIsSlim = !! contentsMaxWidth;
	const disableContentsMaxWidth = isSlim;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					{ ! disableContentsMaxWidth && (
						<BaseControl
							label={ __(
								'Max width of the contents',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/container/contents-max-width"
						>
							<WidthPicker
								value={ contentsMaxWidth }
								onChange={ onChangeContentsMaxWidth }
							/>
						</BaseControl>
					) }

					{ ! disableIsSlim && (
						<ToggleControl
							label={ __(
								'Make the contents width slim',
								'snow-monkey-blocks'
							) }
							checked={ isSlim }
							onChange={ onChangeIsSlim }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
