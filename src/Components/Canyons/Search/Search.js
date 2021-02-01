import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'

const Search = props => {
    return (
        <Container>
            <TextField
                label={props.placeholder}
                onChange={props.onChange}
            />
        </Container>
    );
}

export default Search;
