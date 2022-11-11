import {Grid} from "@mui/material";

/**
 * Returns a footer for the application.
 */
export default function Footer() {
    return (
        <Grid
            id="footerContainer"
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="fit-content"
            sx={{py: 2, px: 2, mt: 2, boxShadow: 1}}
        >
            <div id="footerText">

                <p tabIndex={0}>Netflix Library © Team
                    62</p>
            </div>
            <div id="gitlabLink">

                <p>
                    Check us out on{' '}
                    <a
                        href="https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-62/project-3"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitLab
                    </a>
                </p>
            </div>
        </Grid>

    );
}
