import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { onPageLoad } from 'meteor/server-render';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache} from "@apollo/client";

const preloadedState =  window.__PRELOADED_STATE__; // eslint-disable-line

delete window.__PRELOADED_STATE__; // eslint-disable-line

// Meteor.startup(() => {
//   render(<App/>, document.getElementById('react-target'));
// });

onPageLoad(() => {
  ReactDOM.render(<App />, document.getElementById('react-target'));
});
