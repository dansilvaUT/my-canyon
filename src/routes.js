import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Canyons from './Components/Canyons/Canyons';
import Profile from './Components/Profile/Profile';
import Canyoneers from './Components/Canyoneers/Canyoneers';
import Canyon from './Components/Canyons/Canyon';
import AddCanyon from './Components/Canyons/AddCanyon/AddCanyon';
import AddComment from './Components/Comments/AddComment/AddComment';
import EditCanyon from './Components/Canyons/EditCanyon/EditCanyon';
import EditComment from './Components/Comments/EditComment/EditComment';
import DashboardContainer from './Components/DashboardContainer/Dashboard';
import Description from './Components/Profile/Description/Description';
export default (
    <Switch>
        <Route exact path='/' component={Login} />
        {/* <Route path='/canyons' component={Canyons} /> */}
        <Route path='/canyons' component={DashboardContainer} />
        <Route path='/profile' component={Profile} />
        <Route path='/canyoneers' component={Canyoneers} />
        <Route path='/canyon/:id' component={Canyon} />
        <Route path='/add' component={AddCanyon} />
        <Route path='/addcomment/:id' component={AddComment} />
        <Route path='/editcanyon/:id' component={EditCanyon} />
        <Route path='/editcomment/:id' component={EditComment} />
        <Route path='/description/:id' component={Description} />
    </Switch>
);