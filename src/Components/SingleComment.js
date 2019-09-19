import React from 'react';
// Material Ui
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, CircularProgress } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Apollo's Queries
import { GET_COMMENT } from '../Api/queries';
// Apollo's Hooks
import { useQuery } from '@apollo/react-hooks';
//Custom Component
import SingleCommentExpandedSection from './SingleCommentExpandedSection';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

// React Component show a Single Comment
function SingleComment({ comment, userID, notify }) {
    const classes = useStyles();

    // Apollo's Query Hook to get Comment Details
    const { loading, data, refetch } = useQuery(GET_COMMENT, { variables: { commentID: comment.id, } });

    //Apollo's Mutation Hook to add a new Comment
    return (<>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                {loading || !data || !data.comment ? <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Container> : <Typography className={classes.heading}>
                        {data.comment.message}
                    </Typography>}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ padding: "8px 0px" }}>
                <SingleCommentExpandedSection
                    loading={loading}
                    userID={userID}
                    refetch={refetch}
                    comment={comment}
                    data={data}
                    notify={notify}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </>
    )
}
export default SingleComment;