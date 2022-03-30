// @ts-ignore
import React from 'react';
import Home from "./views/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import Update from "./views/Update";

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

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
