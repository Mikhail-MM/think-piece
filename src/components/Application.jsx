import React, { Component } from 'react';

import { firestore, signInWithGoogle, auth, createUserProfileDocument} from '../firebase';

import { collectIdsAndDocs } from '../utils';

import Posts from './Posts';
import Authentication from './Authentication';

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribeFirestore = null;
  unsubscribeAuth = null;

  componentDidMount = async () => {
    // onSnapshot takes a callback that we want called every time a new snapshot is registered
    // returns a function we can use to unsubscribe
    this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({posts})
    })
    this.unsubscribeAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        console.log(user);
        const { metadata: { creationTime}, ...userData } = user;
        console.log(Date(creationTime))
        const loggedUser = await createUserProfileDocument(user);
        this.setState({user: {
          createdAt: creationTime,
          ...userData
        }})
      }
    })
  }
  

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication signInWithGoogle={signInWithGoogle} user={this.state.user}/>
        <Posts posts={posts} user={this.state.user}/>
      </main>
    );
  }
}

export default Application;
