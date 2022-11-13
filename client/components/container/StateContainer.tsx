import {StyleSheet, View} from "react-native";

const style = StyleSheet.create({
    centeredView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
    }
});


function StateContainer() {
    return (
        <View style={style.centeredView}/>
    )

}

export default StateContainer;





