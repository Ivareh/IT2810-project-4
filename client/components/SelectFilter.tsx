import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";


type props = {
    handleSelect: (searchTerm: string) => void
}

/**
 * Contains a select component from react-select which holds filter types used in queries.
 * @param handleSelect  function from parent that handles the selected value.
 */
function SelectFilter({handleSelect}: props) {
    const [selectedOption, setSelectedOption] = React.useState("All");
    const handleChange = (itemValue: string) => {
        setSelectedOption(itemValue);
        handleSelect(itemValue);
    }
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70%",
            alignSelf: "center",
        },
        selectFilter: {
            minWidth: 150,
            height: 25,
            marginBottom: 10,
            fontSize: 18

        },
        text: {
            fontSize: 18,
        }
    })


    return (
        <View
            style={styles.container}
            nativeID="selectFilterContainer">
            <Text
                style={styles.text}
            >Select show type:</Text>
            <Picker
                style={styles.selectFilter}
                nativeID={"selectFilter"}
                aria-label='select show type'
                selectedValue={selectedOption}
                onValueChange={(itemValue) => handleChange(itemValue)}
            >
                <Picker.Item label="All" value=""/>
                <Picker.Item label="Movies" value="Movie"/>
                <Picker.Item label="TV-shows" value="TV Show"/>

            </Picker>
        </View>
    );
}

export default SelectFilter;