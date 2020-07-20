import React from 'react';

import './comment-form.css';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: 0
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getCharacterCount = this._getCharacterCount.bind(this);
  }

  render() {
    return (
        <form className="comment-form" onSubmit={this._handleSubmit}>
          <label>New comment</label>
          <div className="comment-form-fields">
            {/* refs allow us to access input data from submit handler. React calls the ref function when it renders the component */}
            <input placeholder="Name:" ref={input => this._author = input}/>
            <textarea placeholder="Comment:" ref={textarea => this._body = textarea} onChange={this._getCharacterCount}></textarea>
          </div>
          <p>{this.state.characters} characters</p>
          <div className="comment-form-actions">
            <button type="submit">
              Post comment
            </button>
          </div>
        </form>
    );
  }

  _getCharacterCount() {

    this.setState({
      characters: this._body.value.length
    });

  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({characters: 0});
  }
}