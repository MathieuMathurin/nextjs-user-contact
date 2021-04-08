import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, createStyles, Theme, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useContactCreation } from '../../hooks/useContactCreation';
import ContactForm from './contact-form';
import Loader from '../loader';
import { Contact } from '../../models/contact';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed'
    }
  }),
);

export default function CreateContact({ onContactCreated }: { onContactCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [createContact, res] = useContactCreation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (contact: Contact) => {
    await createContact(contact);
    onContactCreated();
    handleClose();
  }

  return (
    <>
      <Loader isLoading={res.isLoading} />
      <Fab variant="extended" color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
        Add contact
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create contact</DialogTitle>
        <DialogContent>
          <ContactForm formId="createContact" onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button form="createContact" type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}