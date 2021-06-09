import React, { useContext, useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Footer from './components/Footer';

import SideNav from './components/SideNav';
import Router from './views'

import ReadmesContext from './contexts/ReadmesContext';
import ActiveReadmeContext from './contexts/ActiveReadmeContext';

import * as apiService from './apiService';
import { Container, ContainerRow } from './styled/Container';

function App() {

  return (
    <ProvidingReadmesContext>
      <ProvidingActiveReadmeContext>
        <Main />
      </ProvidingActiveReadmeContext>
    </ProvidingReadmesContext>
  );
}

export default App;


const ProvidingReadmesContext = (props) => {
  const [readmes, setReadmes] = useState([]),
    [activeReadme, setActiveReadme] = useState(null),
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
    setReadmes,
    error,
    activeReadme,
    setActiveReadme
  }

  return (
    <ReadmesContext.Provider value={value}  {...props}/>
  )
}

const ProvidingActiveReadmeContext = (props) => {
  const [links, setLinks] = useState([]),
    [activeLink, setActiveLink] = useState(0);

  const value = {
    links,
    setLinks,
    activeLink,
    setActiveLink
  }

  return (
    <ActiveReadmeContext.Provider value={value}  {...props}/>
  )
}

const Main = (props) => {
  const { error } = useContext(ReadmesContext);

  return (
    <HashRouter>
      <ContainerRow>
        <SideNav />
        <Container>
          <div style={{
            minHeight: `calc(100vh - ${window.innerWidth > 578 ? '90px' : '130px'})`,
            boxShadow: `0px 1px 1px rgba(0,0,0,0.2)`
          }}>
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
  )
}