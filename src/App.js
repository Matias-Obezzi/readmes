import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Footer from './components/Footer';

import SideNav from './components/SideNav';
import Router from './views'

import Context from './context';

import * as apiService from './apiService';
import { Container, ContainerRow } from './styled/Container';

function App() {
  const [readmes, setReadmes] = useState([]),
    [error, setError] = useState("");
  
  useEffect(() => {
    apiService.getReadmes().then(res => {
        setReadmes(res)
        setError("")
    }).catch(err =>{
        setReadmes(null)
        setError(err.message)
    })
    document.title = "Readmes | Inicio"
    return () => { 
        document.title = "Readmes"
    }
}, [])

  const value = {
    readmes,
    setReadmes 
  }

  return (
    <Context.Provider value={value}>
      <HashRouter>
        <ContainerRow>
          <SideNav />
          <Container>
            <div style={{minHeight: `calc(100vh - 110px ${window.innerWidth < 578 ? '- 52px' : ''})`}}>
              {error
                ? <p>
                  {error}
                </p>
                : <Router />}
            </div>
            <Footer />
          </Container>
        </ContainerRow>
      </HashRouter>
    </Context.Provider>
  );
}

export default App;
