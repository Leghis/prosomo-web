import React from 'react';
import {onPageLoad} from 'meteor/server-render';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../imports/ui/Home";
import Update from "../imports/ui/views/Update";

//Configuring the Apollo Client
export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    ssrForceFetchDelay: 100,
});

onPageLoad(() => {
    ReactDOM.render(
        <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/add" component={Update}/>
                    <Route exact path="/update/:id" component={Update}/>
                </Switch>
            </Router>
        </ApolloProvider>, document.getElementById('react-target'));
});
