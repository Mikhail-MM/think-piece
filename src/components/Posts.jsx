import React, { useContext } from 'react'
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from '../providers/PostsProvider';
import { AuthContext } from '../providers/AuthProvider';


const Posts = () => {
  const posts = useContext(PostsContext);
  const user = useContext(AuthContext);

  return (
    <section className="Posts">
      <AddPost user={user}/>
      { posts.map(post => <Post {...post} key={post.id} />) }
    </section>
  )
}

export default Posts;
