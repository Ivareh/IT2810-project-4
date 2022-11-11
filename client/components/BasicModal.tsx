import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import RatingForm from "./RatingForm";
import {useQuery} from "@apollo/client";
import {LOAD_SINGLE_SHOW} from "../schemas/Queries";
import {Typography} from "@mui/material";
import CircularIndeterminate from "./container/CircularIndeterminate";
import {StateContainer} from "./container/StateContainer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 368,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};


type Props = { show_id: string, isOpen: boolean, handleClose: () => void };

/**
 * Returns a modal for displaying more details about a specific movie.
 * @param props: show_id: id to be used in query, isOpen: boolean from
 * parent component ShowsTable, handleClose, closeHandler from parent.
 */
export default function BasicModal({show_id, isOpen, handleClose}: Props) {
    const {
        data,
        loading,
        error
    } = useQuery(LOAD_SINGLE_SHOW, {variables: {where: {show_id: show_id}}});
    const [rating, setRating] = React.useState<number | null>(0);

    if (error) return (
        <StateContainer>
            <p data-testid="error-p">Error! {error.message} </p>
        </StateContainer>
    )

    if (loading) return (
        <StateContainer>
            <CircularIndeterminate/>
        </StateContainer>
    )

    console.log(data)

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <>
                        <Typography
                            sx={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                            id="modal-modal-title"
                            data-testid="modal-title"
                            variant="h6"
                            component="h2">{data.shows[0].title} </Typography>
                        <Typography
                            data-testid={"modal-duration"}
                            sx={{color: 'black'}}>Duration: {data.shows[0].duration} </Typography>
                        <Typography
                            data-testid={"modal-director"}
                            sx={{color: 'black'}}>Director: {data.shows[0].director || "Director is unknown"} </Typography>
                        <hr/>

                        <Typography
                            id="modal-modal-description"
                            data-testid={"modal-description"}
                            sx={{
                                mt: 1,
                                color: 'black',
                                fontStyle: 'italic'

                            }}>{data.shows[0].show_description}</Typography>
                        <Typography
                            id="modal-modal-show-rating"
                            data-testid={"modal-show-rating"}
                            sx={{
                                mt: 1,
                                color: 'black',
                            }}>Film
                            rating: {data.shows[0].show_rating || "Unknown"}</Typography>
                        <Typography
                            id="modal-modal-country"
                            data-testid={"modal-country"}
                            sx={{
                                mt: 1,
                                color: 'black'
                            }}>Produced in: {data.shows[0].country || 'Unknown'}</Typography>
                    </>
                    <RatingForm show_id={show_id} handleClose={handleClose} rating={data.shows[0].rating}/>
                </Box>

            </Modal>
        </div>
    );


}


