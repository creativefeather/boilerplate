import React, { Component } from 'react';

import MarkdownEditor from './MarkdownEditor.jsx';

export default
class MarkdownPreviewer extends Component {
  render() {
    return (
      <div className="container">
        <MarkdownEditor />
      </div>
    )
  }
}