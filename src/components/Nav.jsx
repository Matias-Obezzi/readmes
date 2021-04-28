import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = ({open, toggleOpen}) => {
    const location = useLocation()
    
    useEffect(() => {
        if(open)
            document.querySelector('body').classList.add('oHidden')
        else
            document.querySelector('body').classList.remove('oHidden')
    }, [open])

    return(
        <>
            <Backdrop show={open} onClick={() => toggleOpen(false)} />
            <StyledNav open={open}>
                {location.pathname.startsWith("/r") && (
                    <LinksContainer>
                        <StyledLink to='/' onClick={() => toggleOpen(false)}>
                            <i className="fas fa-arrow-left"></i>
                        </StyledLink>
                    </LinksContainer>
                )}
                <StyledTitle>
                    <StyledLink style={{width: 'auto', font:'unset'}} to='/' onClick={() => toggleOpen(false)}>
                        Readmes
                    </StyledLink>
                </StyledTitle>
                {location.pathname.startsWith("/r") && window.innerWidth < 578 && (
                    <LinksContainer style={{right: 10}}>
                        <StyledLink as="button" onClick={() => toggleOpen()}>
                            <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`}></i>
                        </StyledLink>
                    </LinksContainer>
                )}
            </StyledNav>
        </>
    )
}

export default Nav;

const StyledNav = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    z-index: 3;
    color: ${({open}) => open ? 'white' : 'unset'};
    @media(max-width:750px){
        backdrop-filter: blur(1rem);
        position: sticky;
        top:0;
    }
`,
StyledTitle = styled.h1`
    margin:auto;
`,
LinksContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
`,
StyledLink = styled(NavLink)`
    height: 30px;
    width: 30px;
    margin: 5px;
    padding: 5px;
    box-sizing: content-box;
    border-radius: 5px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: 0.3s all;
    font-size: 25px;
    text-decoration: none;
    font-weight: bold;
    border: 0;
    & i{
        & , &::before{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            width: 30px;
        }
    }
    &:focus{
        outline: 0;
    }
    &:hover{
        transform: scale(0.9);
    }
`,
Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 2;
    display: ${({show}) => show ? 'block' : 'none'};
    transition: 0.2s all;
    position: fixed;
    background: rgba(0,0,0,0.4);
`