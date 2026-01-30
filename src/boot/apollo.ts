import { boot } from 'quasar/wrappers';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

const httpLink = createHttpLink({
  uri: `${process.env.BASE_URL}/graphql`,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default boot(({ app }) => {
  //   provideApolloClient(apolloClient);
  app.provide(DefaultApolloClient, apolloClient);
});
