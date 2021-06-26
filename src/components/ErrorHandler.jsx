import Loading from "./Loading";

const ErrorHandler = ({error, data, children}) => {
    if(!error && !data) return <Loading />
    else if (error) return <p>{error}</p>
    return children;
}

export default ErrorHandler;