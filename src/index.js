import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';
import PostsProvider from './providers/PostsProvider';
import AuthProvider from './providers/AuthProvider';

import {BrowserRouter as Router} from 'react-router-dom';

render(
  <Router>
    <PostsProvider>
      <AuthProvider>
        <Application />
      </AuthProvider>
    </PostsProvider>
  </Router>, 
  document.getElementById('root')
);
