import { hasBlockSupport } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

import {
	DimensionsPanel,
	editFlexGrowProp,
	editFlexShrinkProp,
	editFlexBasisProp,
	editJustifySelfProp,
	editAlignSelfProp,
	editGridColumnProp,
	editGridRowProp,
} from './editor/dimensions/dimensions';

function addEditProps( settings ) {
	settings = editFlexGrowProp( settings );
	settings = editFlexShrinkProp( settings );
	settings = editFlexBasisProp( settings );
	settings = editJustifySelfProp( settings );
	settings = editAlignSelfProp( settings );
	settings = editGridColumnProp( settings );
	settings = editGridRowProp( settings );

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'smb/editor/addEditProps',
	addEditProps
);

const addAttribute = ( settings ) => {
	Object.assign( settings.attributes, {
		smb: {
			type: 'object',
		},
	} );

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'smb/editor/addAttribute',
	addAttribute
);

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if (
			! hasBlockSupport( props.name, 'smb' ) &&
			! props.attributes?.__unstableSMBSupports
		) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<BlockEdit { ...props } />

				{ ( hasBlockSupport( props.name, 'smb' ) ||
					!! props.attributes?.__unstableSMBSupports ) && (
					<DimensionsPanel { ...props } />
				) }
			</>
		);
	};
}, 'withInspectorControl' );

addFilter(
	'editor.BlockEdit',
	'smb/editor/with-inspector-controls',
	withInspectorControls
);
