import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { from, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

const API_URL = 'http://localhost:5000/graphql';
const WS_URL = 'ws://localhost:5000/graphql';

const httpLink = new HttpLink({
  uri: API_URL,
});

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
