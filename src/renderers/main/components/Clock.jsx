import React, { Component } from 'react';

import FormattedDate from './FormattedDate';

export default
class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleClick = (e) => {
    console.log("Clicked");
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleClick}>Clock</h1>
        <FormattedDate date={this.state.date} />
      </div>
    )
  }
}