import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../styled/Container";

import ActiveReadmeContext from "../contexts/ActiveReadmeContext";
import ReadmesContext from "../contexts/ReadmesContext";

const SideNav = () => {
    const history = useHistory(),
        [open, setOpen] = useState(window.innerWidth < 578),
        menuRef = useRef();

    const toggleOpen = (state = !open) => {
        setOpen(state);
        if (state) {
            document.querySelector('body').classList.add('o-hidden')
        } else {
            document.querySelector('body').classList.remove('o-hidden')
        }
    }

    useEffect(() => {
        setOpen(false);
    }, [history.location])

    const click = (event) => {
        const evaluate = (el) => {
            if(!el || el === menuRef.current) {
                return;
            }
            if(el?.tagName === "BODY" || el?.id === "root") {
                setOpen(false);
                return;
            }
            evaluate(el.parentElement)
        }
        evaluate(event.target);
    }

    useEffect(() => {
        window.addEventListener('click', click)
        return () => {
            window.removeEventListener('click', click)
        }
    })

    return (
        <div ref={menuRef}>
            <StyledSideNav open={open}>
                <Container style={{margin: 0}}>
                    <Brand as={Link} to={'/'}>
                        <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Readmes Icon" height="30" />
                        <h1 style={{fontSize: '25px', marginLeft: 5}}>Readmes</h1>
                    </Brand>
                    <MainSidebar closeMenu={() => toggleOpen(false)} />
                </Container>
                <BottomButtons toggleOpen={toggleOpen} />
            </StyledSideNav>
            <BarsMenuButton open={open} toggleOpen={toggleOpen} />
        </div>
    )
}

export default SideNav;

const MainSidebar = ({closeMenu}) => {
    const { readmes, activeReadme } = useContext(ReadmesContext),
        { links, activeLink } = useContext(ActiveReadmeContext),
        readmeLinkRef = useRef();

    return (
        <SideNavContainer>
            {readmes?.map((link, index) => (
                <StyledLinkContainer key={index}>
                    <StyledLink
                        ref={readmeLinkRef}
                        key={index}
                        to={`/r/${link.name}`}
                        onClick={closeMenu}
                    >
                        <i
                            className={`fas fa-chevron-${activeReadme === index ? 'down' : 'right'}`}
                            style={{
                                heigth: 15,
                                width: 15,
                                fontSize: '15px',
                                marginRight: '5px'
                            }}
                        />
                        {link.name}
                    </StyledLink>
                    {
                        activeReadme === index && links?.map((sublink, index) => (
                            <StyledSublink
                                to={`/r/${link.name}/${sublink}`}
                                key={index}
                                className={activeLink === index ? 'active' :''}
                                onClick={closeMenu}
                            >
                                {sublink}
                            </StyledSublink>
                        ))
                    }
                </StyledLinkContainer>
            ))}
        </SideNavContainer>
    )
}

const BottomButtons = ({toggleOpen}) => {
    const scrollTop = () => {
        window.scroll({
            top: document.querySelector('body').offsetTop - document.body.scrollTop,
            behavior: 'smooth'
        })
        toggleOpen(false)
    }

    return (
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
    )
}

const BarsMenuButton = ({open, toggleOpen}) => (
    <MenuButton onClick={() => toggleOpen()}>
        <i className="fas fa-bars"></i>
        {open}
    </MenuButton>
)

const StyledSideNav = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    background: rgb(245, 245, 245);
    width: 20vw;
    overflow: hidden;
    transition: 0.5s all;
    max-height: 100vh;
    padding: 10px;
    z-index: 2;
    @media(max-width: 576px){
        position: fixed;
        width: 80vw;
        transform: translateX(${({open}) => open ? '0' : '-100%'});
        body {
            overflow: ${({open}) => open ? 'auto' : 'hidden'};;
        }
    }
`,
SideNavContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    height: calc(100vh - 20px - 45px - 50px);
    padding: 0px 10px 0 0;
    margin: 5px 0;
    overflow-x: hidden;
    border-color: rgba(0, 0, 0, 0);
    transition: border-color 0.5s linear;
    border-color: rgba(0, 0, 0, 0.2);

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
StyledLinkContainer = styled.div`
    text-decoration: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: transparent;
    color: unset;
    outline: 0;
    /* border: 0.5px solid rgba(0,0,255,0.8); */
    margin: 0 0 5px 0;
    border-radius: 7px;
    transition: 0.2s all;
    box-sizing: border-box;
    &:focus{
        outline:0;
    }
    :last-child{
        margin-bottom: 0;
    }
`,
StyledLink = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    background: transparent;
    color: #555;
    outline: 0;
    border: 0;
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s all;
    box-sizing: border-box;
    &:focus{
        outline:0;
    }
    &:hover{
        padding-left: 15px;
        padding-right: 5px;
        color: #222;
    }
    &.active{
        background: rgba(0,0,255,0.8);
        color: white;
    }
    :last-child{
        margin-bottom: 0;
    }
`,
StyledSublink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    background: transparent;
    color: #222;
    outline: 0;
    border: 0;
    padding: 5px 10px;
    margin-left: 20px;
    margin-bottom: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s all;
    box-sizing: border-box;
    /* overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
    &:focus{
        outline:0;
    }
    &:hover{
        padding-left: 15px;
        padding-right: 5px;
    }
    &.active{
        color: rgba(0,0,255,0.8);
    }
    :last-child{
        margin-bottom: 0;
    }
`,
SideNavButtonsContainer = styled(SideNavContainer)`
    min-height: 50px;
    flex-direction: row;
    overflow: hidden;
    padding: 0;
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
    width: 95%;
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
`,
Brand = styled(StyledButton)`
    align-items: center;
    display: flex;
    width: 100%;
    margin: 0;
    &:hover{
        background: unset;
        color: unset;
    }
`,
MenuButton = styled.button`
    display: none;
    border: 0;
    outline: 0;
    background: transparent;
    color: black;
    position: fixed;
    right: 20px;
    top:20px;
    font-size: 25px;
    cursor: pointer;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    align-items: center;
    justify-content: center;
    @media(max-width: 578px){
        display: flex;
    }
`