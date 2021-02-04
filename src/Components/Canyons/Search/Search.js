import TextField from '@material-ui/core/TextField';
import './search.scss';

const Search = props => {
    return (
        <section className="search-field-container">
            <TextField
                className="search-field"
                label={props.placeholder}
                onChange={props.onChange}
            />
        </section>
    );
}

export default Search;
