import React, { Component } from 'react';

import { firestore, signInWithGoogle } from '../firebase';

import { collectIdsAndDocs } from '../utils';

import Posts from './Posts';
import Authentication from './Authentication';

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;

  componentDidMount = async () => {
    // onSnapshot takes a callback that we want called every time a new snapshot is registered
    // returns a function we can use to unsubscribe
    this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({posts})
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication signInWithGoogle={signInWithGoogle} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
