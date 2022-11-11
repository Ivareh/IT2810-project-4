import {IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";
import {searchTerm} from "./globalVariables";


type props = {
    handleSearch: (searchTerm: string) => void;
};

/**
 * SearchField component which is used to search for movies. Passes the
 * input to a global variable called searchTerm.
 */
function SearchField() {
    const [searchValue, setSearchValue] = useState('');
    return (
        <div id="searchContainer">
            <TextField 
                id="filled-search"
                label="Search for a Netflix show"
                aria-label="searchfield"
                fullWidth
                variant="filled"
                // placeholder="Title of your favorite Netflix movie or TV show"
                margin="normal"
                inputProps={{
                    "data-testid": "search-field",
                }}
                value={searchValue}
                
                onChange={(event) => setSearchValue(event.target.value as string)}
                InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton id="searchButton" 
                                        data-testid="search-button"
                                        aria-label="search for show title"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            searchTerm(searchValue)
                                        }}>
                                <SearchIcon/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

export default SearchField;
