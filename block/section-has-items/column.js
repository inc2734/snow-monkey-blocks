const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

class RpeatableColumn extends Component {
  constructor(props) {
    super(...arguments);
    this.props = props;
  }

  render() {
    return (
      <InnerBlocks />
    );
  }
}

RpeatableColumn.Content = InnerBlocks.Content;

export default RpeatableColumn;
