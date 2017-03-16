import React, { Component } from 'react';

import MarkdownEditor from './MarkdownEditor.jsx';

export default
class MarkdownPreviewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <MarkdownEditor />
        <hr/>
        <div id="md"></div>
      </div>
    )
  }
}