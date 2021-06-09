import ReactMarkdown from 'react-markdown'
import React, { useContext, useEffect, useRef, useState } from "react"
import styled from 'styled-components'

import { Container } from '../styled/Container'

import * as apiService from '../apiService'
import { useParams } from "react-router"
import Loading from '../components/Loading'
import ActiveReadmeContext from '../contexts/ActiveReadmeContext'
import ReadmesContext from '../contexts/ReadmesContext'

const Readme = () => {
    const markdownRef = useRef(),
        { name, active } = useParams(),
        { setLinks , setActiveLink } = useContext(ActiveReadmeContext),
        [markdown, error] = GetMarkdown(name);

    const focusOn = (title) => {
        const scrollTo = (el) => (
            window.scroll({
                top: el.offsetTop - document.body.scrollTop - 84,
                behavior: 'smooth'
            })
        )
        
        const evaluateNodes = (nodes) => {
            nodes.forEach(el => {
                if(el.innerText === title) {
                    scrollTo(el);
                }
            })
        }

        evaluateNodes(markdownRef.current.querySelectorAll("h2"));
    }

    const scroll = () => {
        const linkElements = []
        markdownRef.current.querySelectorAll("h2").forEach(el => linkElements.push(el))
        let enterOnScreenIndex = linkElements.reverse().findIndex((link) => window.scrollY + (window.innerHeight / 3) >= link.offsetTop)
        let activeIndex = Math.max(linkElements.length - 1 - enterOnScreenIndex, 0)
        setActiveLink(activeIndex >= linkElements.length ? 0 : activeIndex)
    }
    
    const scrollTop = () => {
        window.scroll({
            top: document.querySelector('body').offsetTop - document.body.scrollTop,
            behavior: 'smooth'
        })
    }

    if(!active) {
        scrollTop();
    }

    useEffect(() => {
        focusOn(active)
    }, [active])

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
        }
        return () => {
            setLinks([])
        }
    }, [markdown, markdownRef, setLinks])

    useEffect(() => {
        window.addEventListener('scroll', scroll)
        return () => {
            window.removeEventListener('scroll', scroll)
        }
    })
    

    return (
        <Container>
            <StyledReactMarkdownContainer ref={markdownRef}>
                {!error && !markdown ? 
                    <Loading/> :
                    error ?
                        <p>{error}</p> :
                            <StyledReactMarkdown
                                transformImageUri={(url) => apiService.getMediaLink(name, url)}
                                transformLinkUri={(url) => apiService.getUrlLink(name, url)}
                            >
                                {`${markdown}`}
                            </StyledReactMarkdown>
                }
            </StyledReactMarkdownContainer>
        </Container>
    )
}


export default Readme;

function GetMarkdown(name) {
    const [markdown, setMarkdown] = useState(""),
        [error, setError] = useState(""),
        { readmes, setActiveReadme } = useContext(ReadmesContext);
    
    useEffect(() => {
        setActiveReadme(readmes.findIndex(readme => readme.name === name))
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
    }, [name, readmes, setActiveReadme])

    return [markdown, error]
}


const StyledReactMarkdownContainer = styled(Container)`
    padding: 20px 50px;
`,
StyledReactMarkdown = styled(ReactMarkdown)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 28px;
        border-bottom: 2px solid #cccccc;
    }
    
    h2 {
        font-size: 24px;
        border-bottom: 1px solid #cccccc;
    }
    
    h3 {
        font-size: 18px;
    }
    
    h4 {
        font-size: 16px;
    }
    
    h5 {
        font-size: 14px;
    }
    
    h6 {
        color: #777777;
        font-size: 14px;
    }
    h1, h2{
        padding-bottom: 5px;
        margin-bottom: 15px;
    }
    p, blockquote, ul, ol, dl, li, table, pre {
        margin-top: 5px;
        margin-bottom: 15px;
    }
    hr {
        border: 0 none;
        color: #cccccc;
        height: 4px;
        padding: 0;
    }
    code{
        display: block;
        width: fit-content;
        margin: 5px 0;
        padding: 5px 8px;
        background: #f0f0f0;
        border-radius: 5px;
        color: #0f0f0f;
        word-break: break-word;
    }
    a{
        color: #0366d6;
        text-decoration: none;
        :hover{
            text-decoration: underline;
        }
    }
    :first-child{
        margin-top: 0;
    }
`