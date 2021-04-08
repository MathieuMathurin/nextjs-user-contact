import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/client';
import { Contact } from '../models/contact';

export function useContactCreation() {
    const [session, isLoadingSession] = useSession();
    const [res, setRes] = useState({ data: null, error: null, isLoading: false });

    const createContact = useCallback(async (contact: Omit<Contact, 'id' | 'userId'>) => {
        if (isLoadingSession) {
            setRes(prevState => ({ ...prevState, isLoading: true }));
            return;
        }

        setRes(prevState => ({ ...prevState, isLoading: true }));

        const response = await fetch(`/api/users/${session.user.email}/contacts`, {
            body: JSON.stringify(contact),
            method: 'POST'
        });

        const data = response.json();
        
        if(response.ok) {
            setRes({ data, isLoading: false, error: null });
        } else {
            setRes({ data: null, isLoading: false, error: data });
        }
    }, [isLoadingSession])
    
    return [createContact, res] as const;
}
