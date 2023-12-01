import React from 'react'

const User: React.FC = () => {
    
    const [user, setUser] = React.useState('Login');
    
    return (
        
            <>{user}</>
    )
}


export default User;
    