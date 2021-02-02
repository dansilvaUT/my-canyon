import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Canyons from './Components/Canyons/Canyons';
import Profile from './Components/Profile/Profile';
import Canyoneers from './Components/Canyoneers/Canyoneers';
import Canyon from './Components/Canyons/Canyon';
import AddCanyon from './Components/Canyons/AddCanyon/AddCanyon';
import AddComment from './Components/Comments/AddComment/AddComment';
export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/canyons' component={Canyons} />
        <Route path='/profile' component={Profile} />
        <Route path='/canyoneers' component={Canyoneers} />
        <Route path='/canyon/:id' component={Canyon} />
        <Route path='/add' component={AddCanyon} />
        <Route path='/addcomment/:id' component={AddComment} />
    </Switch>
);