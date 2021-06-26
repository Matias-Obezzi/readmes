import styled, { keyframes } from "styled-components";
import { Col, ContainerRow } from "../styled/Container"

const Footer = () => {
    const socialLinks = [
        {
            icon: 'fab fa-linkedin-in',
            href: 'https://linkedin.com/in/Matias-Obezzi',
            color: 'white',
            background: '#0e76a8',
            title: 'LinkedIn - Matias Obezzi'
        },
        {
            icon: 'fab fa-github',
            href: 'https://github.com/Matias-Obezzi',
            color: '#f6f8fa',
            background: '#24292e',
            title: 'GitHub - Matias Obezzi'
        },
        {
            icon: 'fas fa-globe-americas',
            href: 'https://matias-obezzi.github.io',
            color: 'white',
            background: '#bf1736',
            title: 'Web Personal - Matias Obezzi'
        },
    ]
    return(
        <StyledFooter>
            <PageInfo style={{justifyContent: 'center'}}>
                <b>Readmes</b>
                <p>Made with <i className="fas fa-heart heart" /> by Matias Obezzi</p>
            </PageInfo>
            <Col>
                <SocialLinksContainer>
                    {socialLinks.map(link => (
                        <SocialLink href={link.href} target="_blank" background={link.background} color={link.color} title={link.title} key={link.href}>
                            <i className={link.icon}></i>
                        </SocialLink>
                    ))}
                </SocialLinksContainer>
            </Col>
        </StyledFooter>
       )
}

export default Footer;

const StyledFooter = styled(ContainerRow)`
    display: flex;
    padding: 20px 10px 20px 10px;
    @media(max-width: 576px){
        flex-direction: column;
    }
`,
SocialLinksContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    @media(max-width: 576px){
        justify-content: center;
    }
`,
SocialLink = styled.a`
    height: 30px;
    width: 30px;
    margin: 5px;
    padding: 5px;
    box-sizing: content-box;
    border-radius: 5px;
    background: ${({background}) => background};
    color: ${({color}) => color};
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
`,
beat = keyframes`
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(0.95);
    }
    100%{
        transform: scale(1);
    }
`,
PageInfo = styled(Col)`
    .heart{
        color: red;
        animation: ${beat} infinite 1s linear;
    }
    @media(max-width: 576px){
        flex-direction: row;
        justify-content: center;
        text-align: center;
        margin-bottom: 10px;
    }
`
