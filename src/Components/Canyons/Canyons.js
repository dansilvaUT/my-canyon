import { Component } from 'react';
import Header from '../../Components/Header/Header';
import { Switch, Route, Link } from 'react-router-dom';
import AddCanyon from '../AddCanyon/AddCanyon';
import { connect } from 'react-redux';
import { getCanyons } from '../../redux/reducers/canyonReducer';

class Canyons extends Component {

    componentDidMount() {
        this.props.getCanyons();
    }


    render() {
        const { canyons } = this.props;
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
                {canyons?.map(canyon => (
                    <section key={canyon.canyon_id}>
                        <h3>{canyon.canyon_name}</h3>
                        <img src={canyon.canyon_pic} alt={canyon.canyon_name} />
                        <Link key={canyon.canyon_id} to={`/canyon/${canyon.canyon_id}`}>
                            <button>See More</button>
                        </Link>
                    </section>
                ))}
            </>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        canyons: reduxState.canyonReducer.canyons.data
    }
}

export default connect(mapStateToProps, { getCanyons })(Canyons);