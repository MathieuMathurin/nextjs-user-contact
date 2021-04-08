import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Avatar } from '@material-ui/core';
import { Contact } from '../../models/contact';

interface Column {
    id: 'name' | 'email' | 'jobTitle';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'jobTitle', label: 'Job Title', minWidth: 170 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    clickable: {
        cursor: 'pointer'
    }
});

export default function ContactsTable({ contacts, onContactClicked }: { contacts: Contact[], onContactClicked: (contact: Contact) => void }) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={contact.id} onClick={() => onContactClicked(contact)} className={classes.clickable}>
                                    {columns.map((column) => {
                                        const value = contact[column.id];
                                        if (column.id === 'name' && contact.picture) {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <div className={classes.flex}>
                                                        <Avatar src={contact.picture} />
                                                        {value}
                                                    </div>
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={contacts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}