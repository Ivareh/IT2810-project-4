import React from 'react';
import Select from 'react-select';
import {StyleSheet, Text, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {Picker} from "@react-native-picker/picker";


const types = [
    {label: 'All', value: ''},
    {label: 'Movies', value: 'Movie'},
    {label: 'TV-shows', value: 'TV Show'},
];

type props = {
    handleSelect: (searchTerm: string) => void
}

/**
 * Contains a select component from react-select which holds filter types used in queries.
 * @param handleSelect  function from parent that handles the selected value.
 */
function SelectFilter({handleSelect}: props) {
    const [selectedOption, setSelectedOption] = React.useState(types[0]);

    const handleChange = (choice: { label: string; value: string; }) => {
        setSelectedOption(choice);
        handleSelect(choice.value);
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
            width: 200,
            height: 25,
            marginBottom: 10,

        },
        text : {
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
                onValueChange={(choice) => handleChange(choice as { label: string; value: string; })}
            >
                <Picker.Item label="All" value="" />
                <Picker.Item label="Movies" value="Movie" />
                <Picker.Item label="TV-shows" value="TV Show" />

            </Picker>
        </View>
    );
}

export default SelectFilter;