import { Component } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../../redux/reducers/commentReducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import EditComment from './EditComment/EditComment';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

class Comment extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            comment: ''
        }
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }
    componentDidMount() {
        const { id } = this.props;
        this.props.getComments(id);
    }

    handleEditToggle = () => {
        this.setState({ isCommentEditing: !this.state.isCommentEditing })
    }

    deleteComment = (id) => {
        // axios.delete(`/api/comments/${comment_id}`)
        let comment_id = id;
        console.log('front-end hit', id)
        axios.delete(`/api/comment/${comment_id}`)
            .then(() => alert('Comment Deleted'))
            .catch(err => console.log(`Error: ${err.message}`));
    }

    render() {
        console.log("comment cmponent", this.props)
        return (
            <>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>
                                    <Link className='link add-canyon' to={`/addcomment/${this.props.id}`}>
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
                                    {comment.user_id === this.props.userID
                                        ? (
                                            <TableCell className='comment-owner-btn'>
                                                <IconButton aria-label="delete" color="secondary" onClick={() => this.deleteComment(comment.comment_id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                {/* onClick={() => this.handleEditToggle()}  */}
                                                {/* <Link className='link edit-route-btn' to={`/editcomment/${comment.comment_id}`}>
                                                    
                                                </Link> */}

                                                <IconButton aria-label="delete" color="primary" onClick={() => this.handleOpen()}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </IconButton>
                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    open={this.state.isOpen}
                                                    onClose={() => this.handleClose()}
                                        
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                        timeout: 500,
                                                    }}
                                                >
                                                    <Fade in={this.state.isOpen}>
                                                        {/* <Container className='edit-modal' fixed>
                                                <h2 id="transition-modal-title">Transition modal</h2>
                                                <p id="transition-modal-description">react-transition-group animates me.</p>
                                            </Container> */}
                                                        <EditComment comment_id={comment.comment_id} />
                                                    </Fade>
                                                </Modal>
                                            </TableCell>

                                        ) : null}

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
        comments: reduxState.commentReducer.comments.data,
        userID: reduxState.userReducer.user.user_id
    }
}

export default connect(mapStateToProps, { getComments })(Comment);