/*
 *@see https://github.com/WordPress/gutenberg/blob/42a5611fa7649186190fd4411425f6e5e9deb01a/packages/block-editor/src/hooks/dimensions.js
 */

import { InspectorControls } from '@wordpress/block-editor';
import { __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	useIsFlexGrowDisabled,
	hasFlexGrowValue,
	resetFlexGrow,
	FlexGrowEdit,
	editFlexGrowProp,
} from './flex-grow';

import {
	useIsFlexShrinkDisabled,
	hasFlexShrinkValue,
	resetFlexShrink,
	FlexShrinkEdit,
	editFlexShrinkProp,
} from './flex-shrink';

import {
	useIsFlexBasisDisabled,
	hasFlexBasisValue,
	resetFlexBasis,
	FlexBasisEdit,
	editFlexBasisProp,
} from './flex-basis';

export { editFlexGrowProp, editFlexShrinkProp, editFlexBasisProp };

export function DimensionsPanel( props ) {
	const isFlexGrowDisabled = useIsFlexGrowDisabled( props );
	const isFlexShrinkDisabled = useIsFlexShrinkDisabled( props );
	const isFlexBasisDisabled = useIsFlexBasisDisabled( props );

	if ( isFlexGrowDisabled && isFlexShrinkDisabled && isFlexBasisDisabled ) {
		return null;
	}

	return (
		<>
			<InspectorControls group="dimensions">
				{ ! isFlexGrowDisabled && (
					<ToolsPanelItem
						hasValue={ () => hasFlexGrowValue( props ) }
						label={ __( 'Fill' ) }
						onDeselect={ () => resetFlexGrow( props ) }
						resetAllFilter={ () => resetFlexGrow( props ) }
						isShownByDefault
						panelId={ props.clientId }
					>
						<FlexGrowEdit { ...props } />
					</ToolsPanelItem>
				) }

				{ ! isFlexShrinkDisabled && (
					<ToolsPanelItem
						hasValue={ () => hasFlexShrinkValue( props ) }
						label={ __( 'Fit' ) }
						onDeselect={ () => resetFlexShrink( props ) }
						resetAllFilter={ () => resetFlexShrink( props ) }
						isShownByDefault
						panelId={ props.clientId }
					>
						<FlexShrinkEdit { ...props } />
					</ToolsPanelItem>
				) }

				{ ! isFlexBasisDisabled && (
					<ToolsPanelItem
						hasValue={ () => hasFlexBasisValue( props ) }
						label={ __( 'Basic size', 'snow-monkey-blocks' ) }
						onDeselect={ () => resetFlexBasis( props ) }
						resetAllFilter={ () => resetFlexBasis( props ) }
						isShownByDefault
						panelId={ props.clientId }
					>
						<FlexBasisEdit { ...props } />
					</ToolsPanelItem>
				) }
			</InspectorControls>
		</>
	);
}
