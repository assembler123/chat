import React from 'react';
import { Route , Switch ,BrowserRouter as  Router} from 'react-router-dom';
import Login from './Login';
import Bye from './Bye'
class Routes extends React.Component {
    render() {
        return (
        <Router> 
            <Switch>
                <Route path='/chat/:user/:room' component={Bye}></Route>
                <Route path='/' component={Login}></Route>
            </Switch>
        </Router>
        );
    }
}
export default Routes;