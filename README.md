This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
> npm install
> npm run dev
# or
> yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

OR

Open [Heroku app](https://mathieu-mathurin-contact-app.herokuapp.com/)

## Authentication

The application uses Github as a OAuth identity provider. Be sure to have a valid Github account to be able to interact with the application.

## What's missing
- Units tests
- Branded Sign in page
- Better error handling
- Empty states
- Translations
- Secrets management

## Mocked API

The http calls are mocked using [Mirage](https://miragejs.com/) which is running a server alongside the frontend application.

There are 5 routes being mocked by Mirage.

### Contact model
The contact model has the minimum required information, an id and a userId field used as a foreign key for a relational model.
```typescript
interface Contact {
    id: string
    userId: string
    name: string
    jobTitle: string
    address: string
    phoneNumbers: string[]
    email: string
    picture?: string
}

```

### /users/:userId/contacts
#### GET
Get all the user contacts.
##### Response
```json
{
    "contacts": []
}
```
#### POST
Create a new contact for the user
##### Request Body
Same as Contact interface but withouth sending the id.
##### Response
Same as Contact interface. The server sets the id on the Contact model.

### /users/:userId/contacts/:contactId
#### GET
Get a specific contact by id
#### PUT
Update a specific contact by replacing all of it's content.
##### Request Body
Same as Contact interfacem but without sending the id.
##### Response
204 No Content
#### DELETE
Remove a specific contact.
##### Request
Empty body
##### Response
204 No Content