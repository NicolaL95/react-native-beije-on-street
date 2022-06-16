import { StyleSheet } from "react-native";
import { hexToRGB } from "../../utils/color";
import { colorPalette, fixedDimensions } from "../globalStyleVariables";

export default StyleSheet.create({
    modalContainer: {
        position: "absolute",
        bottom: 50,
        right: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: hexToRGB('#000', 0.5)
    },
    colorButton: {
        width: 40 + fixedDimensions.selectedBorderWidth,
        height: 40 + fixedDimensions.selectedBorderWidth,
        borderWidth: fixedDimensions.selectedBorderWidth,
        borderColor: hexToRGB(colorPalette.primary, 0.5),
        borderRadius: 50,
    },
    prevColorButton: {
        width: 20,
        height: 20,
        borderRadius: 50,
    }
})