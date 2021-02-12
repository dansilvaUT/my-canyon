import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Canyoneers from './Components/Canyoneers/Canyoneers';
import Canyon from './Components/Canyons/Canyon';
import DashboardContainer from './Components/DashboardContainer/Dashboard';
import Chat from './Components/Chat/Chat';

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/canyons' component={DashboardContainer} />
        <Route path='/profile' component={Profile} />
        <Route path='/canyoneers' component={Canyoneers} />
        <Route path='/canyon/:id' component={Canyon} />
        <Route path='/chat/:id' component={Chat} />
    </Switch>
);