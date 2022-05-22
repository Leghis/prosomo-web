import {onPageLoad} from 'meteor/server-render';
import {StaticRouter} from "react-router-dom";
import Home from "../imports/ui/Home";
import React from "react";
import {Helmet} from 'react-helmet';
import {renderToString} from "react-dom/server";
import fetch from 'cross-fetch';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {getDataFromTree} from "@apollo/client/react/ssr";

let initialState

onPageLoad(async (sink) => {
    //Configuration of the context with the different parameters related to the ssr
    const context = {
        client: new ApolloClient({
            ssrMode: true, link: createHttpLink({
                uri: 'http://localhost:4000', credentials: 'same-origin', headers: {
                    // cookie: req.header('Cookie'),
                }, fetch
            }), cache: new InMemoryCache(),
        }),
    };
    const App = () => (
        <ApolloProvider client={context.client}>
            <StaticRouter location={sink.request.url} context={context}>
                <Home/>
            </StaticRouter>
        </ApolloProvider>
    );

    //Use of getDataFromTree to retrieve data from our query
    //Graphql executing on our different components
    await getDataFromTree(App()).then((content) => {
        // Extract the entirety of the Apollo Client cache's current state
        initialState = context.client.extract()
    });


    //Render page in ssr mode
    sink.renderIntoElementById('react-target', renderToString(App));

    const helmet = Helmet.renderStatic()
    sink.appendToHead(helmet.meta.toString())
    sink.appendToHead(helmet.title.toString())

    sink.appendToBody(`
    <script id="preloaded-state">
        window.__APOLLO_STATE__= ${JSON.stringify(initialState)};
    </script>
  `)
})