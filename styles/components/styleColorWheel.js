import { StyleSheet } from "react-native";
import { fixedDimensions } from "../globalStyleVariables";

export default StyleSheet.create({
    modalContainer: {
        position: "absolute",
        bottom: 50,
        right: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0, 0.05)'
    },
    colorButton: {
        width: 40 + fixedDimensions.selectedBorderWidth,
        height: 40 + fixedDimensions.selectedBorderWidth,
        borderWidth: fixedDimensions.selectedBorderWidth,
        borderColor: 'rgba(255,255,255, 0.5)',
        borderRadius: 50,
    },
    prevColorButton: {
        width: 20,
        height: 20,
        borderRadius: 50,
    }
})