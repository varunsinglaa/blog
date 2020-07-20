import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import './comment-box';

import CommentForm from './comment-form';
import CommentAvatarList from './comment-avatar-list';
import Comment from './comment';

export default class CommentBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showComments: true,
      comments: []
    };
    this._addComment = this._addComment.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }
  componentWillMount() {
    this._fetchComments();
  }

  render() {
    const comments = this._getComments();

    let commentNode;
    let buttonText = 'Show comments';

    if (this.state.showComments) {
      buttonText = 'Hide comments';
      commentNode = (<div className="comment-list">{comments}</div>);
    }

    return (
        <div className="row comments-container">
          <div className="cell">
            <h2>Join The Discussion</h2>
            <div className="comment-box">
              <CommentForm addComment={this._addComment}/>
              <CommentAvatarList avatars={this._getAvatars()}/>

              {this._getPopularMessage(comments.length)}
              <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
              {this._getCommentsVisibility(comments.length, buttonText)}
              {commentNode}
            </div>
          </div>
        </div>

    );
  }

  _getAvatars() {
    return this.state.comments.map(comment => comment.avatarUrl);
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      // we are passing arguments that in React are called props to the child component
      return <Comment
          {...comment}
          onDelete={this._deleteComment}
          key={comment.id}/>
    });
  }

  _addComment(commentAuthor, commentBody) {
    const comment = {
      id: this.state.comments.length + 1,
      author: commentAuthor,
      body: commentBody,
      avatarUrl: 'assets/images/avatars/avatar-default.png'
    };

    // array concatenation shortcut. This says “the start of the array should remain this.state.greetings,
    // but I also want you to add newName onto the end of the array.
    // This should return a new modified copy of the array but not change the original.”
    // This is because React state works with Immutability principle
    this.setState({comments: [...this.state.comments, comment]});
  }

  _fetchComments() {
    axios.get(this.props.apiUrl)
        .then(response => {
          const comments = response.data;
          this.setState({comments});
        });
  }

  _handleClick(event) {
    event.preventDefault();
    this.setState({showComments: !this.state.showComments});
  }

  _deleteComment(commentID) {
    const comments = this.state.comments.filter(
        comment => comment.id !== commentID
    );
    this.setState({comments});
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return (
          <div>This post is getting really popular, dont miss out!</div>
      );
    }
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  _getCommentsVisibility(commentCount, buttonText){
    if (commentCount) {
      return (
          <div className="comment-visibility-actions">
            <button onClick={this._handleClick}>{buttonText}</button>
          </div>
      );
    }
  }
}

CommentBox.propTypes = {
  apiUrl: PropTypes.string.isRequired
};