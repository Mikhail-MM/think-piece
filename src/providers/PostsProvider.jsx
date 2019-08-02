import React, { Component, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utils';

export const PostsContext = createContext();

class PostsProvider extends Component {
    state = { posts: [] };

    unsubscribe = null;
  
    componentDidMount = () => {
        // onSnapshot takes a callback that we want called every time a new snapshot is registered
            // returns a function we can use to unsubscribe
        this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
            const posts = snapshot.docs.map(collectIdsAndDocs);
            this.setState({posts})
        });
    };

    componentWillUnmount = () => {
        this.unsubscribe();
    };

    render() {
        const { posts } = this.state;
        const { children}  = this.props;

        return(

            <PostsContext.Provider value={posts}>
                {children}
            </PostsContext.Provider>
        )
    };

};

export default PostsProvider;