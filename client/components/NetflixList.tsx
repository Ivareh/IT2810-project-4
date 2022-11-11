import ShowsTable from "./ShowsTable";
import {Grid} from "@mui/material";
import SelectFilter from "./SelectFilter";
import SortingField from "./SortingField";
import SearchField from "./SearchField";
import React, {useState} from "react";


/**
 * NetflixList component which supplies filter and sort options to the
 * ShowsTable component while rendering user inputs.
 */
export default function NetflixList() {
    const [value, setValue] = useState("");
    const [sort, setSort] = useState("DESC");

    function getSortType(sortTerm: string) {
        setSort(sortTerm)
    }

    function handleSelect(value: any) {
        setValue(value)
    }

    return (
        <Grid id="netflixContainer">
            <SelectFilter handleSelect={handleSelect}/>
            <SortingField getSortType={getSortType}/>
            <SearchField/>
            <ShowsTable value={value} sort={sort}/>
        </Grid>
    )

}