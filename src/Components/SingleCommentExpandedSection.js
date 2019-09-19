import React, { useState } from 'react';
// Material Ui
import { Container, Button, CircularProgress, IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
// Apollo's Queries
import { ADD_COMMENT, EDIT_COMMENT, LIKE_COMMENT, DISLIKE_COMMENT } from '../Api/queries';
// Apollo's Hooks
import { useMutation } from '@apollo/react-hooks';
import SingleComment from './SingleComment';
import { ThumbDownAltTwoTone, ThumbUpAltTwoTone, EditTwoTone, ReplyTwoTone } from '@material-ui/icons';
//Custom Component
import Response from './Response';

//Custom Component For handling expanded Section of Comment in th Application 
function SingleCommentExpandedSection({ loading, notify, comment, userID, refetch, data }) {
    // React Hook to track 
    const [wantsToEdit, toggleEditFunctionality] = useState(false);
    const [wantsToReply, toggleReplyFunctionality] = useState(false);
    // Apollo's Mutation Hook for this Comment
    const [addReply] = useMutation(ADD_COMMENT, { update() { refetch(); } });
    const [like] = useMutation(LIKE_COMMENT, { update() { refetch(); } });
    const [dislike] = useMutation(DISLIKE_COMMENT, { update() { refetch(); } });
    const [editComment] = useMutation(EDIT_COMMENT, { update() { refetch(); } });
    if (loading) {
        return <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Container>
    }
    return <Container>
        <Container>
            {'postedBy' in comment && comment.postedBy.id === userID &&
                <Button color="secondary" variant="text" style={{ marginLeft: 4 }}
                    onClick={() => {
                        toggleEditFunctionality(!wantsToEdit);
                        toggleReplyFunctionality(false);
                    }} >
                    <EditTwoTone />
                    <span style={{ padding: 3 }}> Edit</span>
                </Button>
            }
            <Button color="primary" variant="text" style={{ marginLeft: 4 }}
                onClick={() => {
                    toggleReplyFunctionality(!wantsToReply);
                    toggleEditFunctionality(false);
                }} >
                <ReplyTwoTone />
                <span style={{ padding: 3 }}>Reply</span>
            </Button>
            <Badge badgeContent={data.comment.likes} max={10} color="primary">
                <Button variant="text" color="primary" style={{ marginLeft: 4 }}
                    onClick={() => {
                        like({ variables: { commentID: comment.id, } })
                        notify("You liked a Comment")
                    }}>
                    <ThumbUpAltTwoTone />
                    <span style={{ padding: 3 }}>
                        Like
                </span>
                </Button>
            </Badge>
            <Badge badgeContent={data.comment.dislikes} max={9} color="secondary">
                <Button variant="text" color="secondary" style={{ marginLeft: 4 }}
                    onClick={() => {
                        dislike({ variables: { commentID: comment.id, } })
                        notify("You disliked a Comment")
                    }}>
                    <ThumbDownAltTwoTone />
                    <span style={{ padding: 3 }}>Dislike</span>
                </Button>
            </Badge>
        </Container>
        <Response show={wantsToEdit} defaultValue={data.comment.message} placeholder="Update Your Comment"
            submit={newMessage => {
                if (userID.length > 0 && newMessage.length > 0) {
                    editComment({ variables: { newMessage: newMessage, commentID: comment.id, postedBy: userID } })
                    notify("Comment Edited")
                } else {
                    notify("Empty Message")
                }
                toggleReplyFunctionality(!wantsToEdit);
            }} />

        <Response show={wantsToReply}
            placeholder="Reply to the Comment"
            submit={messageString => {
                if (userID.length > 0 && messageString.length > 0) {
                    addReply({ variables: { message: messageString, postedBy: userID, parentComment: comment.id } })
                    notify("Comment Added")
                }
                else {
                    notify("Please Login First")
                }
                toggleReplyFunctionality(!wantsToReply);
            }}
        />                    {!!data && !!data.comment && data.comment.childComments.map((child, index) => {
            return <SingleComment key={index} comment={child} parentId={comment.id} userID={userID} notify={notify} />
        })}
    </Container>;

}

export default SingleCommentExpandedSection;