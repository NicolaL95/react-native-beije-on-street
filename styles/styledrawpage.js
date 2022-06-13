import { Dimensions, StyleSheet } from 'react-native'

const style = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        height: 75,
        width: Dimensions.get('window').width,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    barRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})


export default style