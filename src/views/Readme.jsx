import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from "react"
import styled from 'styled-components'

import { Col, ContainerRow } from '../styled/Container'
import SideNav from '../components/SideNav'

import * as apiService from '../apiService'
import { useParams } from "react-router"
import { useRef } from 'react'
import Loading from '../components/Loading'

const StyledReactMarkdown = styled(ReactMarkdown)`
    padding: 20px;
    border-radius: 10px;
    background: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
    & img{
        max-width: 100%;
        border-radius: 5px;
    }
`,
Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media(max-width: 576px){
        width: unset;
        flex-direction: column;
    }
`

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