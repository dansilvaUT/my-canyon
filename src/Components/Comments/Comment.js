import { Component } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../../redux/reducers/commentReducer';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';

class Comment extends Component {

    componentDidMount() {
        const { id } = this.props;
        this.props.getComments(id);
    }

    render() {
        console.log("comment cmponent",this.props)
        return (
            <>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>
                                    <Link to={`/addcomment/${this.props.id}`}>
                                        <Button variant="contained" color="primary">Add a Comment</Button>
                                    </Link>

                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.comments?.map((comment) => (
                                <TableRow key={comment.comment_id}>
                                    <TableCell component="th" scope="row">
                                        {comment.username}
                                    </TableCell>
                                    <TableCell>{comment.user_comment}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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