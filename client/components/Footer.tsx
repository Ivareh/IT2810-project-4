import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    footer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        marginTop: '20px',
        justifyContent: 'space-evenly',
        marginBottom: '20px',
    },
    text: {
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: 18,
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
                <Text style={styles.text}> Check us out on{' '}
                    <a
                        href="https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-62/project-3"
                        target="_blank"
                        rel="noreferrer"
                        style={{color: 'blue'}}
                    >
                        GitLab
                    </a></Text>
            </View>

        </View>

    )
}
export default Footer;