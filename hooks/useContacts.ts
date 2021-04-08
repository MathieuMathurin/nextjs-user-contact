import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import fetchJson from '../lib/fetchJson';
import { Contact } from '../models/contact';

export function useContacts() {
  const [session, isLoadingSession] = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContacts = useCallback(async () => {
    if (isLoadingSession) {
      setIsLoading(true);
      return;
    }

    setIsLoading(true);
    const data = await fetchJson<{ contacts: Contact[] }>(`/api/users/${session.user.email}/contacts`);
    setContacts(data.contacts);
    setIsLoading(false);

  }, [isLoadingSession])

  useEffect(() => {
    (async () => {
      await getContacts();
    })();
  }, [isLoadingSession]);

  return {
    contacts,
    getContacts,
    isLoading
  };
}
