import React from 'react';
import { HashRouter } from 'react-router-dom';
// import logo from './logo.svg';

import MainNav from './components/Nav'
import Router from './views'

function App() {
  return (
    <HashRouter>
      <MainNav />
      <Router />
    </HashRouter>
  );
}

export default App;
