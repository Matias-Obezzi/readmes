import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const SideNav = ({links, focusOn, open, toggleOpen}) => {
    const [active, setActive] = useState(0),
        linkElements = [],
        scroll = () => {
            let enterOnScreenIndex = [...linkElements].reverse().findIndex((link) => window.scrollY + (window.innerWidth < 578 ? 50 : 10) >= link.offsetTop)
            let activeIndex = Math.max(linkElements.length - 2 - enterOnScreenIndex, 0)
            setActive(activeIndex >= linkElements.length -1 ? 0 : activeIndex)
        }
        
    const scrollTop = () => {
        toggleOpen();
        window.scroll({
            top: document.querySelector('body').offsetTop - document.body.scrollTop,
            behavior: 'smooth'
        })
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
        <StyledSideNav open={open}>
            <SideNavContainer>
                {links.map((link, index) => (
                    <StyledLink
                        key={index}
                        className={index === active ? 'active' : ''}
                        onClick={() => focusOn(link)}
                    >
                        {link}
                    </StyledLink>
                ))}
            </SideNavContainer>
            <SideNavButtonsContainer>
                <StyledButton as="a" href="https://github.com/Matias-Obezzi/readmes" target="_blank">
                    <i className="far fa-star"></i>
                    <span>Star</span>
                </StyledButton>
                <StyledButton onClick={scrollTop}>
                    <i className="fas fa-arrow-up"></i>
                    <span>Top</span>
                </StyledButton>
            </SideNavButtonsContainer>
        </StyledSideNav>
    )
}

export default SideNav;

const StyledSideNav = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 10px;
    left: 0;
    height: fit-content;
    background: white;
    min-width: 15vw;
    max-width: 20vw;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
    border-radius: 5px;
    overflow: hidden;
    transition: 0.5s all;
    max-height: 100vh;
    padding: 10px;
    z-index: 2;
    @media(max-width: 576px){
        min-width: unset;
        max-width: unset;
        top: 60px;
        position: fixed;
        width: calc(100% - 71px);
        margin-left: 35px;
        margin-right: 35px;
        max-height: ${({open}) => open ? '100vh' : '0'};
        padding: ${({open}) => open ? '10px' : '0'} 10px;
        div {
            overflow: ${({open}) => open ? 'auto' : 'hidden'};;
        }
    }
`,
SideNavContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    height: fit-content;
    padding: 10px;
    max-height: calc(100vh - 50px - 20px - 10px);
    overflow-x: hidden;
    border-color: rgba(0, 0, 0, 0);
    transition: border-color 0.5s linear;
    border-color: rgba(0, 0, 0, 0.2);

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
SideNavButtonsContainer = styled(SideNavContainer)`
    max-height: unset;
    padding-top: 0;
    flex-direction: row;
    overflow: hidden;
`,
StyledLink = styled.button`
    text-decoration: none;
    width: 100%;
    background: transparent;
    color: unset;
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
`,
StyledButton = styled.button`
    max-height: 50px;
    border: 0;
    border-radius: 5px;
    background: unset;
    color: unset;
    outline: 0;
    font: unset;
    padding: 5px;
    cursor: pointer;
    width: 100%;
    margin: auto;
    margin-left:2px;
    margin-right:2px;
    transition: 0.2s all;
    text-decoration: none;
    text-align:center;
    i, span{
        padding: 2px;
        margin: auto;
    }
    &:focus{
        outline:0;
    }
    &:hover, &.active{
        background: rgba(0,0,255,0.8);
        color: white;
    }
    @media(max-width:750px){
        span{
            display: none;
        }
    }
`