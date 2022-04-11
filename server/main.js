import {Meteor} from 'meteor/meteor';
import {onPageLoad} from 'meteor/server-render';
import {Route, StaticRouter} from "react-router-dom";
import Home from "../imports/ui/views/Home";
import Update from "../imports/ui/views/Update";
import React from "react";
import {object} from 'prop-types';
import {Helmet} from 'react-helmet';
import {renderToString} from "react-dom/server";
import Loadable from 'react-loadable';
import fetch from 'cross-fetch';
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient, ApolloProvider, HttpLink} from "@apollo/client";

// Meteor.startup(() => {
//   console.log('server ok')
// });

onPageLoad((sink) => {
    const cache = new InMemoryCache();
    const context = {
        client: new ApolloClient({
            link: new HttpLink({uri: 'http://localhost:4000', fetch}),
            cache
        })
    };
    const App = props => (
        <StaticRouter location={props.location} context={context}>
            <ApolloProvider client={context.client}>
                <Route exact path="/" component={Home}/>
                <Route exact path="/add" component={Update}/>
                <Route exact path="/update/:id" component={Update}/>
            </ApolloProvider>
        </StaticRouter>
    );

    const modules = [];
    // const html = renderToNodeStream((
    const html = renderToString((
        <Loadable.Capture report={(moduleName) => {
            modules.push(moduleName);
        }}>
            <App location={sink.request.url}/>
        </Loadable.Capture>
    ));

    sink.renderIntoElementById('app', html);

    const helmet = Helmet.renderStatic();
    sink.appendToHead(helmet.meta.toString());
    sink.appendToHead(helmet.title.toString());
    sink.appendToHead(helmet.link.toString());
})