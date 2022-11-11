import * as React from 'react';
import {useState} from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import {gql, useMutation} from "@apollo/client";
import {ADD_REVIEW} from "../schemas/Queries";
import {reviewCount} from "./globalVariables";


type RatingFormProps = { show_id: string, handleClose: () => void, rating: number | null };


/**
 * Contains a rating- and a TextAreaAutosize component from MUI which is
 * customized for our application.
 */
export default function RatingForm({show_id, handleClose, rating}: RatingFormProps) {
    const [text, setText] = useState('')
    const [value, setValue] = React.useState<number | null>(rating || 0);
    const [didExecute, setDidExecute] = useState(false)
    const [isValueValid, setIsValueValid] = useState(true)

    const [addReview, {error}] = useMutation(ADD_REVIEW, {
        variables: {
            where: {show_id: show_id},
            update: {rating: value}

        },
        // Update local cache to reflect that we updated rating to a single
        // show in database.
        update(cache, {data: {updateShows}}) {
            cache.modify({
                fields: {
                    shows(existingShows = []) {
                        const newShowRef = cache.writeFragment({
                            id: show_id,
                            data: updateShows.shows[0],
                            fragment: gql`
                                fragment NewShow on Show {
                                    show_id
                                    rating
                                }
                            `
                        });
                        return [...existingShows, newShowRef];
                    }
                }
            });
        },

        onCompleted: () => {
            setDidExecute(true)
        },

    });


    // function that valides that the rating is between 0 and 5
    const validateRating = (rating: number) => {
        if (rating < 1 || rating > 5) {
            setIsValueValid(false)
            return
        } else {
            setIsValueValid(true)
            addReview({
                variables: {
                    where: {show_id: show_id},
                    update: {rating: value}
                },
            });
            reviewCount(reviewCount() + 1);
        }

    }


    if (error) return <p>Error! {error.message}</p>;

    return (
        <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center"
            //   id="modalContainer"
        >
            <Typography component="legend" id="myRatingInModalText"
                        sx={{
                            textAlign: 'center',
                            marginTop: '20px'
                        }}>Rating</Typography>
            <Rating
                sx={{
                    justifyContent: 'center'
                }}
                data-testid={'review-rating'}
                name="simple-controlled"
                aria-label="review_rating"
                value={value}
                onChange={(event, newValue) => {
                    setDidExecute(false)
                    setValue(newValue);
                    setIsValueValid(true)
                }}
            />
            <label htmlFor="myTextRatingID" id="myTextRatingIDlabel">Write
                review</label>
            <TextareaAutosize
                id="myTextRatingID"
                aria-label="Write review text area"
                data-testid={'data-input'}
                minRows={4}
                value={text}
                placeholder={'Write review'}
                maxRows={10}
                onChange={(event) => {
                    setText(event.target.value as string)
                    setDidExecute(false)
                }
                }
                style={{
                    minWidth: 100,
                    minHeight: 100,
                    width: 300,
                    height: 100,
                    maxWidth: 350,
                    maxHeight: 300,
                    marginBottom: '10px',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            />
            <Button variant="contained"
                    data-testid={'submit-button'}
                    sx={{width: '100px', justifyContent: 'center'}}
                    color="success"
                    onClick={() => {
                        validateRating(value as number)
                    }}>Rate</Button>
            {!isValueValid && <p data-testid={'reviewFeedback'}
                                style={{color: "black"}}>Please select a number
                between 1-5</p>}
            {didExecute && <p data-testid={'reviewFeedback'}
                              style={{color: "black"}}>Review successful!</p>}
            <Button variant="contained"
                    sx={{width: '200px', justifyContent: 'center', mt: '15px'}}
                    color="error"
                    data-testid={'close-button'}
                    onClick={() => handleClose()
                    }>Close</Button>
        </Grid>
    );
}
