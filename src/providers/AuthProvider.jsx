import React, { Component, createContext } from 'react';

import { auth, createUserProfileDocument } from '../firebase';

export const AuthContext = createContext();

class AuthProvider extends Component {
    state = {
        user: null
    };
    
    unsubscribeAuth = null;

    componentDidMount = async () => {
        this.unsubscribeAuth = auth.onAuthStateChanged(async user => {
            if (user) {                        
              const userRef = await createUserProfileDocument(user);
                userRef.onSnapshot(snapshot => {
                    this.setState({
                        user: { uid: snapshot.id, ...snapshot.data()}
                    })
                })
            } else {
              this.setState({user})
            }
        })
    }

    render() {
        const { user } = this.state;
        const { children } = this.props;

        return(
            <AuthContext.Provider value={user}>
                { children }
            </AuthContext.Provider>
        )
    }
}

export default AuthProvider;