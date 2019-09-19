import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


export default function LoginModal(props) {
    // React Hook to track 
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    // Function to Reset and Close
    function close() {
        updateUsername('');
        updatePassword('');
        props.handleClose();
    }
    // Rendering of Login Component 
    return <>
        <Dialog open={props.open} onClose={close}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your Register Username and Password
                </DialogContentText>
                <TextField autoFocus margin="normal" label="Username" type="text" fullWidth
                    value={username} onChange={event => updateUsername(event.target.value)} />
                <TextField margin="normal" label="Password" type="password" fullWidth
                    value={password} onChange={event => updatePassword(event.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    props.login(username, password);
                    close();
                }} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    </>
}