import React from 'react';
import Select from 'react-select';
import {StyleSheet, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";


interface props {
    getSortType: (sortTerm: string) => void;
}

const types = [
    {label: 'Release Year newest-oldest', value: 'DESC'},
    {label: 'Release Year oldest-newest', value: 'ASC'},
];
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%",
        alignSelf: "center",
    },
    sortingField: {
        minWidth: 150,
        height: 25,
        marginBottom: 10,
        fontSize: 18
    },
    text : {
        fontSize: 18,
    }
})



/**
 * SortingField component which is used to sort the search results.
 * @param getSortType function that passes value from this component to the
 * parent.
 */
export function SortingField({getSortType}: props) {
    const [selectedOption, setSelectedOption] = React.useState("DESC");

    const handleChange = (choice: string) => {
        setSelectedOption(choice);
        getSortType(choice);
    }

    return (
        <View style={styles.container} nativeID={"sortingContainer"}>
            <Text
            style={styles.text}
            >Sort by: </Text>
            <Picker
                style={styles.sortingField}
                nativeID={"sortFilter"}
                aria-label='select show type'
                selectedValue={selectedOption}
                onValueChange={(choice) => handleChange(choice)}
            >
                <Picker.Item label="Ascending" value="DESC" />
                <Picker.Item label="Descending" value="ASC" />
            </Picker>

        </View>
    )
}

export default SortingField