import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from "react"
import styled from 'styled-components'

import { Col, ContainerRow } from '../styled/Container'
import SideNav from '../components/SideNav'

import * as apiService from '../apiService'
import { useParams } from "react-router"
import { useRef } from 'react'
import Loading from '../components/Loading'

const Readme = ({open, toggleOpen}) => {
    const [markdown, setMarkdown] = useState(""),
        [error, setError] = useState(""),
        [links, setLinks] = useState([]),
        markdownRef = useRef(),
        {name} = useParams()

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
    }, [markdown])

    const scrollTo = (el) => (
        window.scroll({
            top: el.offsetTop - document.body.scrollTop - (window.innerWidth < 578 ? 50 : 0),
            behavior: 'smooth'
        })
    )

    const focusOn = (title) => {
        toggleOpen()
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
        <ContainerRow>
            {!error && !markdown ? 
                <Loading/> :
                error ?
                    <>{error}</>
                    : <Container>
                        <SideNav
                            links={links}
                            focusOn={focusOn}
                            open={open}
                            toggleOpen={toggleOpen}
                        />
                        <Col id="markdown" ref={markdownRef}>
                            <StyledReactMarkdown
                                transformImageUri={(url) => apiService.getMediaLink(name, url)}
                                transformLinkUri={(url) => apiService.getUrlLink(name, url)}
                            >
                                {markdown}
                            </StyledReactMarkdown>
                        </Col>
                    </Container>
            }
        </ContainerRow>
    )
}


export default Readme;


const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media(max-width: 576px){
        width: unset;
        flex-direction: column;
    }
`,
StyledReactMarkdown = styled(ReactMarkdown)`
    padding: 20px;
    border-radius: 10px;
    background: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2);

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
        margin-top: 24px;
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