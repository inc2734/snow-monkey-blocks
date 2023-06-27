import classnames from 'classnames';

import {
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetGapCSSValue as getGapCSSValue,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		columnsOption,
		columns,
		columnMinWidth,
		columnAutoRepeat,
		gridTemplateColumns,
		rowsOption,
		rows,
		gridTemplateRows,
		style,
	} = attributes;

	const blockGapValue =
		style?.spacing?.blockGap &&
		getGapCSSValue( style?.spacing?.blockGap, '0px' );

	const classes = classnames(
		'smb-grid',
		`smb-grid--columns:${ columnsOption }`,
		`smb-grid--rows:${ rowsOption }`,
		className
	);

	const styles = {
		'--smb-grid--gap': blockGapValue || undefined,
		'--smb-grid--columns':
			( 'columns' === columnsOption && String( columns ) ) || undefined,
		'--smb-grid--column-min-width':
			( 'min' === columnsOption && columnMinWidth ) || undefined,
		'--smb-grid--column-auto-repeat':
			( 'min' === columnsOption && columnAutoRepeat ) || undefined,
		'--smb-grid--grid-template-columns':
			( 'free' === columnsOption && gridTemplateColumns ) || undefined,
		'--smb-grid--rows':
			( 'rows' === rowsOption && String( rows ) ) || undefined,
		'--smb-grid--grid-template-rows':
			( 'free' === rowsOption && gridTemplateRows ) || undefined,
	};

	return (
		<div
			{ ...useInnerBlocksProps.save( {
				...useBlockProps.save( { className: classes, style: styles } ),
			} ) }
		/>
	);
}
