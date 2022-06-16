import { StyleSheet } from "react-native";
import { hexToRGB } from "../../utils/color";
import { colorPalette } from "../globalStyleVariables";

export default StyleSheet.create({
    pageWrapper: {
        flex: 1,
        backgroundColor: '#F1FAEE'
    },
    pageTitle: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    carouselWrapper: {
        flex: 1,
    },
    slideContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    slideTitle: {
        fontSize: 22
    },
    nextButton: {
        borderRadius: 50,
        width: 100,
        marginTop: 50,
        padding: 10,
        height: 80,
        width: 200,
        backgroundColor: hexToRGB(colorPalette.primary, 0.2)
    }
})