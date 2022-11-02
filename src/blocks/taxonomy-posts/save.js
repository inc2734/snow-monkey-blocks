import { useBlockProps } from '@wordpress/block-editor';

export default function () {
	return (
		<div
			{ ...useBlockProps.save() }
			data-dynamic-block="snow-monkey-blocks/taxonomy-posts"
			data-version="2"
		></div>
	);
}
