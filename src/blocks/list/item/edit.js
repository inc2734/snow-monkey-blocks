import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { useSplit } from './hooks';

export default function ( {
	attributes,
	setAttributes,
	className,
	clientId,
	onReplace,
} ) {
	const { content } = attributes;

	const { getPreviousBlockClientId } = useSelect( blockEditorStore );
	const { mergeBlocks } = useDispatch( blockEditorStore );

	const onSplit = useSplit( clientId );

	const classes = classnames( 'smb-list__item', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	return (
		<li { ...blockProps }>
			<RichText
				placeholder={ __( 'List', 'snow-monkey-blocks' ) }
				identifier="content"
				value={ content }
				onChange={ ( value ) =>
					setAttributes( {
						content: value,
					} )
				}
				onSplit={ onSplit }
				onReplace={ onReplace }
				onMerge={ ( forward ) => {
					if ( ! forward ) {
						const previousBlockClientId =
							getPreviousBlockClientId( clientId );

						if ( !! previousBlockClientId ) {
							mergeBlocks( previousBlockClientId, clientId );
						}
					}
				} }
			/>
		</li>
	);
}
