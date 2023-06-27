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

import {
	useIsJustifySelfDisabled,
	hasJustifySelfValue,
	resetJustifySelf,
	JustifySelfEdit,
	editJustifySelfProp,
} from './justify-self';

import {
	useIsAlignSelfDisabled,
	hasAlignSelfValue,
	resetAlignSelf,
	AlignSelfEdit,
	editAlignSelfProp,
} from './align-self';

import {
	useIsGridColumnDisabled,
	hasGridColumnValue,
	resetGridColumn,
	GridColumnEdit,
	editGridColumnProp,
} from './grid-column';

import {
	useIsGridRowDisabled,
	hasGridRowValue,
	resetGridRow,
	GridRowEdit,
	editGridRowProp,
} from './grid-row';

export {
	editFlexGrowProp,
	editFlexShrinkProp,
	editFlexBasisProp,
	editJustifySelfProp,
	editAlignSelfProp,
	editGridColumnProp,
	editGridRowProp,
};

export function DimensionsPanel( props ) {
	const isFlexGrowDisabled = useIsFlexGrowDisabled( props );
	const isFlexShrinkDisabled = useIsFlexShrinkDisabled( props );
	const isFlexBasisDisabled = useIsFlexBasisDisabled( props );
	const isJustifySelfDisabled = useIsJustifySelfDisabled( props );
	const isAlignSelfDisabled = useIsAlignSelfDisabled( props );
	const isGridColumnDisabled = useIsGridColumnDisabled( props );
	const isGridRowDisabled = useIsGridRowDisabled( props );

	if (
		isFlexGrowDisabled &&
		isFlexShrinkDisabled &&
		isFlexBasisDisabled &&
		isJustifySelfDisabled &&
		isAlignSelfDisabled &&
		isGridColumnDisabled &&
		isGridRowDisabled
	) {
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

				{ ! isJustifySelfDisabled && (
					<ToolsPanelItem
						hasValue={ () => hasJustifySelfValue( props ) }
						label="justify-self"
						onDeselect={ () => resetJustifySelf( props ) }
						resetAllFilter={ () => resetJustifySelf( props ) }
						isShownByDefault
						panelId={ props.clientId }
					>
						<JustifySelfEdit { ...props } />
					</ToolsPanelItem>
				) }

				{ ! isAlignSelfDisabled && (
					<ToolsPanelItem
						hasValue={ () => hasAlignSelfValue( props ) }
						label="align-self"
						onDeselect={ () => resetAlignSelf( props ) }
						resetAllFilter={ () => resetAlignSelf( props ) }
						isShownByDefault
						panelId={ props.clientId }
					>
						<AlignSelfEdit { ...props } />
					</ToolsPanelItem>
				) }

				{ ! isGridColumnDisabled && (
					<ToolsPanelItem
						hasValue={ () => hasGridColumnValue( props ) }
						label="grid-column"
						onDeselect={ () => resetGridColumn( props ) }
						resetAllFilter={ () => resetGridColumn( props ) }
						isShownByDefault
						panelId={ props.clientId }
					>
						<GridColumnEdit { ...props } />
					</ToolsPanelItem>
				) }

				{ ! isGridRowDisabled && (
					<ToolsPanelItem
						hasValue={ () => hasGridRowValue( props ) }
						label="grid-row"
						onDeselect={ () => resetGridRow( props ) }
						resetAllFilter={ () => resetGridRow( props ) }
						isShownByDefault
						panelId={ props.clientId }
					>
						<GridRowEdit { ...props } />
					</ToolsPanelItem>
				) }
			</InspectorControls>
		</>
	);
}
