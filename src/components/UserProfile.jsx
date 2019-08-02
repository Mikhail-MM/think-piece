import React, { Component } from 'react'
import { auth } from '../firebase';
import { firestore } from '../firebase';

class UserProfile extends Component {
    state = { displayName: '' };
    
    imageInput = null;

    get uid() {
        return auth.currentUser.uid
    }

    get userRef() {
        return firestore.collection('users').doc(this.uid);
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
        } catch (err) {
            console.errror(err)
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