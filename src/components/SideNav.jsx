import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const StyledSideNav = styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 10px;
    left: 0;
    height: fit-content;
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
    @media(max-width: 576px){
        display: none;
    }
`,
StyledLink = styled.button`
    white-space: nowrap;
    text-decoration: none;
    width: 100%;
    background: transparent;
    outline: 0;
    border: 0;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 2.5px 0;
    text-align: right;
    cursor: pointer;
    transition: 0.2s all;
    box-sizing: border-box;
    &:focus{
        outline:0;
    }
    &:hover, &.active{
        background: rgba(0,0,255,0.8);
        color: white;
    }
`

const SideNav = ({links, focusOn}) => {
    const [active, setActive] = useState(0),
        linkElements = [],
        scroll = () => {
            let enterOnScreenIndex = [...linkElements].reverse().findIndex((link) => window.scrollY >= link.offsetTop )
            let activeIndex = linkElements.length - 1 - enterOnScreenIndex
            setActive(enterOnScreenIndex === -1 ? 0 : activeIndex)
        }
        
    useEffect(() => {
        document.querySelectorAll("h1").forEach(el => linkElements.push(el))
        document.querySelectorAll("h2").forEach(el => linkElements.push(el))
        window.addEventListener('scroll', scroll)
        return () => {
            window.removeEventListener('scroll', scroll)
        }
    })

    return (
        <StyledSideNav>
            {links.map((link, index) => (
                <StyledLink
                    key={index}
                    className={index === active ? 'active' : ''}
                    onClick={() => focusOn(link)}
                >
                    {link}
                </StyledLink>
            ))}
        </StyledSideNav>
    )
}

export default SideNav;