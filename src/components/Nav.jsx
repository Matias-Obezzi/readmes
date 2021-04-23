import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
`,
StyledTitle = styled.h1`

`,
LinksContainer = styled.div`
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

const Nav = (props) => {
    const location = useLocation()
    return(
        <StyledNav>
            <StyledTitle>
                <StyledLink style={{width: 'auto', font:'unset'}} to='/'>
                    Readmes
                </StyledLink>
            </StyledTitle>
            {location.pathname.startsWith("/r") && (
                <LinksContainer>
                    <StyledLink to='/'>
                        <i className="fas fa-home"></i>
                    </StyledLink>
                </LinksContainer>
            )}
        </StyledNav>
    )
}

export default Nav;