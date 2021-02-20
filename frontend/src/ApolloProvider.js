import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';	

const backendLink = createHttpLink({
    uri: process.env.BACKEND_URL || 'http://192.168.0.31:5000/graphql'
});


// TODO: Once login is setup, use setContext to create an auth context


const client = new ApolloClient({
	link: backendLink,
	cache: new InMemoryCache(),
	connectToDevTools: true
});


export default () => {
	return (
		<ApolloProvider client={client}>
			<App/>
		</ApolloProvider>
	);
};
