import React from 'react';
import { HashRouter } from 'react-router-dom';
import Footer from './components/Footer';
// import logo from './logo.svg';

import MainNav from './components/Nav'
import Router from './views'

function App() {
  return (
    <HashRouter>
      <MainNav />
      <Router />
      <Footer />
    </HashRouter>
  );
}

export default App;
