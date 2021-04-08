import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/client';
import { Contact } from '../models/contact';

export function useContactUpdate() {
    const [session, isLoadingSession] = useSession();
    const [res, setRes] = useState({ error: null, isLoading: false });

    const updateContact = useCallback(async (contact: Contact) => {
        if (isLoadingSession) {
            setRes(prevState => ({ ...prevState, isLoading: true }));
            return;
        }

        setRes(prevState => ({ ...prevState, isLoading: true }));

        const response = await fetch(`/api/users/${session.user.email}/contacts/${contact.id}`, {
            body: JSON.stringify(contact),
            method: 'PUT'
        });

        
        if(response.ok) {
            setRes({ isLoading: false, error: null });
        } else {
            const data = response.json();
            setRes({ isLoading: false, error: data });
        }
    }, [isLoadingSession])
    
    return [updateContact, res] as const;
}
