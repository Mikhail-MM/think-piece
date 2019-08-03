import React from 'react';

import { AuthContext } from '../providers/AuthProvider';

// Helper function that looks for name of a component and sets it in React DevTools...
// These dynamically generated HOC can actually have errors that obfuscates the display name

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const withUser = Component => {
    const WrappedComponent = props => {
        return <AuthContext.Consumer>
                {user => <Component user={user} {...props} />}
            </AuthContext.Consumer>
    }
    
    WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`;
    return WrappedComponent
}


export default withUser;