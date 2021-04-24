import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 100%;
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
    background: ${({background = 'transparent'}) => background};
    color: ${({color = 'black'}) => color};
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
`

const Nav = ({toggleOpen}) => {
    const location = useLocation()
    
    return(
        <StyledNav>
            {location.pathname.startsWith("/r") && (
                <LinksContainer>
                    <StyledLink to='/'>
                        <i className="fas fa-arrow-left"></i>
                    </StyledLink>
                </LinksContainer>
            )}
            <StyledTitle>
                <StyledLink style={{width: 'auto', font:'unset'}} to='/'>
                    Readmes
                </StyledLink>
            </StyledTitle>
            {location.pathname.startsWith("/r") && window.innerWidth < 578 && (
                <LinksContainer style={{right: 10}}>
                    <StyledLink as="button" onClick={toggleOpen}>
                        <i className="fas fa-bars"></i>
                    </StyledLink>
                </LinksContainer>
            )}
        </StyledNav>
    )
}

export default Nav;