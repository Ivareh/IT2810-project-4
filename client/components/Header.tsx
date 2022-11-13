import React from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";

// /**
//  * Returns a header for the application.
//  * @constructor
//  */
// function LOL() {
//     return (
//         <Grid id="header" >
//             <Grid id="navMenu">
//                 <Grid id="logo" container spacing={0} >
//                     <h2 tabIndex={0}>NETFLIX LIBRARY</h2>
//                 </Grid>
//                 <Grid item id="myProfile">
//                     <h3 tabIndex={0}>
//                         My profile
//                     </h3>
//
//                 </Grid>
//             </Grid>
//             <Grid id="mainText">
//                 <h1 tabIndex={0}>Search for your favorite movies and TV shows!</h1>
//             </Grid>
//         </Grid>
//     );
// }


// import our image from assets folder
const image = require('../assets/images/theatreBackground.webp');
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '50vh',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        backgroundPosition: 'center-center',
        background: "no-repeat fixed",
    },
    mainText: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
    },
    logo: {
        fontFamily: "Zen Tokyo Zoo",
        fontWeight: "bold",
        fontSize: 25,
        color: "white",
        marginLeft: 20,
        textAlign: "left"

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
                style={{
                    backgroundColor: "black",
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
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