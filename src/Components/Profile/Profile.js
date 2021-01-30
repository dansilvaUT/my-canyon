import { Component } from 'react';
import Header from '../../Components/Header/Header';
import { connect } from 'react-redux';

class Profile extends Component {
    //TODO
    //ADD CONDITIONAL RENDERING TO DISPLAY IMAGE PLACEHODER ONCE S3 IS SET UP
    render() {
        return (
            <>
                <Header />
                <section>
                    <h1>{this.props.user.username}</h1>
                    <img src={this.props.user.profile_pic} alt={this.props.user.username} />
                    <h3>Member since {this.props.user.date_added}</h3>
                    <section>
                        {this.props.user.about === null
                            ? (
                                <>
                                    <p>Describe {this.props.user.username} here</p>
                                    <button>Add Description</button>
                                </>
                            )
                            : <div>{this.props.user.about}</div>}
                    </section>
                </section>
            </>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        user: reduxState.userReducer.user
    }
}

export default connect(mapStateToProps)(Profile);