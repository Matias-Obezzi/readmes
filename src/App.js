import React, { useEffect, useState } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
// import logo from './logo.svg';

import MainNav from './components/Nav'
import Router from './views'

function App() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <HashRouter>
      <MainNav open={openMenu} toggleOpen={(state = !openMenu) => window.innerWidth < 578 && setOpenMenu(state)} />
      <div style={{minHeight: `calc(100vh - 50px - 110px ${window.innerWidth < 578 ? '- 52px' : ''})`}}>
        <Router open={openMenu} toggleOpen={(state = !openMenu) => window.innerWidth < 578 && setOpenMenu(state)} />
      </div>
      <Footer />
    </HashRouter>
  );
}

export default App;
