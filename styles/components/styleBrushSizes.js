import { StyleSheet } from "react-native";
import { hexToRGB } from "../../utils/color";
import { colorPalette, fixedDimensions } from "../globalStyleVariables";

export default StyleSheet.create({
    brushWidthBtn: {
        marginHorizontal: 5,
        backgroundColor: 'black',
        borderRadius: 50,
        borderColor: hexToRGB(colorPalette.primary, 0.5),
    },
    brushWidthBtnSmall: {
        width: 7,
        height: 7,
    },
    brushWidthBtnMedium: {
        width: 15,
        height: 15,
    },
    brushWidthBtnLarge: {
        width: 22,
        height: 22,
    },
})