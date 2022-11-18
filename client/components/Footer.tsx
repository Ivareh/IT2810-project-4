import React from "react";
import {Linking, StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    footer: {
        width: "80%",
        backgroundColor: "black",

    },
    text: {
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: 10,
        marginBottom: 5,
        color: "white",
    },
    gitLabText: {
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: 10,
        marginBottom: 5,
        color: "blue",

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
                <Text style={styles.gitLabText}
                      onPress={() => Linking.openURL('https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-62/project-3')}> Check
                    us out on
                    Gitlab
                </Text>
            </View>
        </View>

    )
}
export default Footer;