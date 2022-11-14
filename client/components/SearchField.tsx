import {useState} from "react";
import {TextInput, View} from 'react-native';
import {searchTerm} from "./globalVariables";


/**
 * SearchField component which is used to search for movies. Passes the
 * input to a global variable called searchTerm.
 */
function SearchField() {
    const [searchValue, setSearchValue] = useState('');
    return (
        <View
            style={{width: "70%"}}
            nativeID={"searchContainer"}>
            <TextInput
                placeholder={"Search for movies"}
                defaultValue={searchValue}
                onChangeText={(text) => setSearchValue(text as string)}
                onSubmitEditing={(e) => {
                    e.preventDefault();
                    searchTerm(searchValue)
                }}
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingLeft: 10,
                    fontSize: 18,
                }}
            />
        </View>
    );
}

export default SearchField;
