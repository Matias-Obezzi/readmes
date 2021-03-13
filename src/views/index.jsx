import { Route, Switch } from "react-router"

import Home from './Home'

const Router = (props) => {
    return(
        <Switch>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
} 

export default Router