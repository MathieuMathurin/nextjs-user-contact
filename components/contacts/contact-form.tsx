import { Button, TextField, makeStyles, createStyles, Theme, Avatar } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Contact } from "../../models/contact";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: theme.spacing(16),
            height: theme.spacing(16),
            cursor: 'pointer'
        },
        centered: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }),
);

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    address: yup
        .string()
        .required('Address is required'),
    jobTitle: yup
        .string()
        .required('Job title is required'),
    phone1: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid'),
    phone2: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
});

interface CreateContactForm {
    name: string;
    email: string;
    address: string;
    jobTitle: string;
    phone1: string;
    phone2: string;
    picture: string;
}

export default function ContactForm({ contact, formId, onSubmit }: { contact?: Contact, formId: string, onSubmit: (contact: Omit<Contact, 'id' | 'userId'>) => Promise<void> }) {
    const classes = useStyles();
    const [phone1, phone2] = contact?.phoneNumbers ?? [];
    const formik = useFormik<CreateContactForm>({
        initialValues: {
            name: contact?.name ?? '',
            email: contact?.email ?? '',
            address: contact?.address ?? '',
            jobTitle: contact?.jobTitle ?? '',
            phone1: phone1 ?? '',
            phone2: phone2 ?? '',
            picture: contact?.picture ?? ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const contact: Omit<Contact, 'id' | 'userId'> = {
                ...values,
                phoneNumbers: [
                    values.phone1,
                    values.phone2
                ]
            }

            await onSubmit(contact);
            formik.resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} id={formId}>
            <div className={classes.centered}>
                <Button component="label">
                    <Avatar className={classes.avatar} src={formik.values.picture} />
                    <input
                        type="file"
                        id="picture"
                        accept="image/*"
                        hidden
                        onChange={(event) => {
                            formik.setFieldValue("picture", URL.createObjectURL(event.currentTarget.files[0]));
                        }}
                    />
                </Button>
            </div>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                {...formik.getFieldProps('name')}
            />
            <TextField
                required
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                {...formik.getFieldProps('email')}
            />
            <TextField
                required
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                {...formik.getFieldProps('address')}
            />
            <TextField
                required
                margin="dense"
                id="jobTitle"
                label="Job Title"
                type="text"
                fullWidth
                {...formik.getFieldProps('jobTitle')}
            />
            <TextField
                required
                margin="dense"
                id="phone1"
                label="Phone number 1"
                type="tel"
                fullWidth
                {...formik.getFieldProps('phone1')}
            />
            <TextField
                margin="dense"
                id="phone2"
                label="Phone number 2"
                type="tel"
                fullWidth
                {...formik.getFieldProps('phone2')}
            />
        </form>
    );
}