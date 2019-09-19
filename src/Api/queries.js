import gql from "graphql-tag";

// To Register a new User
const REGISTER_USER = gql`
mutation REGISTER_USER($username:String!,$password:String!){
  addUser(username:$username,password:$password ){
    id
    username
    password
  }
}`;

//To Perform a Login for a User
const LOGIN_USER = gql`
query LOGIN_USER($username:String!,$password:String!){
  isValidUser(username:$username,password:$password )
}`;

//To get the top level comments
const GET_TOP_COMMENTS = gql`
{
  comments {
    id
    message
    likes
    dislikes
    postedBy{
      id
    }
  }
}`;

// To get a comment details from it's ID
const GET_COMMENT = gql`
query($commentID:String){
  comment(commentID:$commentID) {
    message
    likes
    dislikes
    postedBy{
      id
    }
    childComments{
      id
      message
      postedBy{
        id
      }
    }
  }
}`;

// To add a new Comment
const ADD_COMMENT = gql`
mutation ADD_COMMENT($message:String!,$postedBy:String!,$parentComment:String){
    addComment(message:$message,postedBy:$postedBy,parentComment:$parentComment){
      id
      message
    }
}`;

// To add a new Comment
const ADD_ROOT_COMMENT = gql`
mutation ADD_TOP_COMMENT($message:String!,$postedBy:String!){
  addTopComment(message:$message,postedBy:$postedBy){
      id
      message
    }
}`;

// To edit an existing Comment
const EDIT_COMMENT = gql`
mutation EDIT_COMMENT($newMessage:String!,$commentID:String!,$postedBy:String!){
  editComment(newMessage:$newMessage,commentID:$commentID,postedBy:$postedBy){
    id
    message
  }
}`;

const LIKE_COMMENT = gql`
mutation LIKE_COMMENT($commentID:String!){
    likeComment(commentId:$commentID){
      likes
      dislikes
    }
}
`
const DISLIKE_COMMENT = gql`
mutation DISLIKE_COMMENT($commentID:String!){
    dislikeComment(commentId:$commentID){
      likes
      dislikes
    }
}
`
export {
  GET_TOP_COMMENTS,
  ADD_ROOT_COMMENT,
  ADD_COMMENT,
  GET_COMMENT,
  REGISTER_USER,
  LOGIN_USER,
  EDIT_COMMENT,
  LIKE_COMMENT,
  DISLIKE_COMMENT
}