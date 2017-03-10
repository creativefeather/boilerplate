import React, { Component } from 'react';

import Welcome from './Welcome';
import Clock from './Clock';
import '@native/myaddon';

const path = require('path');
const os = require('os');

export default 
class App extends Component {
  render() {
    let name = path.basename(os.homedir());
    return (
    <div>
      <Welcome name={name} />
      <Clock />
    </div>
  );
  }
}