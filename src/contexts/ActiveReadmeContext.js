import { createContext } from "react";

const ActiveReadmeContext = createContext({
    links: [],
    setLinks: () => {},
    activeLink: 0,
    setActiveLink: () => {}
})

export default ActiveReadmeContext;