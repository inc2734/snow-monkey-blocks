import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { title, numberColor } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const classes = classnames( 'smb-step__item', className );

	const itemNumberStyles = {
		backgroundColor: numberColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-step__item__summary',
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeNumberColor = ( value ) =>
		setAttributes( {
			numberColor: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: numberColor,
							onChange: onChangeNumberColor,
							label: __( 'Number Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-step__item__title">
					<div
						className="smb-step__item__number"
						style={ itemNumberStyles }
					/>

					<RichText
						tagName="span"
						placeholder={ __(
							'Write title…',
							'snow-monkey-blocks'
						) }
						value={ title }
						multiline={ false }
						onChange={ onChangeTitle }
					/>
				</div>

				<div className="smb-step__item__body">
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}
