import { FC, useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

import ColorPicker from "react-native-wheel-color-picker";
import styleColorWheel from "../../styles/components/styleColorWheel";
import { colorPalette } from "../../styles/globalStyleVariables";
import { eventEmit, eventOn } from "../../utils/eventEmitter";
// import { eventEmit } from "../../utils/eventEmitter";

interface initialState {
    current: string
    prevColors: String[]
    isWheelOpen: boolean
}
const initialState = {
    currentColor: colorPalette.primary,
    prevColors: new Array(),
    isWheelOpen: false,
}

// let prevColors: Array<String> = []

let colorButton = colorPalette.primary

const ColorWheel: FC = () => {

    const [state, setState] = useState(initialState)

    const setNewColor = (color: string): void => {

        if (color === state.currentColor) {
            return
        }

        eventEmit('onSetNewColor', color)
        colorButton = color

        /* const prevColorsArr = [...state.prevColors]

        if (!(prevColorsArr.length === 0 && color === '#9647ff')) {
            if (prevColorsArr.length >= 2) {
                prevColorsArr.pop()
            }

            prevColorsArr.unshift(color)
        } */

        setState({
            ...state,
            currentColor: color,
            // prevColors: prevColorsArr
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
        setState({ ...state, isWheelOpen: !drawingEnabled, currentColor: colorButton })
    }

    useEffect(() => {
        eventOn("onBlurColorPicker", onBlurPickerCallback)

        //get colors from storage
    }, [])


    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* {state.prevColors.map((color, index) => (<Pressable
                        key={index}
                        style={[{ backgroundColor: color }, styleColorWheel.prevColorButton]}
                    />
                ))}
 */}
                <Pressable
                    style={[{ position: "relative", zIndex: 999, backgroundColor: state.currentColor }, styleColorWheel.colorButton]}
                    onPress={handleColorModal}
                />
            </View>


            {state.isWheelOpen &&
                <View
                    style={styleColorWheel.modalContainer}
                >

                    <ColorPicker
                        swatches={false}
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

export default ColorWheel