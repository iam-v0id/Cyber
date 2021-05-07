import React from 'react'
import  App from './App'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import {onError} from 'apollo-link-error'
import {ApolloLink} from 'apollo-link'
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
      console.log('networkError', networkError);
    }
  });
  

const httpLink = createHttpLink({
    uri:'http://localhost:5000'
})
const link = ApolloLink.from([errorLink, httpLink]);
const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})
export default(
    <ApolloProvider client={client}>
        <App/>
        </ApolloProvider>
)