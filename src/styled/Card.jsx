import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardColumns = styled.div`
    width: 100%;
    @media (min-width: 576px) {
        -webkit-column-count: 3;
        -moz-column-count: 3;
        column-count: 3;
        -webkit-column-gap: 1.25rem;
        -moz-column-gap: 1.25rem;
        column-gap: 1.25rem;
    }
`, Card = styled(Link)`
    background: #fff;
    border-radius: 10px;
    display: inline-block;
    padding: 10px;
    width: calc(100% - 20px);
    margin: 10px;
    height: 100%;
    transition: 0.5s all;
    z-index: 1;
    text-decoration: none;
    color: #24292e;
    &:hover, &:focus{
        outline: 0;
        transform: translateY(-5px);
        box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
    }
`,
CardTitle = styled.b`
    font-size: 1rem;
`