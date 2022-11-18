import React from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";

const image = require('../assets/images/theatreBackground.webp');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        backgroundPosition: 'center-center',
        alignContent: "center",
        background: "no-repeat fixed",
        height: 200,
        padding: 10,
    },
    mainText: {
        color: "white",
        fontSize: 25,
        lineHeight: 45,
        marginBottom: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    logo: {
        fontWeight: "bold",
        fontSize: 15,
        color: "white",
        marginLeft: 20,
        marginTop: 10,
        textAlign: "left"
    },
    logoContainer: {
        marginTop: 20,
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        width: "100%",
    }
});


/**
 * Header for react native. Background image should render in the background
 * allowing other components to be rendered on top of it.
 * @constructor
 */
const Header = () => {
    return (
        <>
            <View
                nativeID="navMenu"
                style={styles.logoContainer}
            >
                <Text style={styles.logo}>NETFLIX LIBRARY</Text>


            </View>
            <View
                nativeID={"header"}
                style={styles.container}>
                <ImageBackground source={image} resizeMode="cover"
                                 style={styles.image}>

                    <Text style={styles.mainText}>Search for your favorite
                        movies and TV shows!</Text>
                </ImageBackground>
            </View>
        </>


    )


}

export default Header;