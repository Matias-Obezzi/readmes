import styled from "styled-components";
import { Container } from "./Container";

export const StyledRedmeNavbar = styled(Container)`
    max-width: 100%;
    z-index: 1;
    display: flex;
    position: sticky;
    top: 0;
    background: var(--background-color);
    color: var(--text-color);
    padding: 10px 50px 10px 0px;
    transition: 0.2s all linear;
    box-shadow: ${({shadow}) => shadow ? 'rgb(0 0 0 / 20%)' : 'transparent'} 0px 5px 10px;
    @media(max-width: 576px){
        padding: 20px 70px 20px 0px;
    }
`,
StyledReadmeNavbarButton = styled.button`
    cursor: pointer;
    font-size: 25px;
    padding: 5px;
    height: 35px;
    width: 35px;
    margin: 0px 7.5px 0px 7.5px;
    background: var(--background-color);
    color: var(--text-color);
    border-radius: 50%;
    border: none;
    transition: 0.2s all;
    :hover{
        transform: scale(0.9);
        background: #f5f5f5;
    }
`