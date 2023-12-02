import { useState } from 'react';
import { UserProvider } from '@/context/user';

export default function App({ children }: any) {
    const [user, setUser] = useState(null);
    
    return (
        <UserProvider value={{ user, setUser }}>
        {children}
        </UserProvider>
    );
    }