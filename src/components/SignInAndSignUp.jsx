import React from 'react'

import SignIn from './SignIn';
import SignUp from './SignUp';

const SignInAndSignUp = ({signInWithGoogle}) => (
  <div>
    <SignIn signInWithGoogle={signInWithGoogle}/>
    <SignUp />
  </div>
);

export default SignInAndSignUp;
