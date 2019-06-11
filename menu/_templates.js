'use strict';

const { Component } = wp.element;
const { Button, PanelBody } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

export class MenuTemplates extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return (
			<Fragment>
				<PanelBody
					title={ __( 'Header', 'snow-monkey-blocks' ) }
				>

					<Button>Test Header</Button>

				</PanelBody>
			</Fragment>
		);
	}
}
