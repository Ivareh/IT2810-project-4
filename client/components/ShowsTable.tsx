import React, {useEffect, useState} from "react";
import BasicModal from "./BasicModal";
import {useQuery, useReactiveVar} from "@apollo/client";
import {FEED_SORT_TABLE_SHOWS} from "../schemas/Queries";
import CircularIndeterminate from "./container/CircularIndeterminate";
import {reviewCount, searchResult, searchTerm} from "./globalVariables";
import {StyleSheet, Text, View} from "react-native";
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

type DataFromQuery = {
    shows: IShow[];
    showsAggregate: {
        count: number;
    }
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
    const {error, loading, data, refetch} = useQuery<DataFromQuery>(FEED_SORT_TABLE_SHOWS, {
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
        if (value > 0 && value <= (pageCount)) {
            setPage(value)
            refetch({
                offset: (value - 1) * 12,
                limit: 12,
            });
        }
    }
    useEffect(() => {
        console.log(data)
    }, [data])


    if (error) return (
        <Text data-testid={"error-p"}>Error! {error.message} </Text>
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

    if (data?.shows?.length === 0) {
        return (
            <Text>No results found for
                "{searchTerm()}"</Text>)
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
            backgroundColor: "#fff",
            marginTop: 20,
            width: "80%",
        },
        info: {
            width: "70%",
            fontSize: 19,
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
                        <DataTable.Title

                            textStyle={{width: 200}}>Title</DataTable.Title>
                        <DataTable.Title style={{marginLeft: 50}} numeric>Release Year</DataTable.Title>
                        <DataTable.Title numeric>Rating</DataTable.Title>
                    </DataTable.Header>

                    {Object.values(data?.shows as IShow[]).flat().map((show) => (
                        <DataTable.Row
                            style={{width: 'auto'}}
                            key={show.show_id} onPress={() => {
                            handleOpen();
                            setShowId(show.show_id);
                        }}
                        >
                            <DataTable.Cell
                                textStyle={{width: 150}}

                            >{show.title}</DataTable.Cell>
                            <DataTable.Cell numeric>{show.release_year}</DataTable.Cell>
                            <DataTable.Cell numeric><Rating
                                jumpValue={1}
                                ratingCount={1}
                                readonly={true}
                                showReadOnlyText={false}
                                imageSize={20}
                                startingValue={show.rating}
                            /> {show.rating}</DataTable.Cell>
                        </DataTable.Row>


                    ))}
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={pageCount + 1}
                        numberOfItemsPerPage={12}
                        showFastPaginationControls
                        onPageChange={(page: number) => handlePageNumberChange(page)}
                        label={`${page} of ${pageCount}`}
                        selectPageDropdownLabel={'Rows per page'}
                    />

                </DataTable>

            </View>
        </>
    )
}

export default ShowsTable;