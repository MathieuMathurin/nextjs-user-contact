import { useState, MouseEvent } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem } from '@material-ui/core';
import { signOut, useSession } from 'next-auth/client'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import styles from './header.module.scss';

export default function Header() {
    const [session] = useSession();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <img src='/favicon.ico' className={styles.logo} />
                <Typography variant="h6" className={styles.title}>
                    Contact App
                </Typography>
                {session &&
                    <>
                        <Avatar src={session.user.image} onClick={handleClick} className={styles.userIcon}>
                            {session.user.name}
                        </Avatar>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => { signOut({ callbackUrl: '/' }); handleClose() }}><><ExitToAppIcon /><p>Sign out</p></></MenuItem>
                        </Menu>
                    </>
                }
            </Toolbar>
        </AppBar>
    )
}