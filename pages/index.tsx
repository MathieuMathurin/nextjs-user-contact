import { useState } from 'react';
import { Paper, Container, makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import withAuthentication from '../lib/withAuthentication';
import { useContacts } from '../hooks/useContacts';
import CreateContact from '../components/contacts/create-contact';
import ContactsTable from '../components/contacts/contacts-table';
import ManageContact from '../components/contacts/manage-contact';
import Loader from '../components/loader';
import { Contact } from '../models/contact';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createContact: {
      margin: '12px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }),
);

function Home() {
  const { contacts, isLoading, getContacts } = useContacts();
  const classes = useStyles();
  const [showUpdateComponent, setShowUpdateComponent] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact>();

  const handleContactSelected = (contact: Contact) => {
    setSelectedContact(contact);
    setShowUpdateComponent(true);
  };

  const reset = () => {
    setSelectedContact(undefined);
    setShowUpdateComponent(false);
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <Container maxWidth="lg">
        <div className={classes.createContact}>
        <Typography variant="h2">
          Contacts
        </Typography>
          <CreateContact onContactCreated={getContacts} />
          <ManageContact 
            isDisplayed={showUpdateComponent} 
            contact={selectedContact} 
            onContactUpdated={() => {reset(); getContacts();}}
            onContactDeleted={() => {reset(); getContacts();}}
            onCancel={reset} 
          />
        </div>
        <Paper>
          <ContactsTable contacts={contacts} onContactClicked={handleContactSelected} />
        </Paper>
      </Container>
    </>
  );
}

export default withAuthentication(Home);