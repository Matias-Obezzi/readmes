import { useEffect, useState } from "react";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Context from "../context";
import { Container } from "../styled/Container";

const SideNav = () => {
    const {name} = useParams(),
        history = useHistory(),
        [open, setOpen] = useState(window.innerWidth < 578);

    const scrollTop = () => {
        window.scroll({
            top: document.querySelector('body').offsetTop - document.body.scrollTop,
            behavior: 'smooth'
        })
    }

    const toggleOpen = (state = !open) => setOpen(state);

    useEffect(() => {
        setOpen(false);
    }, [history.location])

    return (
        <Context.Consumer>
            {({readmes}) => (
                <>
                    <StyledSideNav open={open}>
                        <Container style={{margin: 0}}>
                            <Brand as={Link} to={'/'}>
                                <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Readmes Icon" height="30" />
                                <h1 style={{fontSize: '25px', marginLeft: 5}}>Readmes</h1>
                            </Brand>
                            <SideNavContainer>
                                {readmes?.map((link, index) => (
                                    <StyledLink
                                        key={index}
                                        className={name === link.name ? 'active' : ''}
                                        to={`/r/${link.name}`}
                                    >
                                        {link.name}
                                    </StyledLink>
                                ))}
                            </SideNavContainer>
                        </Container>
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
                    <MenuButton onClick={() => toggleOpen()}>
                        <i className="fas fa-bars"></i>
                        {open}
                    </MenuButton>
                </>
            )}
        </Context.Consumer>
    )
}

export default SideNav;

const StyledSideNav = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    background: rgb(245, 245, 245);
    min-width: 15vw;
    max-width: 20vw;
    /* box-shadow: 0px 5px 10px rgba(0,0,0,0.2); */
    overflow: hidden;
    transition: 0.5s all;
    max-height: 100vh;
    padding: 10px;
    z-index: 2;
    @media(max-width: 576px){
        position: fixed;
        max-width: 80vw;
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
    height: fit-content;
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
StyledLink = styled(NavLink)`
    text-decoration: none;
    width: 100%;
    background: transparent;
    color: unset;
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
    &:hover, &.active{
        background: rgba(0,0,255,0.8);
        color: white;
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