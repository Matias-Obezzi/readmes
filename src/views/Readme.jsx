import React, { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router"

// Contexts
import ActiveReadmeContext from '../contexts/ActiveReadmeContext'
import ReadmesContext from '../contexts/ReadmesContext'

// Api
import * as apiService from '../apiService'

// Styles
import { Container } from '../styled/Container'
import { StyledReactMarkdownContainer, StyledReactMarkdown } from '../styled/StyledReactMarkdown'
import Loading from '../components/Loading'
import { StyledReadmeNavbarButton, StyledRedmeNavbar } from "../styled/StyledReadmeNavbar"
import { useHistory } from "react-router-dom"

// Components
import ErrorHandler from "../components/ErrorHandler"

const Readme = () => {
    const { name } = useParams(),
        { setActiveReadme, activeReadme, readmes } = useContext(ReadmesContext),
        [ markdown, error ] = useGetMarkdown(name);

    useEffect(() => {
        setActiveReadme(readmes.findIndex(readme => readme.name === name))   
        return () => {
            setActiveReadme(null)
        }
    }, [activeReadme, name, readmes, setActiveReadme])
    

    return (
        <Container>
            <ErrorHandler error={error} data={!!markdown}>
                <ReadmeNavbar />
                <ReadmeContainer markdown={markdown} name={name}/>
            </ErrorHandler>
        </Container>
    )
}

export default Readme;

const useGetMarkdown = (name) => {
    const [markdown, setMarkdown] = useState(""),
        [error, setError] = useState(""),
        { readmes, setActiveReadme, activeReadme } = useContext(ReadmesContext);
    
    useEffect(() => {
        apiService.getReadme(name).then(res => {
            res.text().then(setMarkdown)
            setError("")
        }).catch(err =>{
            setMarkdown("")
            setError(err.message)
        })
        document.title = "Readmes | " + name
        return () => { 
            document.title = "Readmes"
        }
    }, [name, readmes, setActiveReadme, activeReadme])

    return [markdown, error]
}


const ReadmeNavbar = () => {
    const history = useHistory();

    const back = () => {
        history.goBack();
    }
    
    return (
        <StyledReadmeNavbarButton
            className="fas fa-arrow-left"
            onClick={back}
        />
    )
}

const ReadmeContainer = ({markdown, name}) => {
    const markdownRef = useRef();

    useOnMarkdownRefLoadHandler(markdownRef, markdown);
    useOnScrollActiveElementHandler(markdownRef);
    useActiveHandler(markdownRef);

    return (
        <StyledReactMarkdownContainer ref={markdownRef}>
            <StyledReactMarkdown
                transformImageUri={(url) => apiService.getMediaLink(name, url)}
                transformLinkUri={(url) => apiService.getUrlLink(name, url)}
            >
                {markdown}
            </StyledReactMarkdown>
        </StyledReactMarkdownContainer>
    )
}

const useOnMarkdownRefLoadHandler = (markdownRef, markdown) => {
    const { setLinks, activeReadme } = useContext(ActiveReadmeContext)

    useEffect(() => {
        if(markdownRef.current) {
            setLinks([])
            const addId = (nodes) => {
                nodes.forEach(el => {
                    el.id = el.innerText
                    setLinks(l => l.concat(el.innerText));
                })
            }
            addId(markdownRef.current.querySelectorAll("h2"))
            // markdownRef.current.querySelector("h1")?.remove()
        }
        return () => {
            setLinks([])
        }
    }, [markdown, markdownRef, setLinks, activeReadme])
}

const useActiveHandler = (markdownRef) => {
    const { active } = useParams();

    useEffect(() => {
        if(!active){
            window.scroll({
                top: document.querySelector('body').offsetTop - document.body.scrollTop,
                behavior: 'smooth'
            })
        }
        else{
            if(!markdownRef.current) return;

            const scrollTo = (el) => (
                window.scroll({
                    top: el.offsetTop - document.body.scrollTop - 84,
                    behavior: 'smooth'
                })
            )
            
            const evaluateNodes = (nodes) => {
                nodes.forEach(el => {
                    if(el.innerText === active) {
                        scrollTo(el);
                    }
                })
            }

            evaluateNodes(markdownRef.current.querySelectorAll("h2"));
        }
    }, [active, markdownRef])
}

const useOnScrollActiveElementHandler = (markdownRef) => {
    const { setActiveLink } = useContext(ActiveReadmeContext)

    const scroll = () => {
        const linkElements = []
        markdownRef.current.querySelectorAll("h2").forEach(el => linkElements.push(el))
        let enterOnScreenIndex = linkElements.reverse().findIndex((link) => window.scrollY + (window.innerHeight / 3) >= link.offsetTop)
        let activeIndex = Math.max(linkElements.length - 1 - enterOnScreenIndex, 0)
        setActiveLink(activeIndex >= linkElements.length ? 0 : activeIndex)
    }

    useEffect(() => {
        window.addEventListener('scroll', scroll)
        return () => {
            window.removeEventListener('scroll', scroll)
        }
    })
}