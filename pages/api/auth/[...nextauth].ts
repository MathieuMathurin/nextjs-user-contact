import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: 'Iv1.5da25f15e4fc555a',
      clientSecret: 'a3a12321ea5886c61c728065343bf548de4a3fe6'
    }),
    // ...add more providers here
  ]
})