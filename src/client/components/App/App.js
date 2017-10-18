import React, { Component } from 'react';
import css from './App.css';

export default class App extends Component {
  static displayName = "My-App";

  render() {
    return (
      <h1 className={css.heading}>Hello App!!! </h1>
    )
  }
}