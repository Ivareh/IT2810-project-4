import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";


type props = {
    handleSelect: (searchTerm: string) => void
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        width: "70%",
        alignSelf: "center",

    },
    selectFilter: {
        minWidth: 150,
        backgroundColor: "black",
        borderStyle: "solid",
        borderRadius: 5,
        color: "white",


    },
    text: {
        fontSize: 14,
        color: "white",
    }
})

/**
 * Component that renders a select filter which is used to filter the search results.
 * @param handleSelect  function from parent that handles the selected value.
 */
function SelectFilter({handleSelect}: props) {
    const [selectedOption, setSelectedOption] = React.useState("All");
    const handleChange = (itemValue: string) => {
        setSelectedOption(itemValue);
        handleSelect(itemValue);
    }

    return (
        <View
            style={styles.container}
            nativeID="selectFilterContainer">
            <Text
                style={styles.text}
            >Show type:</Text>
            <Picker
                style={styles.selectFilter}
                nativeID={"selectFilter"}
                focusable={true}
                dropdownIconColor={"white"}
                aria-label='select show type'
                selectedValue={selectedOption}
                onValueChange={(itemValue: string) => handleChange(itemValue)}
            >
                <Picker.Item label="All" value=""/>
                <Picker.Item label="Movies" value="Movie"/>
                <Picker.Item label="TV-shows" value="TV Show"/>

            </Picker>
        </View>
    );
}

export default SelectFilter;