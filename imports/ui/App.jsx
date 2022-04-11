// @ts-ignore
import React from 'react';
import Home from "./views/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {
    ApolloClient,InMemoryCache,
    ApolloProvider, HttpLink
} from "@apollo/client";

import Update from "./views/Update";
import {ApolloProvider as ApolloHookProvider} from '@apollo/react-hooks';
import Home2 from "./views/Home2";
import fetch from "cross-fetch";

//connecting the Graphql client to the Apollo server
const cache = new InMemoryCache();
let client= new ApolloClient({
    link: new HttpLink({uri: 'http://localhost:4000', fetch}),
    cache
})

export const App = () => (
    <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/add" component={Update}/>
                    <Route exact path="/update/:id" component={Update}/>
                </Switch>
            </Router>
    </ApolloProvider>

);
