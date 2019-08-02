import React from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';

import { AuthContext } from '../providers/AuthProvider';

const Authentication = ({ loading, signInWithGoogle }) => {
  if (loading) return null;

  return <div>
    <AuthContext.Consumer>
      { user => {
        return user ? <CurrentUser {...user} /> : <SignInAndSignUp signInWithGoogle={signInWithGoogle}/>
      }}
    </AuthContext.Consumer>
  </div>
};

export default Authentication;
