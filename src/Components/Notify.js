import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

//Component for Notification
export default function Notify({ open, setOpen, message }) {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionUp}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
        />
    );
}