import { firestore } from './firebase';

export const collectIdsAndDocs = doc => ({id: doc.id, ...doc.data()})

const oldComponentDidMount = async () => {
    const snapshot = await firestore.collection('posts').get()
    // snapshot.docs is a getter 
    const posts = snapshot.docs.map(collectIdsAndDocs);
    this.setState({posts})
}

const oldHandleCreate = async post => {
    const docRef = await firestore.collection('posts').add(post)
    const doc = await docRef.get();
    const newPost = collectIdsAndDocs(doc);

    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts]
    }));
  };

const oldHandleRemove = async event => {
const { currentTarget: { dataset: { id }}} = event;
const { posts } = this.state;
const deleted = await firestore.doc(`posts/${id}`).delete();
const filteredState = posts.filter(post => post.id !== id);
this.setState({ posts: filteredState});
}