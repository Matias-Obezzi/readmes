import styled from "styled-components";

export const Container = styled.div`
    display: block;
    margin: auto;
    width: 100%;
`,
ContainerRow = styled(Container)`
    display: flex;
    flex-direction: row;
`,
Col = styled.div`
    display: flex;
    flex-direction: column;
    width: ${({col = 1, maxCol = 1}) => col * 100 / maxCol}%;
    padding: 0 10px;
`