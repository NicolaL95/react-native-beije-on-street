import { StyleSheet } from "react-native";

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
        width: 40,
        height: 40,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255, 0.5)',
        borderRadius: 50,
    }
})