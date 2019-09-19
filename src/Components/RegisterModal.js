import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function RegisterModal(props) {
    // React Hook to track entered username
    const [username, updateUsername] = useState('');

    // React Hook to track entered password
    const [password, updatePassword] = useState('');

    // Function to Reset and Close
    function close() {
        updateUsername('');
        updatePassword('');
        props.handleClose();
    }

    // Rendering of Register Component 
    return <>
        <Dialog open={props.open} onClose={close}>
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your Details to Register
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
                    props.register({ variables: { username: username, password: password } });
                    close();
                }} color="primary">
                    Register
              </Button>
            </DialogActions>
        </Dialog>
    </>

}