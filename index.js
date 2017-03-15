import React from 'react';
import ReactDOM from 'react-dom';

import MarkdownPreviewer from './MarkdownPreviewer.jsx';

ReactDOM.render(
  (new MarkdownPreviewer()).render(),
  document.getElementById('app')
)