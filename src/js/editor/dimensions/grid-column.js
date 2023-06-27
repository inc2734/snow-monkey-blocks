import { hasBlockSupport } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

export function hasGridColumnValue( props ) {
	return props.attributes?.smb?.gridColumn !== undefined;
}

export function resetGridColumn( { attributes = {}, setAttributes } ) {
	delete attributes?.smb?.gridColumn;
	const newSMB = { ...attributes?.smb };

	setAttributes( {
		smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
	} );
}

export function useIsGridColumnDisabled( {
	name: blockName,
	attributes: { __unstableSMBSupports },
} = {} ) {
	return (
		! hasBlockSupport( blockName, 'smb.gridColumn' ) &&
		! __unstableSMBSupports?.gridColumn
	);
}

export function GridColumnEdit( props ) {
	const {
		attributes: { smb },
		setAttributes,
	} = props;

	return (
		<TextControl
			label="grid-column"
			value={ smb?.gridColumn || '' }
			onChange={ ( newValue ) => {
				const newSMB = {
					...smb,
					gridColumn: newValue || undefined,
				};
				if ( null == newSMB.gridColumn ) {
					delete newSMB.gridColumn;
				}

				setAttributes( {
					smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
				} );
			} }
		/>
	);
}

export function saveGridColumnProp( extraProps, blockType, attributes ) {
	if (
		! hasBlockSupport( blockType, 'smb.gridColumn' ) &&
		! attributes?.__unstableSMBSupports?.gridColumn
	) {
		delete attributes?.smb?.gridColumn;
		if ( !! attributes?.smb && ! Object.keys( attributes?.smb ).length ) {
			delete attributes?.smb;
		}
		return extraProps;
	}

	if ( undefined === attributes?.smb?.gridColumn ) {
		return extraProps;
	}

	extraProps.style = {
		...extraProps.style,
		'--smb--grid-column': attributes?.smb?.gridColumn,
	};

	return extraProps;
}

export function editGridColumnProp( settings ) {
	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};
		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}
		return saveGridColumnProp( props, settings, attributes );
	};

	return settings;
}
