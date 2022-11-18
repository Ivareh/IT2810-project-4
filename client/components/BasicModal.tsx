import * as React from 'react';
import {useQuery} from "@apollo/client";
import {LOAD_SINGLE_SHOW} from "../schemas/Queries";
import CircularIndeterminate from "./container/LoadingSpinner";
import {Modal, StyleSheet, Text, View} from "react-native";
import RatingForm from "./RatingForm";
import LoadingSpinner from "./container/LoadingSpinner";

interface ShowData {
    shows: {
        show_id: number,
        title: string,
        duration: string,
        director: string,
        show_description: string,
        show_rating: string,
        rating: number,
        country: string
    }
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 280,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "left"
    },
    modalTitle: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold"

    }
});


type Props = { show_id: string, isOpen: boolean, handleClose: () => void };

/**
 * Returns a modal for react native for displaying more details about a specific movie.
 * @param props: show_id: id to be used in query, isOpen: boolean from
 * parent component ShowsTable, handleClose, closeHandler from parent.
 */
export default function BasicModal({show_id, isOpen, handleClose}: Props) {
    const {
        data,
        loading,
        error
    } = useQuery(LOAD_SINGLE_SHOW, {variables: {where: {show_id: show_id}}});

    if (error) return (
        <Text data-testid="error-p">Error! {error.message} </Text>

    )

    if (loading) return (
        <LoadingSpinner/>
    )

    console.log(data)

    return (
        <View style={styles.centeredView}>
            <Modal
                transparent={true}
                visible={isOpen}
                onRequestClose={handleClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text
                            nativeID={"modalTitle"}
                            data-testid="modal-title"
                            style={styles.modalTitle}>{ data?.shows[0].title}
                        </Text>
                        <Text
                            nativeID={"modal-duration"}
                            data-testid="modal-duration"
                            style={styles.modalText}>Duration: {data.shows[0].duration}
                        </Text>
                        <Text
                            nativeID={"modalDirector"}
                            data-testid="modal-director"
                            style={styles.modalText}>Director: {data.shows[0].director || "No director"}
                        </Text>
                        <Text
                            nativeID={"modalDescription"}
                            data-testid="modal-description"
                            style={styles.modalText}>{data?.shows[0].show_description}
                        </Text>
                        <Text
                            nativeID={"modalRating"}
                            data-testid="modal-rating"
                            style={styles.modalText}>Rating: {data.shows[0].show_rating || "No rating"}
                        </Text>
                        <Text
                            nativeID={"modalCountry"}
                            data-testid="modal-country"
                            style={styles.modalText}>Produced
                            in: {data?.shows[0].country || "Unknown"}
                        </Text>
                        <Text
                            nativeID={"modalType"}
                            data-testid="modal-type"
                            style={styles.modalText}>Type: {data?.shows[0].type}
                        </Text>
                        <RatingForm show_id={show_id} handleClose={handleClose}
                                    rating={data.shows[0].rating}/>
                    </View>
                </View>

            </Modal>
        </View>
    )
}


