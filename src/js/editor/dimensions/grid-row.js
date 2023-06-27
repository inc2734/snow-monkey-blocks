import { hasBlockSupport } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

export function hasGridRowValue( props ) {
	return props.attributes?.smb?.gridRow !== undefined;
}

export function resetGridRow( { attributes = {}, setAttributes } ) {
	delete attributes?.smb?.gridRow;
	const newSMB = { ...attributes?.smb };

	setAttributes( {
		smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
	} );
}

export function useIsGridRowDisabled( {
	name: blockName,
	attributes: { __unstableSMBSupports },
} = {} ) {
	return (
		! hasBlockSupport( blockName, 'smb.gridRow' ) &&
		! __unstableSMBSupports?.gridRow
	);
}

export function GridRowEdit( props ) {
	const {
		attributes: { smb },
		setAttributes,
	} = props;

	return (
		<TextControl
			label="grid-row"
			value={ smb?.gridRow || '' }
			onChange={ ( newValue ) => {
				const newSMB = {
					...smb,
					gridRow: newValue || undefined,
				};
				if ( null == newSMB.gridRow ) {
					delete newSMB.gridRow;
				}

				setAttributes( {
					smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
				} );
			} }
		/>
	);
}

export function saveGridRowProp( extraProps, blockType, attributes ) {
	if (
		! hasBlockSupport( blockType, 'smb.gridRow' ) &&
		! attributes?.__unstableSMBSupports?.gridRow
	) {
		delete attributes?.smb?.gridRow;
		if ( !! attributes?.smb && ! Object.keys( attributes?.smb ).length ) {
			delete attributes?.smb;
		}
		return extraProps;
	}

	if ( undefined === attributes?.smb?.gridRow ) {
		return extraProps;
	}

	extraProps.style = {
		...extraProps.style,
		'--smb--grid-row': attributes?.smb?.gridRow,
	};

	return extraProps;
}

export function editGridRowProp( settings ) {
	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};
		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}
		return saveGridRowProp( props, settings, attributes );
	};

	return settings;
}
