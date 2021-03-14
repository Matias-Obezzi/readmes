import { useEffect, useState } from "react";

import * as apiService from '../apiService'
import Loading from "../components/Loading";
import { Card, CardTitle, CardColumns } from "../styled/Card";
import { Container } from "../styled/Container";

const Home = (props) => {
    const [readmes, setReadmes] = useState(null),
        [error, setError] = useState("")

    useEffect(() => {
        apiService.getReadmes().then(res => {
            setReadmes(res)
            setError("")
        }).catch(err =>{
            setReadmes(null)
            setError(err.message)
        })
    }, [])

    return(
        <Container>
            {!error && !readmes ? 
                <Loading />
                : error ? 
                    <>{error}</>
                    : <CardColumns>
                        {readmes.map(readme => (
                            <Card key={readme.name} to={`/r/${readme.name}`}>
                                <CardTitle>{readme.name}</CardTitle>
                            </Card>
                        ))}
                    </CardColumns>
            }
        </Container>
    )
}

export default Home;