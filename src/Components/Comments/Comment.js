import { Component } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../../redux/reducers/commentReducer';

class Comment extends Component {

    componentDidMount() {
        const { id } = this.props;
        this.props.getComments(id);
    }

    render() {
        return (
            <>
                {this.props.comments?.map(comment => (
                    <p key={comment.comment_id}>{comment.user_comment}</p>
                ))}
            </>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        comments: reduxState.commentReducer.comments.data
    }
}

export default connect(mapStateToProps, { getComments })(Comment);