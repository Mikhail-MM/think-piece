import React, { Component } from 'react';

import { signInWithGoogle, auth, createUserProfileDocument} from '../firebase';

import Posts from './Posts';
import Authentication from './Authentication';

class Application extends Component {
  state = {
    user: null
  };

  unsubscribeAuth = null;

  componentDidMount = async () => {
    
    this.unsubscribeAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const { metadata: { creationTime}, ...userData } = user;
        const loggedUser = await createUserProfileDocument(user);
        this.setState({user: {
          createdAt: creationTime,
          ...userData
        }})
      } else {
        this.setState({user})
      }
    })

  }
  

  render() {
    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication signInWithGoogle={signInWithGoogle} user={this.state.user}/>
        <Posts user={this.state.user}/>
      </main>
    );
  }
}

export default Application;
