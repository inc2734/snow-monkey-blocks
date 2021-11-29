import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { BaseControl } from '@wordpress/components';

export default function ( { label, ...props } ) {
	return (
		<BaseControl
			label={ label }
			id="snow-monkey-blocks/component/search-post-control"
		>
			<div className="smb-search-post-control">
				<LinkControl
					{ ...props }
					forceIsEditingLink={ ! props?.value?.id }
				/>
			</div>
		</BaseControl>
	);
}
