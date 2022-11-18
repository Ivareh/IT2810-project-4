import React, {useState} from "react";
import {StyleSheet, TextInput, View} from 'react-native';
import {searchTerm} from "../globalVariables/globalVariables";


/**
 * SearchField component which is used to search for movies. Passes the
 * input to a global variable called searchTerm.
 */

const styles = StyleSheet.create({
    searchbox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 18,
        marginBottom: 10,
        color: "black",
        backgroundColor: "white",
        borderStyle: "solid",
        borderRadius: 5,


    }
})


function SearchField() {
    const [searchValue, setSearchValue] = useState('');
    return (
        <View
            style={{width: "70%"}}
            nativeID={"searchContainer"}>
            <TextInput
                placeholder={"Search for movies"}
                defaultValue={searchValue}
                onChangeText={(text: string) => setSearchValue(text as string)}
                onSubmitEditing={(e) => {
                    e.preventDefault();
                    searchTerm(searchValue)
                }}
                style={styles.searchbox}
            />
        </View>
    );
}

export default SearchField;
