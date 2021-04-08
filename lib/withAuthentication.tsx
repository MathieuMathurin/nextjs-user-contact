import { useEffect, FunctionComponent } from 'react';
import { useSession, signIn } from 'next-auth/client'

export default function withAuthentication(WrappedComponent: FunctionComponent) {
  const RequiresAuthentication = props => {
    const [session, isLoading] = useSession();
    useEffect(() => {
      if (!session && !isLoading) {
        signIn(null, { callbackUrl: `${location.origin}/` })
      }
    }, [isLoading]);

    return session ? <WrappedComponent {...props} /> : null;
  }

  return RequiresAuthentication;
};