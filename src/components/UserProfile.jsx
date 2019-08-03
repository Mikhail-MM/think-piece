import React, { Component } from 'react'
import { auth } from '../firebase';
import { firestore } from '../firebase';
import { storage } from '../firebase';

class UserProfile extends Component {
    state = { displayName: '' };
    
    imageInput = null;

    get uid() {
        return auth.currentUser.uid
    }

    get userRef() {
        return firestore.collection('users').doc(this.uid);
    }

    get file() {
        return this.imageInput && this.imageInput.files[0]
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }
    
    handleSubmit = async event => {
        event.preventDefault();
        const { displayName } = this.state;
        try {
            if (displayName) {
                this.userRef.update(this.state)
            }
            if (this.file) {
                // Storage URL:
                // user-profiles/{userId}/{fileName}
                storage.ref()
                .child('user-profiles')
                .child(this.uid)
                .child(this.file.name)
                .put(this.file)
                .then(response => {
                    // Returns a reference.
                    // Get the URL from the reference.
                    return response.ref.getDownloadURL()
                })
                .then(photoURL => this.userRef.update({ photoURL }))

            }
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { displayName } = this.state;
        return(
            <section className="UserProfile">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        placeholder="Display Name"
                    />
                    <input 
                        type="file"
                        ref={ ref => this.imageInput = ref }
                    />
                    <input type="submit" className="submit"/>
                </form>
            </section>
        )
    }
}

export default UserProfile;