import React from 'react'
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from '../providers/PostsProvider';

const Posts = ({ user }) => {
  return (
    <section className="Posts">
      <AddPost user={user}/>
      <PostsContext.Consumer>
        {
          value => value.map(post => <Post {...post} key={post.id} />)
        }
      </PostsContext.Consumer>
    </section>
  )
}

export default Posts;
