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
    console.log(post);
    const docRef = await firestore.collection('posts').add(post)
    console.log(docRef);
    const doc = await docRef.get();
    console.log(doc);
    const newPost = collectIdsAndDocs(doc);
    console.log(newPost)
    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts]
    }));
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} />
      </main>
    );
  }
}

export default Application;
