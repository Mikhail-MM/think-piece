import React, { Component } from 'react';

import { firestore } from '../firebase';

import { collectIdsAndDocs } from '../utils';
import Posts from './Posts';

class Application extends Component {
  state = {
    posts: [],
  };

  componentDidMount = async () => {
    const snapshot = await firestore.collection('posts').get()
    // snapshot.docs is a getter 
    const posts = snapshot.docs.map(collectIdsAndDocs);
    this.setState({posts})
    console.log(this.state.posts)
  }

  handleCreate = async post => {
    const docRef = await firestore.collection('posts').add(post)
    const doc = await docRef.get();
    const newPost = collectIdsAndDocs(doc);
    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts]
    }));
  };

  handleRemove = async event => {
    const { currentTarget: { dataset: { id }}} = event;
    const { posts } = this.state;
    const deleted = await firestore.doc(`posts/${id}`).delete();
    const filteredState = posts.filter(post => post.id !== id);
    this.setState({ posts: filteredState});
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts 
          posts={posts} 
          onCreate={this.handleCreate} 
          onRemove={this.handleRemove}/>
      </main>
    );
  }
}

export default Application;
