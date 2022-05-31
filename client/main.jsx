import React from 'react';
import {onPageLoad} from 'meteor/server-render';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import i18n from './i18n';
import Home from "../imports/ui/Home";
import Update from "../imports/ui/views/Update";
import ReportView from "../imports/ui/views/ReportView";
import HeaderComponent from "../imports/ui/components/HeaderComponent";
import addRelation from "../imports/ui/views/addRelation";
import {I18nextProvider} from "react-i18next";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


let cache = new InMemoryCache()
cache.restore(window.__APOLLO_STATE__)

//Configuring the Apollo Client
export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: cache,
});

i18n.changeLanguage(cookies.get("lng")??"fr")
  .then(r => console.log(""))

onPageLoad(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <HeaderComponent/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/add" component={Update}/>
            <Route exact path="/update/:id" component={Update}/>
            <Route exact path="/report" component={ReportView}/>
            <Route exact path="/addRelation/:contactID" component={addRelation}/>
            <Route exact path="/updateRelation/:id" component={addRelation}/>
          </Switch>
        </Router>
      </I18nextProvider>
    </ApolloProvider>, document.getElementById('react-target'));
});
