import React, { Component } from 'react';

export default 
function FormattedDate(props) {
  return <h2>{ props.date.toLocaleTimeString() }</h2>;
}