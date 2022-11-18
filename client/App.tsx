import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import Header from "./components/Header";
import NetflixList from "./components/NetflixList";
import Footer from "./components/Footer";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import React from 'react';


const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                shows: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }
            }
        },
    },
});
const client = new ApolloClient({
    cache,
    uri: 'http://it2810-62.idi.ntnu.no:4000/graphql',
});


export default function App() {
    return (
        <ApolloProvider client={client}>
            <StatusBar
                animated={true}
                translucent={true}
            />
            <ScrollView style={styles.container}
                        contentContainerStyle={styles.contentContainer}>
                <Header/>
                <NetflixList/>
                <Footer/>
            </ScrollView>
        </ApolloProvider>
    );
}
