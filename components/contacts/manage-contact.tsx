import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, createStyles, Theme, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ContactForm from './contact-form';
import { Contact } from '../../models/contact';
import { useContactUpdate } from '../../hooks/useContactUpdate';
import { useContactDeletion } from '../../hooks/useContactDeletion';
import Loader from '../loader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }),
);

export default function ManageContact({ isDisplayed, contact, onContactUpdated, onContactDeleted, onCancel }: { isDisplayed: boolean, contact: Contact, onContactUpdated?: () => void, onContactDeleted?: () => void, onCancel?: () => void }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [updateContact, updateRes] = useContactUpdate();
  const [deleteContact, deleteRes] = useContactDeletion();

  const handleSubmit = async (updatedContact: Contact) => {
    await updateContact({
      ...contact,
      ...updatedContact
    });
    onContactUpdated();
  }

  const handleDelete = async () => {
    setOpen(true);
  }

  const confirmDelete = async () => {
    await deleteContact(contact);
    setOpen(false);
    onContactDeleted();
  }

  return (
    <>
    <Loader isLoading={updateRes.isLoading || deleteRes.isLoading} />
      <Dialog open={isDisplayed} onClose={onCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <div className={classes.flexTitle}>
            <p>Create contact</p>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <ContactForm contact={contact} formId="updateContact" onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
          <Button form="updateContact" type="submit" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Delete contact
        </DialogTitle>
        <DialogContent>
          Are you sure?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            No
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}