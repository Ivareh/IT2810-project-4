import React from "react";
import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    footer: {
        width: "80%",
        
    },
    text: {
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: 10,
        marginBottom: 5,
    }
})

/**
 * Returns a footer for the application.
 */
const Footer = () => {
    return (
        <View
            nativeID={"footer"}
            style={styles.footer}>
            <View
                style={{justifyContent: "space-evenly"}}
            >
                <Text style={styles.text}>Netflix Library © Team
                    62</Text>
            </View>
            <View
                style={{justifyContent: "space-evenly"}}
            >
                <Text style={styles.text}> Check us out on
                    https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-62/project-3
                </Text>
            </View>

        </View>

    )
}
export default Footer;