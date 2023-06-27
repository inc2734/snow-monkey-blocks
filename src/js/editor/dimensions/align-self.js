import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';

import { hasBlockSupport } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import { alignTop, alignCenter, alignBottom, alignStretch } from './icons';

export function hasAlignSelfValue( props ) {
	return props.attributes?.smb?.alignSelf !== undefined;
}

export function resetAlignSelf( { attributes = {}, setAttributes } ) {
	delete attributes?.smb?.alignSelf;
	const newSMB = { ...attributes?.smb };

	setAttributes( {
		smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
	} );
}

export function useIsAlignSelfDisabled( {
	name: blockName,
	attributes: { __unstableSMBSupports },
} = {} ) {
	return (
		! hasBlockSupport( blockName, 'smb.alignSelf' ) &&
		! __unstableSMBSupports?.alignSelf
	);
}

export function AlignSelfEdit( props ) {
	const {
		attributes: { smb },
		setAttributes,
	} = props;

	const justificationOptions = [
		{
			value: 'start',
			icon: alignTop,
			label: __( 'Align items top' ),
		},
		{
			value: 'center',
			icon: alignCenter,
			label: __( 'Align items center' ),
		},
		{
			value: 'end',
			icon: alignBottom,
			label: __( 'Align items bottom' ),
		},
		{
			value: 'stretch',
			icon: alignStretch,
			label: __( 'Stretch items' ),
		},
	];

	return (
		<ToggleGroupControl
			label="align-self"
			value={ smb?.alignSelf || 'stretch' }
			onChange={ ( newValue ) => {
				const newSMB = {
					...smb,
					alignSelf: newValue || undefined,
				};
				if ( null == newSMB.alignSelf ) {
					delete newSMB.alignSelf;
				}

				setAttributes( {
					smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
				} );
			} }
			className="block-editor-hooks__flex-layout-justification-controls"
		>
			{ justificationOptions.map( ( { value, icon, label } ) => {
				return (
					<ToggleGroupControlOptionIcon
						key={ value }
						value={ value }
						icon={ icon }
						label={ label }
					/>
				);
			} ) }
		</ToggleGroupControl>
	);
}

export function saveAlignSelfProp( extraProps, blockType, attributes ) {
	if (
		! hasBlockSupport( blockType, 'smb.alignSelf' ) &&
		! attributes?.__unstableSMBSupports?.alignSelf
	) {
		delete attributes?.smb?.alignSelf;
		if ( !! attributes?.smb && ! Object.keys( attributes?.smb ).length ) {
			delete attributes?.smb;
		}
		return extraProps;
	}

	if ( undefined === attributes?.smb?.alignSelf ) {
		return extraProps;
	}

	extraProps.style = {
		...extraProps.style,
		'--smb--align-self': attributes?.smb?.alignSelf,
	};

	return extraProps;
}

export function editAlignSelfProp( settings ) {
	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};
		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}
		return saveAlignSelfProp( props, settings, attributes );
	};

	return settings;
}
