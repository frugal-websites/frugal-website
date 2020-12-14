import React from "react";
import { useRealmApp } from "../RealmApp/RealmApp";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import * as Realm from "realm-web";

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken(app) {
    if (!app.currentUser) {
      // If no user is logged in, log in an anonymous user
      await app.logIn(Realm.Credentials.anonymous());
    } else {
      // The logged in user's access token might be stale,
      // Refreshing custom data also refreshes the access token
      await app.currentUser.refreshCustomData();
    }
    // Get a valid access token for the current user
    return app.currentUser.accessToken;
}

// Create an ApolloClient that connects to the provided Realm.App's GraphQL API
const createRealmApolloClient = (app) => {
  const link = new HttpLink({
    // Realm apps use a standard GraphQL endpoint, identified by their App ID
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${app.id}/graphql`,
    // A custom fetch handler adds the logged in user's access token to GraphQL requests
    fetch: async (uri, options) => {
      const accessToken  = await getValidAccessToken(app);
      if (!app.currentUser) {
        throw new Error(`Must be logged in to use the GraphQL API`);
      }
      // The handler adds a bearer token Authorization header to the otherwise unchanged request
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  });

  const cache = new InMemoryCache();

  return new ApolloClient({ link, cache });
};

export default function RealmApolloProvider({ children }) {
  const app = useRealmApp();
  console.log("APP2", app)
  const [client, setClient] = React.useState(createRealmApolloClient(app));
  React.useEffect(() => {
    async function createApolloClient() {
        const apolloClient = createRealmApolloClient(app);
        setClient(apolloClient);
    } 

    createApolloClient()
  }, [app]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
