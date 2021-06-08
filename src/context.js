import { createContext } from "react";

const Context = createContext({
    readmes: [],
    setReadmes: () => {}
})

export default Context;