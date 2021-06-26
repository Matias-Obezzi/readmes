import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Container } from "../styled/Container";

export const StyledReactMarkdownContainer = styled(Container)`
    padding: 20px 50px 20px 50px;
`,
StyledReactMarkdown = styled(ReactMarkdown)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 28px;
        border-bottom: 2px solid #cccccc;
    }
    
    h2 {
        font-size: 24px;
        border-bottom: 1px solid #cccccc;
    }
    
    h3 {
        font-size: 18px;
    }
    
    h4 {
        font-size: 16px;
    }
    
    h5 {
        font-size: 14px;
    }
    
    h6 {
        color: #777777;
        font-size: 14px;
    }
    h1, h2{
        padding-bottom: 5px;
        margin-bottom: 15px;
    }
    p, blockquote, ul, ol, dl, li, table, pre {
        margin-top: 5px;
        margin-bottom: 15px;
    }
    hr {
        border: 0 none;
        color: #cccccc;
        height: 4px;
        padding: 0;
    }
    code{
        display: block;
        width: fit-content;
        margin: 5px 0;
        padding: 5px 8px;
        background: #f0f0f0;
        border-radius: 5px;
        color: #0f0f0f;
        word-break: break-word;
    }
    a{
        color: #0366d6;
        text-decoration: none;
        :hover{
            text-decoration: underline;
        }
    }
    :first-child{
        margin-top: 0;
    }
`