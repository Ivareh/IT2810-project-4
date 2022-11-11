import React, {useState} from "react";
import {Grid, Pagination} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicModal from "./BasicModal";
import {useQuery, useReactiveVar} from "@apollo/client";
import {FEED_SORT_TABLE_SHOWS} from "../schemas/Queries";
import {StateContainer} from "./container/StateContainer";
import CircularIndeterminate from "./container/CircularIndeterminate";
import Rating from "@mui/material/Rating";
import {reviewCount, searchResult, searchTerm} from "./globalVariables";


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


/**
 * ShowsTable component which is used to display the search results.
 */
function ShowsTable({value, sort}: Props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [showId, setShowId] = useState('')
    const [pageCount, setPageCount] = useState(1)
    const searchCount = useReactiveVar(reviewCount)
    const searchWord = useReactiveVar(searchTerm)


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
    const handlePageNumberChange = (event: React.ChangeEvent<unknown>, value: number) => {
        refetch({
            offset: data.shows.length * (value - 1),
            limit: 12,
        });

    }

    if (error) return (
        <StateContainer>
            <p data-testid={"error-p"}>Error! {error.message} </p>
        </StateContainer>
    )

    if (loading) return (
        <StateContainer>
            <CircularIndeterminate/>
        </StateContainer>
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


    return (
        <>
            {modalOpen && <BasicModal show_id={showId} isOpen={modalOpen}
                                      handleClose={() => handleClose()}/>}
            <div id="infotextContainer">
                <p tabIndex={0}>
                    {searchResult()}
                </p>
                <p tabIndex={0}> 
                    {searchCount === 0 ? "View and review Netflix shows below:" : "You have " +
                    " reviewed " + searchCount + " Netflix shows in this session."}
                </p>
            </div>
            
            <Grid id="netflixList">
                <TableContainer
                    component={Paper}
                    sx={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        maxHeight: 700,
                        minWidth: '375px'
                    }}
                >

                    <Table id="netflixTable" aria-label="simple table"
                           sx={{minWidth: '375px', tableLayout: 'fixed'}}
                           stickyHeader>
                        <TableHead>
                            <TableRow id="showtableHeader" tabIndex={0}>
                                <TableCell
                                    align="center">Type</TableCell>
                                <TableCell  align="center">Title</TableCell>
                                <TableCell 
                                    align="center"
                                >Release Year</TableCell>
                                <TableCell
                                    align="center">Your rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {Object.values(data.shows as IShow[]).flat().map((show) => (
                                <TableRow id="showtableBody" tabIndex={0}
                                    key={show.show_id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {border: 0}
                                    }}
                                    onClick={() => {
                                        handleOpen();
                                        setShowId(show.show_id);
                                    }}
                                    onKeyUp={(e) => { 
                                        if (e.key === "Enter" && !e.defaultPrevented) 
                                        e.currentTarget.click(); }}

                                >
                                    <TableCell 
                                        align="center"
                                        data-testid="c"
                                    >{show.type}</TableCell>
                                    <TableCell 
                                        data-testid="title-cell"
                                        align="center">{show.title}</TableCell>
                                    <TableCell 
                                        align="center">{show.release_year}</TableCell>
                                    <TableCell
                                        align="center"><Rating
                                        sx={{
                                            justifyContent: 'center'
                                        }}
                                        size={"small"}
                                        name="read-only"
                                        readOnly
                                        aria-label="rating"
                                        value={show.rating}
                                    /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination id="tablepagenumbers"
                            onChange={handlePageNumberChange}
                            count={pageCount}
                            color={"primary"}
                />
            </Grid>
        </>


    )
}


export default ShowsTable;
