import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Footer from './components/Footer';
// import logo from './logo.svg';

import MainNav from './components/Nav'
import Router from './views'

function App() {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <HashRouter>
      <MainNav open={openMenu} toggleOpen={() => setOpenMenu(!openMenu)} />
      <div style={{minHeight: `calc(100vh - 50px - 110px - ${window.innerWidth < 578 ? '52px' : ''})`}}>
        <Router open={openMenu} toggleOpen={() => setOpenMenu(!openMenu)} />
      </div>
      <Footer />
    </HashRouter>
  );
}

export default App;
