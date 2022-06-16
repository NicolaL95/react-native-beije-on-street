import { StyleSheet } from "react-native";

export default StyleSheet.create({
    canvasBlock: {
        position: 'absolute',
        top: 0,
        zIndex: 9,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        opacity: 0.1
    },
    cameraOverlay: {
        position: 'absolute',
        bottom: 80,
        height: 150,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    }
})