import {AppRegistry, StyleSheet, View} from 'react-native';
import Header from "./components/Header";
import NetflixList from "./components/NetflixList";
import Footer from "./components/Footer";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    uri: 'http://localhost:4000/',
});


export default function App() {
    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
                <Header/>
                <NetflixList/>
                <Footer/>
            </View>
        </ApolloProvider>
    );
}


AppRegistry.registerComponent('MyApplication', () => App);