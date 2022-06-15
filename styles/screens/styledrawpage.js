import { Dimensions, StyleSheet } from 'react-native'
import { fixedDimensions } from '../globalStyleVariables'

const style = StyleSheet.create({
    barHeader: {
        top: 0,
    },
    barFooter: {
        bottom: 0,
    },
    bar: {
        position: 'absolute',
        zIndex: 9999,
        flexDirection: 'row',
        height: fixedDimensions.headerHeight,
        width: Dimensions.get('window').width,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
        // backgroundColor: 'turquoise',
        // opacity: 0.2
    },
    barRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    drawTable_icon: {
        height: 42,
        width: 42
    }
})


export default style