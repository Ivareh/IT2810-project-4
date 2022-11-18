import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        width: "70%",
        alignSelf: "center",
        marginBottom: 20,

    },
    sortingField: {
        minWidth: 150,
        height: 25,
        fontSize: 18,
        color: "white",
        backgroundColor: "black",


    },
    text: {
        fontSize: 14,
        color: "white",
    }
})


interface props {
    getSortType: (sortTerm: string) => void;
}

/**
 * SortingField component which is used to sort the search results.
 * @param getSortType function that passes value from this component to the
 * parent NetflixList.
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
                dropdownIconColor={"white"}
                onValueChange={(choice) => handleChange(choice)}
            >
                <Picker.Item  label="Ascending" value="DESC"/>
                <Picker.Item label="Descending" value="ASC"/>
            </Picker>
        </View>
    )
}

export default SortingField