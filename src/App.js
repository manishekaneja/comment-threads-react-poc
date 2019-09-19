import React, { useState, useEffect } from 'react';

//Material Ui
import { LinearProgress, Toolbar, Container, CssBaseline } from '@material-ui/core';

//Custom Components
import { LoginModal, RegisterModal, SingleComment, Response } from './Components';

//Client Object made from Apollo
import CLIENT from "./Api/apollo";

//Apollo's Hooks and Api's
import { ApolloProvider, useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';

//GraphQL Queries
import { REGISTER_USER, LOGIN_USER, GET_TOP_COMMENTS, ADD_ROOT_COMMENT } from './Api/queries';
import Header from './Components/Header';
import Notify from './Components/Notify';

function App() {


  // HOOKS
  //user id to identify any user
  const [userID, changeUserID] = useState('');
  //flag for showing login popup
  const [loginFlag, updateLoginFlag] = useState(false);
  //flag for showing register popup
  const [registerFlag, updateRegisterFlag] = useState(false);
  //Apollo's Mutation Hook for Registering A New User 
  const [registerUser] = useMutation(REGISTER_USER, {
    update(_, { data: { addUser: { password, username, id } } }) {
      // call to login query to perform login of a registerd User
      notify("Registered As " + username)
      login({
        variables: {
          username: username,
          password: password
        }
      })
    }
  });
  const [addReply] = useMutation(ADD_ROOT_COMMENT, {
    update() {
      comments.refetch()
      notify("Comment Added")
    }
  });
  // React Hook for loading 
  const [loadingFlag, updateLoadingFlag] = useState(true);
  //For Error Message
  const [open, setOpen] = React.useState(true);
  const [errorMessage, setError] = React.useState("Here We Go");
  //Apollo's Lazy Query Hook for getting a unique identifing value from server
  const [login, { loading, error, data }] = useLazyQuery(LOGIN_USER);


  //Apollo's normal Query to load all the Top level Comments
  const comments = useQuery(GET_TOP_COMMENTS);
  //React's Hook to update the unique id in state when everry a change is seen in login data variables
  useEffect(() => {
    if (!!data && "isValidUser" in data) {
      changeUserID(data.isValidUser)
      notify("Logged In");
    }
  }, [data]);
  useEffect(() => {
    if (!!error) {
      setOpen(true);
    }
  }, [error]);

  function notify(message) {
    setError(message);
    setOpen(true);
  }
  useEffect(() => { updateLoadingFlag(loading || comments.loading) }, [loading, comments.loading])
  useEffect(() => {
    if (!!userID) {
      notify("Your are Logged In")
    }
  }, [userID])
  console.log(comments.data)
  //Main rendering Part of App Component 
  return (
    <>
      <CssBaseline />
      {/* Header of The Web App */}
      <Header
        userID={userID}
        updateRegisterFlag={updateRegisterFlag}
        updateLoginFlag={updateLoginFlag}
        changeUserID={changeUserID}
        notify={notify}
      />

      {loadingFlag && <LinearProgress color="secondary" />}

      <Toolbar />

      {/* Container to Show All the Comments */}
      <Container maxWidth='lg'>
        <Response show
          placeholder="Enter your Thought...."
          submit={messageString => {
            if (userID.trim().length > 0) {
              addReply({
                variables: {
                  message: messageString,
                  postedBy: userID,
                }
              })
            }
            else {
              notify("Please Login First")
            }
          }}
        />
        {!comments.loading && !!comments.data &&
          comments.data.comments.map((comment, index) => <SingleComment notify={message => { setOpen(true); setError(message) }} key={index} comment={comment} userID={userID} />)}
      </Container>

      {/* Login Component */}
      <LoginModal open={loginFlag} handleClose={() => updateLoginFlag(false)} login={(username, password) => {
        login({
          variables: {
            username,
            password
          }
        })
      }} />

      {/* Register Component */}
      <RegisterModal open={registerFlag} handleClose={() => updateRegisterFlag(false)} register={registerUser} />
      <Notify open={open} setOpen={setOpen} message={errorMessage} />
    </>

  );
}



export default () => <ApolloProvider client={CLIENT}>
  <App />
</ApolloProvider>;
