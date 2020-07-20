import React from 'react';

import './comment.css';

import CommentConfirmation from './comment-confiramtion';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    // state allows to do Indirect DOM Manipulation
    this.state = {
      isAbusive: false
    };
    this._handleConfirm = this._handleConfirm.bind(this);
    this._toggleAbuse = this._toggleAbuse.bind(this);
  }

  render() {

    let commentBody;

    if (!this.state.isAbusive) {
      commentBody = this.props.body;
    } else {
      commentBody = <em>Content marked as abusive</em>;
    }

    return(
        <div className="comment">

          <img src={this.props.avatarUrl} alt={`${this.props.author}`} />

          <p className="comment-header">{this.props.author}</p>
          <p className="comment-body">{commentBody}</p>

          <div className="comment-actions">
            <CommentConfirmation onDelete={this._handleConfirm}>
              Delete Comment?
            </CommentConfirmation>
            <CommentConfirmation onDelete={this._toggleAbuse}>
              Report as abuse
            </CommentConfirmation>
          </div>
        </div>
    );
  }
 _toggleAbuse() {
    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }

  _handleConfirm() {
    this.props.onDelete(this.props.id);
  }
}