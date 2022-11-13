import ShowsTable from "./ShowsTable";
import SelectFilter from "./SelectFilter";
import SortingField from "./SortingField";
import SearchField from "./SearchField";
import React, {useState} from "react";
import {StyleSheet, View} from "react-native";


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

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 20,
            marginBottom: 20,
            width: "100%",

        }
    })

    return (
        <View style={styles.container} nativeID="netflixContainer">
            <SelectFilter handleSelect={handleSelect}/>
            <SortingField getSortType={getSortType}/>
            <SearchField/>
            <ShowsTable value={value} sort={sort}/>
        </View>
    )

}