import React from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';

const Authentication = ({ user, loading, signInWithGoogle }) => {
  if (loading) return null;

  return <div>{user ? <CurrentUser /> : <SignInAndSignUp signInWithGoogle={signInWithGoogle}/>}</div>;
};

export default Authentication;
