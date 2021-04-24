import { Route, Switch } from "react-router"

import Home from './Home'
import Readme from './Readme'

const Router = (props) => {
    return(
        <Switch>
            <Route exact path="/">
                <Home {...props} />
            </Route>
            <Route path="/r/:name">
                <Readme {...props} />
            </Route>
        </Switch>
    )
} 

export default Router