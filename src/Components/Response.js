import React, { useState } from 'react';
//Material Ui
import { Button, Container, TextField } from '@material-ui/core';
import SendTwoTone from '@material-ui/icons/SendTwoTone';

//Reuseable Component for Submiting a Response
export default function Response({ show, placeholder, submit, defaultValue = "" }) {
    const [message, updateMessage] = useState(defaultValue);
    if (!show) {
        return null;
    }
    return (<Container style={{ display: 'flex' }}>
        <TextField color="primary" style={{ flex: 9 }} placeholder={placeholder}
            value={message} onChange={event => updateMessage(event.target.value)} />
        <Button color="primary" variant="outlined" style={{ flex: 1 }} onClick={() => { submit(message); updateMessage('') }}>
            Submit <SendTwoTone />
        </Button>
    </Container>);

}