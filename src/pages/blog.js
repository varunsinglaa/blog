import React from 'react';
import CommentBox from '../components/comments/comment-box';

export default class BlogPage extends React.Component {
  render() {
    return (
        <div>
          <div className="cell">
            <article className="article">
              <h1 className="article-title">Personal Development</h1>
              <div className="article-body">
                <p>
                Personal development is a lifelong process. It is a way for people to assess their skills and qualities, consider their aims in life and set goals in order to realise and maximise their potential.

This page helps you to identify the skills you need to set life goals which can enhance your employability prospects, raise your confidence, and lead to a more fulfilling, higher quality life. Plan to make relevant, positive and effective life choices and decisions for your future to enable personal empowerment.
                </p>
                <blockquote>
                Some of the things that we all want for ourselves include: enhancing the quality of our lives, achieving more, becoming better people, and trying to be a better version of ourselves. That’s why we set personal development goals in our lives.
                </blockquote>
                <br></br>
                <p>“I wish for you a life of wealth, health and happiness; a life in which you give to yourself the gift of patience, the virtue of reason, the value of knowledge, and the influence of faith in your own ability to dream about and to achieve worthy rewards.” 
                </p>
              </div>
            </article>
          </div>

          {/* Load the component CommentBox with the required prop apiUrl */}
          <CommentBox apiUrl="api/blog/comments.json" />
        </div>
    )
  }
}