import { createContext } from "react";

const ReadmesContext = createContext({
    readmes: [],
    setReadmes: () => {},
    error: null,
    activeReadme: null,
    setActiveReadme: () => {}
})

export default ReadmesContext;