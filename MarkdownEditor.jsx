import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default
class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
  }

  onChange = (editorState) => {
    console.log('onChange');
    this.setState({ editorState }) 
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