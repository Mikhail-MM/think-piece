import React, { Component } from 'react';
import { firestore } from '../firebase';
class AddPost extends Component {
  state = { title: '', content: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { title, content } = this.state;
    const { uid, displayName, email, photoURL } = this.props.user || {} // Will blow up if destructuring from null

    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date(),
    }

    try {
      if (!this.props.user) {
        console.log("You must be logged in to post.")
        return;
      }
      await firestore.collection('posts').add(post)
    } catch(err) {
      console.error(err);
    }
  
    this.setState({ title: '', content: '' });
  };

  render() {
    const { title, content } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="AddPost">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Body"
          value={content}
          onChange={this.handleChange}
        />
        <input className="create" type="submit" value="Create Post" />
      </form>
    );
  }
}

export default AddPost;
