import {Grid} from "@mui/material";

/**
 * Returns a header for the application.
 * @constructor
 */
function Header() {
    return (
        <Grid id="header" >
            <Grid id="navMenu">
                <Grid id="logo" container spacing={0} >
                    <h2 tabIndex={0}>NETFLIX LIBRARY</h2>
                </Grid>
                <Grid item id="myProfile">
                    <h3 tabIndex={0}>
                        My profile
                    </h3>

                </Grid>
            </Grid>
            <Grid id="mainText">
                <h1 tabIndex={0}>Search for your favorite movies and TV shows!</h1>
            </Grid>
        </Grid>
    );
}

export default Header;