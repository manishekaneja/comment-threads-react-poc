import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';

//Client Object To Bind GraphQL with our Application
const CLIENT = new ApolloClient({
    uri: `http://localhost:4000/graphql`,
    cache: new InMemoryCache()
})

export default CLIENT;
