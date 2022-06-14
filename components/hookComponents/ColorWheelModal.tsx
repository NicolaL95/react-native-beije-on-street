import { FC, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

import ColorPicker from "react-native-wheel-color-picker";
import styleColorWheelModal from "../../styles/components/styleColorWheelModal";
import { eventEmit } from "../../utils/eventEmitter";
// import { eventEmit } from "../../utils/eventEmitter";

interface initialState {
    current: string,
    isWheelOpen: boolean
}
const initialState = {
    currentColor: '#ffffff',
    isWheelOpen: false,
}

const ColorWheelModal: FC = (props) => {

    const [state, setState] = useState(initialState)
    // const picker = useRef(null)

    const handleColorPicker = (): void => {
        console.log('open color wheel');

        // enable/disable canvas overlay
        eventEmit('onHandleCanvas', state.isWheelOpen)

        setState({
            ...state,
            isWheelOpen: !state.isWheelOpen
        })
    }

    return (
        <Pressable
            style={{ position: "relative", zIndex: 999 }}
            onPress={handleColorPicker}
        >

            <View style={[styleColorWheelModal.colorButton, { backgroundColor: state.currentColor }]}></View>



            {state.isWheelOpen &&
                <View
                    style={styleColorWheelModal.modalContainer}
                >

                    <ColorPicker
                        // ref={picker.current}
                        // noSnap={true}
                        // discrete={true}
                        // shadeWheelThumb={true}
                        // swatches={false}
                        // sliderHidden={false}
                        palette={['#57ff0a', '#ffde17', '#f26522']}
                        onColorChangeComplete={(color) => {
                            setState({
                                ...state,
                                currentColor: color
                            })
                        }}
                        gapSize={20}
                        thumbSize={25}
                        color={state.currentColor}
                    /* onColorChange={color => {
                        console.log('color changing...', color);
                        setState({
                            ...state,
                            current: color,
                        })
                    }} */
                    />
                </View>
            }
        </Pressable>

    )
}

export default ColorWheelModal