import React, { useContext } from 'react';

import moment from 'moment';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider'

const belongsToCurrentUser = (currentUser, postAuthor) => {
  if (!currentUser) return false;
  return currentUser.uid === postAuthor.uid;
}

const Post = ({ id, title, content, user, createdAt, stars, comments }) => {

  const currentUser = useContext(AuthContext);
  
  const postRef = firestore.doc(`posts/${id}`)
  
  // This is essentially a Promise, but we don't need to wait for it to resolve
  // Subscribing to the firebase store takes care of that.
  const remove = () => postRef.delete();
  const update = () => postRef.update({
    stars: stars + 1
  })
  
  return (
    <article className="Post">
      <div className="Post--content">
        <Link to={`/posts/${id}`}><h3>{title}</h3></Link>
        <div>{content}</div>
      </div>
      <div className="Post--meta">
        <div>
          <p>
            <span role="img" aria-label="star">
              ⭐️
            </span>
            {stars}
          </p>
          <p>
            <span role="img" aria-label="comments">
              🙊
            </span>
            {comments}
          </p>
          <p>Posted by {user.displayName}</p>
          <p>{moment(createdAt.toDate()).calendar()}</p>
        </div>
        <div>
          <button className="star" onClick={update}>Star</button>
          { belongsToCurrentUser(currentUser, user) &&
            <button className="delete" onClick={remove}>Delete</button>
          }
        </div>
      </div>
    </article>
  );
};

Post.defaultProps = {
  title: 'An Incredibly Hot Take',
  content:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.',
  user: {
    id: '123',
    displayName: 'Bill Murray',
    email: 'billmurray@mailinator.com',
    photoURL: 'https://www.fillmurray.com/300/300',
  },
  createdAt: new Date(),
  stars: 0,
  comments: 0,
};

export default Post;
