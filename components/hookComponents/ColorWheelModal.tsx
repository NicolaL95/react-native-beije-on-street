import { FC, useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

import ColorPicker from "react-native-wheel-color-picker";
import styleColorWheelModal from "../../styles/components/styleColorWheelModal";
import { colorPalette } from "../../styles/globalStyleVariables";
import { eventEmit, eventOn } from "../../utils/eventEmitter";
// import { eventEmit } from "../../utils/eventEmitter";

interface initialState {
    current: string,
    isWheelOpen: boolean
}
const initialState = {
    currentColor: colorPalette.primary,
    isWheelOpen: false,
}

const ColorWheelModal: FC = (props) => {

    const [state, setState] = useState(initialState)

    const setNewColor = (color: string): void => {
        if (color === state.currentColor) {
            return
        }

        eventEmit('onSetNewColor', color)

        setState({
            ...state,
            currentColor: color
        })
    }

    const handleColorModal = (): void => {

        eventEmit('onColorModalTrigger', state.isWheelOpen)

        setState({
            ...state,
            isWheelOpen: !state.isWheelOpen
        })
    }

    const onBlurPickerCallback = (drawingEnabled: boolean): void => {
        setState({ ...state, isWheelOpen: !drawingEnabled })
    }

    useEffect(() => {
        eventOn("onBlurColorPicker", onBlurPickerCallback)
    }, [state.currentColor])

    return (
        <>
            <Pressable
                style={{ position: "relative", zIndex: 999 }}
                onPress={handleColorModal}
            >

                <View
                    style={[
                        styleColorWheelModal.colorButton,
                        { backgroundColor: state.currentColor }
                    ]}
                />

            </Pressable>

            {state.isWheelOpen &&
                <View
                    style={styleColorWheelModal.modalContainer}
                >

                    <ColorPicker
                        palette={['#57ff0a', '#ffde17', '#f26522']}
                        onColorChangeComplete={setNewColor}
                        gapSize={20}
                        thumbSize={25}
                        color={state.currentColor}
                    />
                </View>
            }
        </>

    )
}

export default ColorWheelModal