import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { AccountTree } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header({ userID, notify, updateRegisterFlag, updateLoginFlag, changeUserID }) {
    //classes to apply designs
    const classes = useStyles();
    return <>
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <AccountTree />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Your Thoughts
                </Typography>

                {/*Buttons to trigger Login And Register Popups */}
                {userID.toString().trim().length <= 0 && <>
                    <Button color="inherit" onClick={() => updateLoginFlag(true)} >Login</Button>
                    <Button color="inherit" onClick={() => updateRegisterFlag(true)}>Register</Button>
                </>}

                {userID.toString().trim().length > 0 && <>
                    <Button color="inherit" onClick={() => { changeUserID(''); notify("Logged Out") }} >Log Out</Button>
                </>}

            </Toolbar>
        </AppBar>
        <Toolbar />
    </>
}