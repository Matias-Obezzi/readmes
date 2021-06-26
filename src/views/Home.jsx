import { useEffect, useState } from "react";

import * as apiService from '../apiService'
import ErrorHandler from "../components/ErrorHandler";
import { Card, CardTitle, CardColumns } from "../styled/Card";
import { Container } from "../styled/Container";

const Home = (props) => {
    const [readmes, error] = useGetReadmes(); 

    return(
        <Container>
            <ErrorHandler error={error} data={readmes} >
                <CardColumns>
                    {readmes?.map(readme => (
                        <Card key={readme.name} to={`/r/${readme.name}`}>
                            <CardTitle>{readme.name}</CardTitle>
                        </Card>
                    ))}
                </CardColumns>
            </ErrorHandler>
        </Container>
    )
}

export default Home;

const useGetReadmes = () => {
    const [readmes, setReadmes] = useState(null),
        [error, setError] = useState("");
        
    useEffect(() => {
        apiService.getReadmes().then(res => {
            setReadmes(res)
            setError("")
        }).catch(err =>{
            setReadmes(null)
            setError(err.message)
        })
        document.title = "Readmes | Inicio"
        return () => { 
            document.title = "Readmes"
        }
    }, [])

    return [readmes, error];
}