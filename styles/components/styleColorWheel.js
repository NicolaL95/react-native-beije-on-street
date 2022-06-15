import { StyleSheet } from "react-native";
import { fixedDimensions } from "../globalStyleVariables";

export default StyleSheet.create({
    modalContainer: {
        position: "absolute",
        // zIndex: 999,
        bottom: 50,
        right: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10
    },
    colorButton: {
        width: 40 + fixedDimensions.selectedBorderWidth,
        height: 40 + fixedDimensions.selectedBorderWidth,
        borderWidth: fixedDimensions.selectedBorderWidth,
        borderColor: 'rgba(255,255,255, 0.5)',
        borderRadius: 50,
    }
})