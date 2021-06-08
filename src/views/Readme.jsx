import ReactMarkdown from 'react-markdown'
import { useEffect, useRef, useState } from "react"
import styled from 'styled-components'

import { Container, ContainerRow } from '../styled/Container'

import * as apiService from '../apiService'
import { useParams } from "react-router"
import Loading from '../components/Loading'

const Readme = () => {
    const [markdown, setMarkdown] = useState(""),
        [error, setError] = useState(""),
        markdownRef = useRef(),
        {name} = useParams();

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
    }, [name])

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

        evaluateNodes(markdownRef.current.querySelectorAll("h1"));
        evaluateNodes(markdownRef.current.querySelectorAll("h2"));
    }

    return (
        <Container>
            {/* <LinkNavigator markdown={markdown} markdownRef={markdownRef} focusOn={focusOn} /> */}
            <StyledReactMarkdownContainer ref={markdownRef}>
                {!error && !markdown ? 
                    <Loading/> :
                    error ?
                        <p>{error}</p> :
                            <StyledReactMarkdown
                                transformImageUri={(url) => apiService.getMediaLink(name, url)}
                                transformLinkUri={(url) => apiService.getUrlLink(name, url)}
                            >
                                
                                        {markdown}
                            </StyledReactMarkdown>
                }
            </StyledReactMarkdownContainer>
        </Container>
    )
}


export default Readme;

const LinkNavigator = ({markdown, markdownRef, focusOn}) => {
    const [links, setLinks] = useState([]),
        [active, setActive] = useState(null),
        linkElements = []
    
    const scroll = () => {
        let enterOnScreenIndex = [...linkElements].reverse().findIndex((link) => window.scrollY + (window.innerWidth < 578 ? 50 : 10) >= link.offsetTop)
        let activeIndex = Math.max(linkElements.length - 2 - enterOnScreenIndex, 0)
        setActive(activeIndex >= linkElements.length -1 ? 0 : activeIndex)
    }

    useEffect(() => {
        if(markdownRef.current) {
            setLinks([])
            const addId = (nodes) => {
                nodes.forEach(el => {
                    setLinks(l => l.concat(el.innerText));
                })
            }
            addId(markdownRef.current.querySelectorAll("h1"))
            addId(markdownRef.current.querySelectorAll("h2"))
        }
    }, [markdown, markdownRef])

    useEffect(() => {
        window.addEventListener('scroll', scroll)
        return () => {
            window.removeEventListener('scroll', scroll)
        }
    })

    return(
        <LinksCarrouselContainer>
            <LinksCarrousel>
                {
                    links?.concat(links).map((link, index) => (
                        <StyledLink onClick={() => focusOn(link)} key={index} active={index === active}>
                            {link}
                        </StyledLink>
                    ))
                }
            </LinksCarrousel>
        </LinksCarrouselContainer>
    )
}

const StyledReactMarkdownContainer = styled(Container)`
    min-height: calc(100vh - 90px);
    /* padding: 0 50px 20px 50px; */
    padding: 20px 50px;
    box-shadow: 0px 1px 1px rgba(0,0,0,0.2);
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
    h1, h2, h3, h4, h5, h6{
        margin-bottom: 16px;
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
`,
LinksCarrouselContainer = styled(Container)`
    margin: 0 50px;
    padding: 20px 0px 20px 0;
    background: white;
    position: sticky;
    top:0px;
    width: calc(100% - 100px);
`,
LinksCarrousel = styled(ContainerRow)`
    width: 100%;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
    overflow: auto;
    padding-bottom: 5px;
    transform: rotate(180deg);

    :last-child{
       margin: 0;
    }

    ::-webkit-scrollbar,
    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-corner {
        border-radius: 5px;
        border-right-style: inset;
        border-right-width: calc(100vw + 100vh);
        border-color: inherit;
    }

    ::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
    }

    ::-webkit-scrollbar-thumb {
        border-color: inherit;
    }
    ::-webkit-scrollbar-track-piece {
        background: white;
    }
`,
StyledLink = styled.button`
    transform: rotate(180deg);
    text-decoration: none;
    min-width: 30%;
    background: ${({active}) => active ? 'rgba(0,0,255,0.8)' : 'transparent '};
    color: ${({active}) => active ? 'white' : 'unset '};
    outline: 0;
    border: 0;
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s all;
    box-sizing: border-box;
    max-height: 50px;
    font: unset;
    text-align:center;
    &:hover{
        background: rgba(0,0,255,0.8);
        color: white;
    }
    &:focus{
        outline:0;
    }
    &:hover, &.active{
        background: rgba(0,0,255,0.8);
        color: white;
    }
    :last-child{
        margin-right: 0;
    }
`