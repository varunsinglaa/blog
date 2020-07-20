import React from 'react';

import './hello.css'

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: 'Hello'
    };

    this._frenchify = this._frenchify.bind(this);
    this._removeGreeting = this._removeGreeting.bind(this);
  }

  render() {
    return (
      <div className="hello">{this.state.greeting} {this.props.name}!
        <button onClick={this._frenchify}>Greeting!!</button>&nbsp;
        <button onClick={this._removeGreeting}>Delete</button>
      </div>
    );
  }

  _frenchify(event) {
    event.preventDefault();
    this.setState({ greeting: 'Hi' });
  }

  _removeGreeting(event) {
    event.preventDefault();
    this.props.removeGreeting(this.props.name);
  }
}
