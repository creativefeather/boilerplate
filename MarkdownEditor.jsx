import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import marked from 'marked';

export default
class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
  }

  onChange = (editorState) => {
    this.setState({ editorState });
    let content = editorState.getCurrentContent();
    console.log(content);
    let alias = marked(content.getPlainText());
    document.getElementById('md').innerHTML = alias;
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState, 'BOLD'
    ));
  }

  render() {
    return (
      <div>
        <button onClick={this._onBoldClick}>Bold</button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div> 
    )
  }
}