import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/client';
import { Contact } from '../models/contact';

export function useContactDeletion() {
    const [session, isLoadingSession] = useSession();
    const [res, setRes] = useState({ error: null, isLoading: false });

    const deleteContact = useCallback(async (contact: Contact) => {
        if (isLoadingSession) {
            setRes(prevState => ({ ...prevState, isLoading: true }));
            return;
        }

        setRes(prevState => ({ ...prevState, isLoading: true }));

        const response = await fetch(`/api/users/${session.user.email}/contacts/${contact.id}`, {
            method: 'DELETE'
        });
        
        if(response.ok) {
            setRes({ isLoading: false, error: null });
        } else {
            const data = response.json();
            setRes({ isLoading: false, error: data });
        }
    }, [isLoadingSession])
    
    return [deleteContact, res] as const;
}
