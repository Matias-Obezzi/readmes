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
`

const Readme = (props) => {
    const [markdown, setMarkdown] = useState(""),
        [error, setError] = useState(""),
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
                    el.setAttribute("id", el.innerText)
                })
            }
            addId(markdownRef.current.querySelectorAll("h1"))
            addId(markdownRef.current.querySelectorAll("h2"))
        }
    }, [markdownRef])

    const focusOn = (title) => {
        const evaluateNodes = (nodes) => {
            nodes.forEach(el => {
                if(el.innerText === title) {
                    window.scroll({
                        top: el.offsetTop - document.body.scrollTop,
                        behavior: 'smooth'
                    })
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
                    : <>
                        <SideNav
                            links={
                                markdown.split("##")
                                    .map(el => el.split("\n")[0].trim())
                                    .map(el => el.replace("#", "").trim())
                            }
                            focusOn={focusOn}
                        />
                        <Col id="markdown" ref={markdownRef}>
                            <StyledReactMarkdown
                                transformImageUri={(url) => apiService.getMediaLink(name, url)}
                                transformLinkUri={(url) => apiService.getUrlLink(name, url)}
                            >
                                {markdown}
                            </StyledReactMarkdown>
                        </Col>
                    </>
            }
        </ContainerRow>
    )
}


export default Readme;