import { Component } from 'react';
import Header from '../../Components/Header/Header';
import { Switch, Route, Link } from 'react-router-dom';
import AddCanyon from '../AddCanyon/AddCanyon';

class Canyons extends Component {
    render() {
        return (
            <>
                <Header />
                Render Canyons Here
                <Link to='/canyons/add'>
                    <button>Add Canyon</button>
                </Link>

                <Switch>
                    <Route path='/canyons/add' component={AddCanyon} />
                </Switch>
                {/* 
                    TODO
                    Add Subroutes to individual canyon
                */}
            </>
        );
    }
}

export default Canyons;