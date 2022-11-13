import React, {useState} from "react";
// import Table from "@mui/material/Table";
import BasicModal from "./BasicModal";
import {useQuery, useReactiveVar} from "@apollo/client";
import {FEED_SORT_TABLE_SHOWS} from "../schemas/Queries";
import CircularIndeterminate from "./container/CircularIndeterminate";
import {reviewCount, searchResult, searchTerm} from "./globalVariables";
import {LogBox, StyleSheet, Text, View} from "react-native";
import {DataTable} from 'react-native-paper';
import {Rating} from 'react-native-ratings';


interface IShow {
    show_id: string;
    type: string;
    title: string;
    release_year: string;
    director: string;
    rating: number;
}

type Props = {
    value: string;
    sort: string;

}

const optionsPerPage = [2, 3, 4];

/**
 * ShowsTable component which is used to display the search results.
 */
function ShowsTable({value, sort}: Props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [showId, setShowId] = useState('')
    const [pageCount, setPageCount] = useState(1)
    const searchCount = useReactiveVar(reviewCount)
    const searchWord = useReactiveVar(searchTerm)
    const [page, setPage] = useState(1)


    /**
     * Loads the data from the backend to be displayed in the table.
     * @param searchTerm The search term which is used to filter the data.
     * @param value The value which is used to filter the data.
     * @param sort The sort type which is used to sort the data.
     */
    const {error, loading, data, refetch} = useQuery(FEED_SORT_TABLE_SHOWS, {
        variables: {
            offset: 0,
            limit: 12,
            where: {title_CONTAINS: searchWord, type_CONTAINS: value},
            sortReleaseYear: sort
        },
        onCompleted: data => {
            setPageCount(Math.ceil(data.showsAggregate.count / 12))
        }
    });

    /**
     * Function to handle the pagination. Calls refetch with the new offset.
     */
    const handlePageNumberChange = (value: number) => {
        if (value === 0) {
            setPage(1)
            value = 1
        } 
        if(value > 0 && value <= (pageCount)) {
            setPage(value)
            refetch({
                offset: data.shows.length * (value - 1),
                limit: 12,
            });
        }
    }

    if (error) return (
        <p data-testid={"error-p"}>Error! {error.message} </p>
    )

    if (loading) return (
        <CircularIndeterminate/>
    )

    function handleClose() {
        setModalOpen(false)
    }

    function handleOpen() {
        setModalOpen(true)
    }

    if (data.shows.length === 0) {
        return (
            <h2 style={{marginTop: '20px'}}>No results found for
                "{searchTerm()}"</h2>)
    }

    // Updating global variable.
    if (searchWord === "") {
        if (value == "") {
            searchResult(`Showing all results. Displaying both Movies and TV-shows. Ordered by ${sort}.`)
        } else {
            searchResult(`Showing all results. Displaying only ${value}s. Ordered by ${sort}.`)
        }

    } else {
        if (value == "") {
            searchResult(`Showing results for "${searchWord}". Showing both movies and series.
           Ordered by ${sort}.`)
        } else {
            searchResult(`Showing results for "${searchWord}". Showing only ${value}s.
           Ordered by ${sort}.`)
        }

    }


    const styles = StyleSheet.create({
        table: {
            width: "70%",
            backgroundColor: "#fff",
            marginTop: "20px",
        },
        info: {
            width: "70%",
            fontSize: "18px",
        },
        head: {height: 40, backgroundColor: '#fff', textAlign: "center"},
        text: {margin: 6, textAlign: "center"},
        container: {
            flex: 1,
            padding: 16,
            paddingTop: 30,
            backgroundColor: '#fff'
        },
        row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
        btn: {
            width: 58,
            height: 18,
            backgroundColor: '#78B7BB',
            borderRadius: 2
        },
        btnText: {textAlign: 'center', color: '#fff'}
    })

    return (
        <>
            {modalOpen && <BasicModal show_id={showId} isOpen={modalOpen}
                                      handleClose={() => handleClose()}/>}
            <View
                style={styles.info}
                nativeID="infotextContainer">
                <Text>
                    {searchResult()}
                </Text>
                <Text>
                    {searchCount === 0 ? "View and review Netflix shows below:" : "You have " +
                        " reviewed " + searchCount + " Netflix shows in this session."}
                </Text>
            </View>

            <View
                style={styles.table}
                nativeID="netflixList">
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Type</DataTable.Title>
                        <DataTable.Title>Title</DataTable.Title>
                        <DataTable.Title>Release Year</DataTable.Title>
                        <DataTable.Title>Rating</DataTable.Title>
                    </DataTable.Header>

                    {Object.values(data.shows as IShow[]).flat().map((show) => (
                        <DataTable.Row key={show.show_id} onPress={() => {
                            handleOpen();
                            setShowId(show.show_id);
                        }}
                        >
                            <DataTable.Cell>{show.type}</DataTable.Cell>
                            <DataTable.Cell>{show.title}</DataTable.Cell>
                            <DataTable.Cell>{show.release_year}</DataTable.Cell>
                            <DataTable.Cell><Rating
                                showRating
                                startingValue={show.rating}
                                style={{paddingVertical: 10}}
                            /></DataTable.Cell>
                        </DataTable.Row>


                    ))}
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={pageCount+1}
                        numberofItemsPerPageList={12}
                        showFastPaginationControls
                        onPageChange={(page : number) => handlePageNumberChange(page)} 
                        label={`${page} of ${pageCount}`}
                        selectPageDropdownLabel={'Rows per page'}
                    />

                </DataTable>

            </View>
        </>
    )
}

export default ShowsTable;