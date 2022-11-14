import * as React from 'react';
import {useState} from 'react';
import {Rating} from 'react-native-ratings';
import {gql, useMutation} from "@apollo/client";
import {ADD_REVIEW} from "../schemas/Queries";
import {reviewCount} from "./globalVariables";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";


type RatingFormProps = { show_id: string, handleClose: () => void, rating: number | null };


/**
 * Contains a rating- and a TextAreaAutosize component from MUI which is
 * customized for our application.
 */
export default function RatingForm({
                                       show_id,
                                       handleClose,
                                       rating
                                   }: RatingFormProps) {
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


    if (error) return <Text>Error! {error.message}</Text>;

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            alignSelf: "center",
            width: 200,
            marginBottom: 10,
        },
        buttonReview: {
            backgroundColor: "#2196F3",
        },
        buttonClose: {
            backgroundColor: "grey",
        },
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
        },
        textSuccess: {
            color: "green",
            fontWeight: "bold",
            marginBottom: 5,
        },
        textError: {
            color: "red",
            fontWeight: "bold",
            marginBottom: 5,
        }
    })

    return (
        <View
            style={styles.container}
        >
            <Rating
                jumpValue={1}
                data-testid={'review-rating'}
                aria-label="review_rating"
                showRating
                onFinishRating={(newValue: React.SetStateAction<number | null>) => {
                    setDidExecute(false)
                    setValue(newValue);
                    setIsValueValid(true)
                }}
                style={{paddingVertical: 10}}
            />


            <TextInput
                style={{
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                    width: 200,
                    height: 100,
                    marginTop: 10,
                    marginBottom: 10,
                    paddingLeft: 5,
                }}
                data-testid={'data-input'}
                nativeID={'myTextRatingID'}
                aria-label="Write review text area"
                multiline={true}
                numberOfLines={4}
                maxLength={200}
                placeholder="Write a review"
                onChangeText={(text) => {
                    setText(text as string)
                    setDidExecute(false)
                }}
                value={text}/>


            <Pressable
                style={[styles.button, styles.buttonReview]}
                data-testid={'submit-button'}
                onPress={() => {
                    validateRating(value as number)
                }}
            >
                <Text style={styles.textStyle}>Rate</Text>
            </Pressable>
            {!isValueValid && <Text data-testid={'reviewFeedback'}
                                    style={styles.textError}>Please select a
                number
                between 1-5</Text>}
            {didExecute && <Text data-testid={'reviewFeedback'}
                                 style={styles.textSuccess}>Review
                successful!</Text>}

            <Pressable
                style={[styles.button, styles.buttonClose]}
                data-testid={'close-button'}
                onPress={() => handleClose()}
            >
                <Text style={styles.textStyle}>Close</Text>
            </Pressable>

        </View>
    );
}
